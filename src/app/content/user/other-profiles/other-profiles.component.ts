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
  selector: 'app-other-profiles',
  templateUrl: './other-profiles.component.html',
  styleUrls: ['./other-profiles.component.css']
})
export class OtherProfilesComponent implements OnInit {
  isUserLoggedOn: boolean | undefined;
  postDetails : [] | any;
  userNameSubmitted: string | any;
  userFirstNameSubmitted: string | any;
  userLastNameSubmitted: string | any;
  numberOfPosts : number;
  userProfileSelected: string | any;

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
    this.sharedService.getProfileNameData().subscribe((userProfile) => {
      this.userProfileSelected = this.userAuthService.getUserProfileNameData();

    });
    this.userAuthService.getToken();
    this.isLoggedIn();
    this.getAllPosts();}
    //delete above
  public isLoggedIn() {
    this.userAuthService.isUserLoggedIn = false;
    this.isUserLoggedOn = this.userAuthService.isUserLoggedIn;

    return this.userAuthService.isLoggedIn();

  }
  searchByKeyword(searchKeyword = this.userProfileSelected) {
    this.postDetails = [];
    this.getAllPosts(searchKeyword);
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

  public getAllPosts(searchKey = this.userProfileSelected) {
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
          this.numberOfPosts= response.length;
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
