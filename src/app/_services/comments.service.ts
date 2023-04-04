import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Comment {
  commentId: number;
  comment: string;
  commentUsername: string;
  commentPostId: number;
}


@Injectable({
  providedIn: 'root'
})
export class CommentsService {


  constructor(private http: HttpClient) {}

  // getAllComments(){
  //   return this.http.get<Comment[]>("http://localhost:9090/getAllComments");
  // }

  // saveComment(comment: Comment) {
  //   return this.http.post<Comment>("http://localhost:9090/addComment", comment);
  // }

  // deleteComment(comment: Comment) {
  //   return this.http.delete<Comment>("http://localhost:9090/deleteComment/" + comment.commentId);
  // }
  getAllComments(){
    return this.http.get<Comment[]>("https://macro-photography.herokuapp.com/getAllComments");
  }

  saveComment(comment: Comment) {
    return this.http.post<Comment>("https://macro-photography.herokuapp.com/addComment", comment);
  }

  deleteComment(comment: Comment) {
    return this.http.delete<Comment>("https://macro-photography.herokuapp.com/deleteComment/" + comment.commentId);
  }
}
