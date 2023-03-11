import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { ImageProcessingService } from '../content/admin/image-processing.service';
import { ImagePost } from '../_model/imagePost.model';
import { PostImageService } from './post-imageservice';

@Injectable({
  providedIn: 'root'
})
export class PostManagementService implements Resolve<ImagePost>{

  constructor(private imagePostService: PostImageService, private imageProcessing: ImageProcessingService) { }

  resolve (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ImagePost> {
    const id = route.paramMap.get("postId")

    if (id) {
      return this.imagePostService.getPostById(id)
      .pipe(map(p => this.imageProcessing.createImages(p)));
}else {
  return of(this.getPostDetails());
}
  }
  getPostDetails() {
    return {
      postId: 0,
      postCaption: "",
      postDescription: "",
      postCamera: "",
      postLens: "",
      postAperture: "",
      postType: "",
      userName: "",
      postImages: [],
      userFirstName: "",
      userLastName: "",

    }
  }
}
