import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostImageService } from 'src/app/_services/post-imageservice';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';
import { ImagePost } from 'src/app/_model/imagePost.model';
import { ImageProcessingService } from '../../admin/image-processing.service';
import { map, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/_services/shared.service';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/_model/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isUserLoggedOn: boolean | undefined;
  postDetails : [] | any;
  userNameSubmitted: string | any;
  userFirstNameSubmitted: string | any;
  userLastNameSubmitted: string | any;
  numberOfPosts : number;
  mostCommonCamera: string | null = null;


  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService,
    private imagePostService: PostImageService,
    private imageProcessingService: ImageProcessingService,
    private postImageService: PostImageService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.sharedService.getUserNameData().subscribe((userNameEntered) => {
      this.userNameSubmitted = this.userAuthService.getUserNameData();


    });
    this.userAuthService.getToken();
    this.isLoggedIn();
    this.getAllPosts();}
  public isLoggedIn() {
    this.userAuthService.isUserLoggedIn = false;
    this.isUserLoggedOn = this.userAuthService.isUserLoggedIn;

    return this.userAuthService.isLoggedIn();

  }
  searchByKeyword(searchKeyword = this.userNameSubmitted) {
    this.postDetails = [];
    this.getAllPosts(searchKeyword);
  }
  getMostCommonCamera() {
    const cameraCount: { [camera: string]: number } = {};

    for (const post of this.postDetails) {
      if (post.postCamera) {
        if (!cameraCount[post.postCamera]) {
          cameraCount[post.postCamera] = 1;
        } else {
          cameraCount[post.postCamera]++;
        }
      }
    }

    let maxCount = 0;
    let mostCommonCamera = null;

    for (const camera in cameraCount) {
      if (cameraCount[camera] > maxCount) {
        maxCount = cameraCount[camera];
        mostCommonCamera = camera;
      }
    }

    this.mostCommonCamera = mostCommonCamera;
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

  public getAllPosts(searchKey = this.userNameSubmitted) {
    this.imagePostService
      .getAllPosts(searchKey)
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
          this.postDetails.reverse();
          this.numberOfPosts = response.length;
          this.getMostCommonCamera();
          this.userFirstNameSubmitted = this.postDetails.userFirstName;
          this.userFirstNameSubmitted = this.postDetails.userLastName;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  postOnFocus(postId : any) {
    this.router.navigate(['/post-on-focus', {postId : postId}]);
  }
}
