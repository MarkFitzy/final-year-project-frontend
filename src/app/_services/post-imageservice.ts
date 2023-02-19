import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImagePost } from '../_model/imagePost.model';

@Injectable({
  providedIn: 'root'
})
export class PostImageService {

  constructor(private httpClient: HttpClient) { }

  public addImage(image: FormData){
    return this.httpClient.post<ImagePost>("http://localhost:9090/addNewImage", image);
  }

  public getAllPosts() {
    return this.httpClient.get<ImagePost[]>("http://localhost:9090/getAllPosts");
  }

  public deletePost(postId: number){
    return this.httpClient.delete("http://localhost:9090/deletePostDetails/" + postId);
  }

  // public getUser() {
  //   return this.httpClient.delete("http://localhost:9090/deletePostDetails/" + postId);
  // }
}
