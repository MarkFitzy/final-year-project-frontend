import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImagePost } from '../_model/imagePost.model';

@Injectable({
  providedIn: 'root'
})
export class PostImageService {

  constructor(private httpClient: HttpClient) { }

  public addImage(image: FormData){
    return this.httpClient.post<ImagePost>("https://macro-social.herokuapp.com/addNewImage", image);
  }

  public getAllPosts(searchKeyword: string = "") {
    return this.httpClient.get<ImagePost[]>("https://macro-social.herokuapp.com/getAllPosts?searchKey="+searchKeyword);
  }

  public deletePost(postId: number){
    return this.httpClient.delete("https://macro-social.herokuapp.com/deletePostDetails/" + postId);
  }

  public getPostById(postId: any){
    return this.httpClient.get<ImagePost>("https://macro-social.herokuapp.com/getPostById/" + postId);
  }

  // public getUser() {
  //   return this.httpClient.delete("http://localhost:9090/deletePostDetails/" + postId);
  // }
}
