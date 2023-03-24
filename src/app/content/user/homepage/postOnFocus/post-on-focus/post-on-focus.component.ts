import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageProcessingService } from 'src/app/content/admin/image-processing.service';
import { ImagePost } from 'src/app/_model/imagePost.model';
import { PostImageService } from 'src/app/_services/post-imageservice';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-post-on-focus',
  templateUrl: './post-on-focus.component.html',
  styleUrls: ['./post-on-focus.component.css']
})
export class PostOnFocusComponent implements OnInit {

  isUserLoggedOn: boolean | undefined;
  imagePost: ImagePost | undefined;
  newComment: string = '';
  constructor(private activatedRoute: ActivatedRoute, private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService,
    private imagePostService: PostImageService,
    private imageProcessingService: ImageProcessingService) { }

  ngOnInit(): void {
    this.imagePost = this.activatedRoute.snapshot.data['postManager'];
    console.log(this.imagePost);
  }

  public logout() {
    this.userAuthService.isUserLoggedIn = false;
    this.isUserLoggedOn = this.userAuthService.isUserLoggedIn;
    this.userAuthService.clear();
    console.log('logged out');
    this.router.navigate(['/landing']);
  }
  

}
