import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxImageCompressService } from 'ngx-image-compress';
import { delay } from 'rxjs';
import { FileHandle } from 'src/app/_model/file-handle.model';
import { ImagePost } from 'src/app/_model/imagePost.model';
import { PostImageService } from 'src/app/_services/post-imageservice';
import { SharedService } from 'src/app/_services/shared.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';
import * as exifr from 'exifr';

@Component({
  selector: 'app-admin-add-new-post',
  templateUrl: './admin-add-new-post.component.html',
  styleUrls: ['./admin-add-new-post.component.css']
})
export class AdminAddNewPostComponent implements OnInit {

  isUserLoggedOn: boolean | undefined;
  userNameSubmitted: string;
  isImageSelected = false;
  isImageSent = false;
  isFormComplete = false;
  isImageNew = true;
  imagePost: ImagePost = {
    postId: 0,
    postCaption: '',
    postDescription: '',
    postCamera: '',
    postLens: '',
    postAperture: '',
    postImages: [],
    userName: '',
    postType: '',
    userFirstName: '',
    userLastName: '',
    postPhotoshop: '',
  };

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService,
    private postImageService: PostImageService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private imageCompress: NgxImageCompressService,
  ) {}

  ngOnInit(): void {
    this.sharedService.getUserNameData().subscribe((userNameEntered) => {
      this.userNameSubmitted = userNameEntered;
      this.isLoggedIn();

    });
    //  this.userNameSubmitted = this.sharedService
    this.imagePost = this.activatedRoute.snapshot.data['postManager'];
    const username = this.userNameSubmitted;
    if (this.imagePost && this.imagePost.postId) {
      this.isImageNew = false;
    }
    this.imagePost = {
      postId: 0,
      postCaption: '',
      postDescription: '',
      postCamera: '',
      postLens: '',
      userFirstName: 'Macro',
      userLastName: 'Social App',
      postAperture: '',
      postImages: [],
      userName: "Macro",
      postType: "Announcement",
      postPhotoshop: '',
    };

    // this.postForm.get('userName').setValue(this.userNameSubmitted);
  }
  public isLoggedIn() {
    this.userAuthService.isUserLoggedIn = false;
    this.isUserLoggedOn = this.userAuthService.isUserLoggedIn;

    return this.userAuthService.isLoggedIn();
  }
  private dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
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

  addPost(postForm: NgForm) {
    const delay = (ms: any) => new Promise((res) => setTimeout(res, ms));
    const postFormData = this.prepareFormData(this.imagePost);
    try {
      this.postImageService.addImage(postFormData).subscribe({
        next: (response: ImagePost) => {
          postForm.reset();
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });

    } finally {
      this.isImageSent = true;
      setTimeout(() => {
        this.router.navigateByUrl('/homepage');
      }, 6000);
    }
  }

  prepareFormData(imagePost: ImagePost): FormData {
    const formData = new FormData();
    formData.append(
      'imagePost',
      new Blob([JSON.stringify(imagePost)], { type: 'application/json' })
    );

    for (var i = 0; i < imagePost.postImages.length; i++) {
      formData.append(
        'imageFile',
        imagePost.postImages[i].file,
        imagePost.postImages[i].file.name
      );
    }
    return formData;
  }
  async onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = async (fileReaderEvent) => {
        if (fileReaderEvent.target) {
          const image = fileReaderEvent.target.result as string;
          const orientation = await this.imageCompress.getOrientation(file);
          this.imageCompress.compressFile(image, orientation, 50, 50).then(async (compressedImage) => {
            const exifData = await exifr.parse(file);
            const cameraModel = exifData.Model || 'N/A';
            const lensModel = exifData.LensModel || 'N/A';
            const aperture = exifData.FNumber ? `f/${exifData.FNumber}` : 'N/A';
            const photoshopUsed = exifData.Software && exifData.Software.includes('Adobe Photoshop') ? 'Adobe Photoshop' :
                      exifData.Software && exifData.Software.includes('Lightroom') ? 'Adobe Lightroom' :
                      exifData.Software && exifData.Software.includes('Snapseed') ? 'Snapseed' :
                      exifData.Software && exifData.Software.includes('Google') ? 'Snapseed' :
                      exifData.Software && exifData.Software.includes('Express') ? 'Photoshop Express' :
                      exifData.Software && exifData.Software.includes('PicsArt') ? 'PicsArt' :
                      exifData.Software && exifData.Software.includes('Pixlr') ? 'Pixlr' :
                      exifData.Software && exifData.Software.includes('Google Photos') ? 'Google Photos' :
                      exifData.Software && exifData.Software.includes('Prisma') ? 'Prisma' :
                      exifData.Software && exifData.Software.includes('Facetune') ? 'Facetune' :
                      exifData.Software && exifData.Software.includes('VSCO') ? 'VSCO' :
                      exifData.Software && exifData.Software.includes('Afterlight ') ? 'Afterlight ' :
                      exifData.Software && exifData.Software.includes('TouchRetouch') ? 'TouchRetouch' :
                      exifData.Software && exifData.Software.includes('Pixtica') ? 'Pixtica' :
                      'Not Photoshopped';

            console.log('Camera Model:', cameraModel);
            console.log('Lens Model:', lensModel);
            console.log('Aperture:', aperture);
            console.log('Photoshop Used:', photoshopUsed);

            this.imagePost.postCamera = cameraModel;
            this.imagePost.postLens = lensModel;
            this.imagePost.postAperture = aperture;
            this.imagePost.postPhotoshop = photoshopUsed;

            const compressedImageBlob = this.dataURItoBlob(compressedImage);
            const compressedFile = new File([compressedImageBlob], file.name, { type: compressedImageBlob.type });
            const fileHandle: FileHandle = {
              file: compressedFile,
              url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(compressedFile)),
            };
            this.imagePost.postImages.push(fileHandle);
            this.isImageSelected = true;
            this.isFormComplete = true;
          });
        }
      };
      reader.readAsDataURL(file);
    }
  }


  removeImages(i: number) {
    this.imagePost.postImages.splice(i, 1);
    this.isImageSelected = false;
    this.isFormComplete = false;
  }
}

