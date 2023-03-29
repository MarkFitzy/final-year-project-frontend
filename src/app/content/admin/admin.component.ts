import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ImagePost } from 'src/app/_model/imagePost.model';
import { PostImageService } from 'src/app/_services/post-imageservice';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';
import { ImageProcessingService } from './image-processing.service';
import { ShowPhotoDialogComponent } from './show-photo-dialog/show-photo-dialog.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  postDetails: ImagePost[] = [];
  hideColumns = false;
  displayedColumns: string[] = [
    'ID',
    'Image',
    'Caption',
    'Description',
    "Post Type",
    'Camera Model',
    'Lens Type',
    'Aperture Setting',
    'User Name',
    'Delete',

  ];

  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private userAuthService: UserAuthService,
    private imagePostService: PostImageService,
    public imagesDialog: MatDialog,
    private imageProcessingService: ImageProcessingService
  ) {}
  isUserLoggedOn: boolean | undefined;

  ngOnInit(): void {
    this.getAllPosts();
    this.isLoggedIn();
    this.hideColumns = window.innerWidth < 900;
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

  public loginButton() {
    this.router.navigateByUrl('/login');
  }

  public getAllPosts() {
    this.imagePostService
      .getAllPosts()
      .pipe(
        map((x: ImagePost[], i) =>
          x.map((imagePost: ImagePost) =>
            this.imageProcessingService.createImages(imagePost)
          )
        )
      )
      .subscribe({
        next: (response: ImagePost[]) => {
          this.postDetails = response;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  deletePost(postId: any) {
    this.imagePostService.deletePost(postId).subscribe({
      next: (response) => {
        this.getAllPosts();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  showPhoto(imagePost: ImagePost) {
    this.imagesDialog.open(ShowPhotoDialogComponent, {
      data: {
        images: imagePost.postImages
      },
      height: '500px',
      width: '800px',
    });
  }

  postOnFocus(postId : any) {
    console.log(postId);
    this.router.navigate(['/admin-post-on-focus', {postId : postId}]);
  }
}
