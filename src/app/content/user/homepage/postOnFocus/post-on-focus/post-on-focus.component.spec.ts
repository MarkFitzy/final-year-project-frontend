import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOnFocusComponent } from './post-on-focus.component';

describe('PostOnFocusComponent', () => {
  let component: PostOnFocusComponent;
  let fixture: ComponentFixture<PostOnFocusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostOnFocusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostOnFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
