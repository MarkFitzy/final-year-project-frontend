import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { FileHandle } from 'src/app/_model/file-handle.model';
import { ImagePost } from 'src/app/_model/imagePost.model';
import { PostImageService } from 'src/app/_services/post-imageservice';
import { SharedService } from 'src/app/_services/shared.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-admin-add-new-post',
  templateUrl: './admin-add-new-post.component.html',
  styleUrls: ['./admin-add-new-post.component.css']
})
export class AdminAddNewPostComponent implements OnInit {

  isUserLoggedOn: boolean | undefined;
  userNameSubmitted: string;
  isImageSelected = false;
  isImageSent = false;
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
    userName: '',
    postType: this.selected,
    userFirstName: '',
    userLastName: '',
  };

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService,
    private postImageService: PostImageService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.sharedService.getUserNameData().subscribe((userNameEntered) => {
      this.userNameSubmitted = userNameEntered;
      console.log('form data ', userNameEntered);
      this.isLoggedIn();
      
    });
    //  this.userNameSubmitted = this.sharedService
    console.log('userNameSubmitted', this.userNameSubmitted);
    this.imagePost = this.activatedRoute.snapshot.data['postManager'];
    const username = this.userNameSubmitted;
    console.log('username is ', username);
    if (this.imagePost && this.imagePost.postId) {
      this.isImageNew = false;
    }
    this.imagePost = {
      postId: 0,
      postCaption: '',
      postDescription: '',
      postCamera: '',
      postLens: '',
      userFirstName: 'Macro',
      userLastName: 'Social App',
      postAperture: '',
      postImages: [],
      userName: "Macro",
      postType: "Announcement",
    };

    // this.postForm.get('userName').setValue(this.userNameSubmitted);
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
    const delay = (ms:any) => new Promise(res => setTimeout(res,ms));
    const postFormData = this.prepareFormData(this.imagePost);
    try{
    this.postImageService.addImage(postFormData).subscribe({
      next: (response: ImagePost) => {
        postForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
        });
      delay(1000000);}
    finally{
      this.isImageSent = true;
      setTimeout(() => {
    this.router.navigateByUrl('/admin');
    
      },6000);
    }
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


