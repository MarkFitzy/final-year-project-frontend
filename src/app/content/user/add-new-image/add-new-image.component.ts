import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FileHandle } from 'src/app/_model/file-handle.model';
import { ImagePost } from 'src/app/_model/imagePost.model';
import { PostImageService } from 'src/app/_services/post-imageservice';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-add-new-image',
  templateUrl: './add-new-image.component.html',
  styleUrls: ['./add-new-image.component.css'],
})
export class AddNewImageComponent implements OnInit {
  isUserLoggedOn: boolean | undefined;
  isImageSelected = false;
  selected = 'Nature';
  isImageNew = true;
  imagePost: ImagePost = {
    postId: 0,
    postCaption: '',
    postDescription: '',
    postCamera: '',
    postLens: '',
    postAperture: '',
    postImages: [],
    postType: this.selected,
  };

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService,
    private postImageService: PostImageService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.imagePost = this.activatedRoute.snapshot.data['postManager'];

    if(this.imagePost && this.imagePost.postId){
        this.isImageNew = false;
    }
    
  }
  public isLoggedIn() {
    this.userAuthService.isUserLoggedIn = false;
    this.isUserLoggedOn = this.userAuthService.isUserLoggedIn;

    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.isUserLoggedIn = false;
    this.isUserLoggedOn = this.userAuthService.isUserLoggedIn;
    this.userAuthService.clear();
    console.log('logged out');
    this.router.navigate(['/landing']);
  }

  public login() {
    this.router.navigateByUrl('/login');
  }

  addPost(postForm: NgForm) {
    const postFormData = this.prepareFormData(this.imagePost);

    this.postImageService.addImage(postFormData).subscribe({
      next: (response: ImagePost) => {
        postForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
    this.router.navigateByUrl('/homepage');
  }

  prepareFormData(imagePost: ImagePost): FormData {
    const formData = new FormData();
    formData.append(
      'imagePost',
      new Blob([JSON.stringify(imagePost)], { type: 'application/json' })
    );

    for (var i = 0; i < imagePost.postImages.length; i++) {
      formData.append(
        'imageFile',
        imagePost.postImages[i].file,
        imagePost.postImages[i].file.name
      );
    }
    return formData;
  }
  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        ),
      };
      this.imagePost.postImages.push(fileHandle);
      this.isImageSelected = true;
    }
  }

  removeImages(i: number) {
    this.imagePost.postImages.splice(i, 1);
    this.isImageSelected = false;
  }
}
