import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherProfilesComponent } from './other-profiles.component';

describe('OtherProfilesComponent', () => {
  let component: OtherProfilesComponent;
  let fixture: ComponentFixture<OtherProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherProfilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
