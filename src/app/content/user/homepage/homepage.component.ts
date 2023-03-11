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


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  control = new FormControl('');
  streets: string[] = ['MarkG', 'John12', 'ShaneMcN', 'Christo'];
  filteredStreets: Observable<string[]> | undefined;
  //delete above
  isUserLoggedOn: boolean | undefined;
  postDetails : [] | any;
  profileSelected: string;
  usernameInput: string = "";
  myFormControl = new FormControl("");

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService,
    private imagePostService: PostImageService,
    private imageProcessingService: ImageProcessingService
  ) {}

  ngOnInit(): void {
    this.userAuthService.getToken();
    console.log(this.userAuthService.getToken());
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
    console.log(searchKeyword); 
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
          console.log(response);
          this.postDetails = response;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  onSelectedProfile(event: MouseEvent){
   
    this.usernameInput = (event.target as HTMLDivElement).innerText;
    console.log(this.usernameInput);
    this.userAuthService.setUserProfileNameData(this.usernameInput);
    this.router.navigate(['/otherProfiles']);
  }

  postOnFocus(postId : any) {
    this.router.navigate(['/post-on-focus', {postId : postId}]);
  }
}