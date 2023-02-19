import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostImageService } from 'src/app/_services/post-imageservice';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';
import { ImagePost } from 'src/app/_model/imagePost.model';
import { ImageProcessingService } from '../../admin/image-processing.service';
import { map, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';


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

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService,
    private imagePostService: PostImageService,
    private imageProcessingService: ImageProcessingService
  ) {}

  ngOnInit(): void {this.getAllPosts();
    //delete below
    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );}
    //delete above
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
          console.log(response);
          this.postDetails = response;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  postOnFocus(postId : any) {
    this.router.navigate(['/post-on-focus', {postId : postId}]);
  }
  //delete below
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.streets.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
