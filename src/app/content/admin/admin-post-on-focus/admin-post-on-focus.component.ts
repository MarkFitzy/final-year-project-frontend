import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageProcessingService } from 'src/app/content/admin/image-processing.service';
import { ImagePost } from 'src/app/_model/imagePost.model';
import { PostImageService } from 'src/app/_services/post-imageservice';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';
import { CommentsService, Comment} from 'src/app/_services/comments.service';
import { SharedService } from 'src/app/_services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-post-on-focus',
  templateUrl: './admin-post-on-focus.component.html',
  styleUrls: ['./admin-post-on-focus.component.css']
})
export class AdminPostOnFocusComponent implements OnInit {


  isUserLoggedOn: boolean | undefined;
  imagePost: ImagePost | undefined;
  comments: Comment[];
  newComment: Comment = { commentId: 0, comment: '', commentUsername: '', commentPostId: 0 };
  userProfileSelected: string | null;
  userNameSubmitted: string | null;
  filteredCommentsLength: number = 0;
  filteredComments: Comment[];
  usernameInput: string = "";
  constructor(private activatedRoute: ActivatedRoute, private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService,
    private imagePostService: PostImageService,
    private imageProcessingService: ImageProcessingService,
    private commentsService: CommentsService,
    private sharedService: SharedService) { }

  ngOnInit(): void {

    this.sharedService.getUserNameData().subscribe((userNameEntered) => {
      this.userNameSubmitted = this.userAuthService.getUserNameData();
    });

    this.imagePost = this.activatedRoute.snapshot.data['postManager'];
    this.fetchComments();
  }

  public logout() {
    this.userAuthService.isUserLoggedIn = false;
    this.isUserLoggedOn = this.userAuthService.isUserLoggedIn;
    this.userAuthService.clear();
    console.log('logged out');
    this.router.navigate(['/landing']);
  }

  fetchComments() {
    this.commentsService.getAllComments().subscribe(comments => {


      this.comments = comments;
      this.filteredComments = this.comments.filter(comment => comment.commentPostId === this.imagePost?.postId).reverse();
      this.filteredCommentsLength = this.filteredComments.length;
    });
  }

  submitComment() {
    const username = this.userNameSubmitted;
    this.newComment.commentPostId = this.imagePost?.postId ?? 0;
    this.newComment.commentUsername = username ?? "";
    this.commentsService.saveComment(this.newComment).subscribe(comment => {
      this.comments.push(comment);
      this.newComment.comment = '';
    });
    setTimeout(() => {
    this.fetchComments(); }, 500);
  }

  onSelectedProfile(event: MouseEvent){

    this.usernameInput = (event.target as HTMLDivElement).innerText;
    this.userAuthService.setUserProfileNameData(this.usernameInput);
    this.router.navigate(['/otherProfiles']);
  }

  deleteComment(comment: Comment) {
    this.commentsService.deleteComment(comment).subscribe({next:
      (data:any)=> {
        // Reload comments after deleting
        this.fetchComments();
      }, error: (error: HttpErrorResponse) => {
        console.log(error);
    }},
    );
  }

}

