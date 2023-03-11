import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from 'src/app/_model/file-handle.model';
import { ImagePost } from 'src/app/_model/imagePost.model';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {
  constructor(private sanitizer: DomSanitizer) { }

  public createImages(imagePosts: ImagePost) {
    const postImages: any = imagePosts.postImages;

    const postImagesToFileHandle: FileHandle[] = [];

    for(let i = 0; i < postImages.length; i++) {
      const imageFileData =  postImages[i];

      const imageBlob = this.dataURItoBlob(imageFileData.picByte, imageFileData.type)

      const imageFile = new File([imageBlob], imageFileData.name, {type: imageFileData.type})

      const finalFileHandle : FileHandle  = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };

      postImagesToFileHandle.push(finalFileHandle);
    }
    imagePosts.postImages = postImagesToFileHandle;
    return imagePosts;
  }

  public dataURItoBlob(picBytes : any, imageType : any){
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for(let i = 0; i < byteString.length; i++) {

      int8Array[i] = byteString.charCodeAt(i);

    }

   const blob = new Blob([int8Array], {type: imageType});
   return blob;
  }
}
