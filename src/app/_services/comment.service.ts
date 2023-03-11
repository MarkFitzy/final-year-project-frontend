import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../_model/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl  ="http://localhost:9090";

  constructor(private http: HttpClient) { }

  getCommentsByImageId(imageId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/getComments/${imageId}`);
  }

  createComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.baseUrl}/addComments/`, comment);
  }
}