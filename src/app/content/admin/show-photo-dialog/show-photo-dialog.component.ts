import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FileHandle } from 'src/app/_model/file-handle.model';

@Component({
  selector: 'app-show-photo-dialog',
  templateUrl: './show-photo-dialog.component.html',
  styleUrls: ['./show-photo-dialog.component.css']
})
export class ShowPhotoDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data : any) { }

  ngOnInit(): void {
    this.receiveImages();
  }

  receiveImages() {
    console.log(this.data);
  }

}
