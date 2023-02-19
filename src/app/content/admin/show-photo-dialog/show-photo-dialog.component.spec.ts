import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPhotoDialogComponent } from './show-photo-dialog.component';

describe('ShowPhotoDialogComponent', () => {
  let component: ShowPhotoDialogComponent;
  let fixture: ComponentFixture<ShowPhotoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPhotoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPhotoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
