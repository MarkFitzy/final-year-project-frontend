import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostOnFocusComponent } from './admin-post-on-focus.component';

describe('AdminPostOnFocusComponent', () => {
  let component: AdminPostOnFocusComponent;
  let fixture: ComponentFixture<AdminPostOnFocusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPostOnFocusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPostOnFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
