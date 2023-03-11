import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddNewPostComponent } from './admin-add-new-post.component';

describe('AdminAddNewPostComponent', () => {
  let component: AdminAddNewPostComponent;
  let fixture: ComponentFixture<AdminAddNewPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddNewPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddNewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
