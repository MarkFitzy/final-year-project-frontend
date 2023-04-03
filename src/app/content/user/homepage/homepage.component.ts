import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PostImageService } from 'src/app/_services/post-imageservice';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';
import { ImagePost } from 'src/app/_model/imagePost.model';
import { ImageProcessingService } from '../../admin/image-processing.service';
import { map, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatChipEvent,MatChipInputEvent } from '@angular/material/chips';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { SharedService } from 'src/app/_services/shared.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  control = new FormControl('');
  isUserLoggedOn: boolean | undefined;
  postDetails : [] | any;
  profileSelected: string;
  usernameInput: string = "";
  myFormControl = new FormControl("");
  isSearchOpen = false;
  isMobile: boolean = false;
  userNameSubmitted: string | null;

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService,
    private imagePostService: PostImageService,
    private imageProcessingService: ImageProcessingService,
    private breakpointObserver: BreakpointObserver,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.sharedService.getUserNameData().subscribe((userNameEntered) => {
      this.userNameSubmitted = this.userAuthService.getUserNameData();
    });
    this.breakpointObserver
    .observe(['(max-width: 840px)'])
    .subscribe((state: BreakpointState) => {
      this.isMobile = state.matches;
    });
    this.userAuthService.getToken();
    this.isLoggedIn();
    this.getAllPosts();}
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
  searchByKeyword(searchKeyword: any) {
    this.postDetails = [];
    this.getAllPosts(searchKeyword);
  }

  public getAllPosts(searchKey: string = "") {
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
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  onSelectedProfile(event: MouseEvent){

    this.usernameInput = (event.target as HTMLDivElement).innerText;
    this.userAuthService.setUserProfileNameData(this.usernameInput);
    this.router.navigate(['/otherProfiles']);
  }

  postOnFocus(postId : any) {
    this.router.navigate(['/post-on-focus', {postId : postId}]);
  }

  toggleSearch(): void {
    this.isSearchOpen = !this.isSearchOpen;
  }
  onYourSelectedProfile(){
    const username = this.userNameSubmitted;
    this.usernameInput = username|| "";
    this.userAuthService.setUserProfileNameData(this.usernameInput);
    this.router.navigate(['/otherProfiles']);
  }
}
