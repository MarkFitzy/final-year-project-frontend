import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedService } from './_services/shared.service';
import { UserService } from './_services/user.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/services/auth.guard';
import { SignupComponent } from './auth/signup/signup.component';
import { AdminAddNewPostComponent } from './content/admin/admin-add-new-post/admin-add-new-post.component';
import { AdminPostOnFocusComponent } from './content/admin/admin-post-on-focus/admin-post-on-focus.component';
import { AdminComponent } from './content/admin/admin.component';
import { ShowPhotoDialogComponent } from './content/admin/show-photo-dialog/show-photo-dialog.component';
import { AddNewImageComponent } from './content/user/add-new-image/add-new-image.component';
import { HomepageComponent } from './content/user/homepage/homepage.component';
import { PostOnFocusComponent } from './content/user/homepage/postOnFocus/post-on-focus/post-on-focus.component';
import { OtherProfilesComponent } from './content/user/other-profiles/other-profiles.component';
import { ProfileComponent } from './content/user/profile/profile.component';
import { LandingComponent } from './landing/landing.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    LandingComponent,
    AdminComponent,
    HomepageComponent,
    AddNewImageComponent,
    ShowPhotoDialogComponent,
    PostOnFocusComponent,
    AdminAddNewPostComponent,
    ProfileComponent,
    OtherProfilesComponent,
    AdminPostOnFocusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatDialogModule,
    MatTooltipModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatMenuModule,
    MatListModule,
    MatBadgeModule,
    PickerModule,
  ],
  exports: [
  ],
  providers: [
    AuthGuard,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   // useClass: AuthInterceptor,
    //   multi: true,
    // },
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  userNameSubmitted: string;

  constructor(
    public userService: UserService,
    private sharedService: SharedService,
  ) {}

  ngOnInit(): void {
    this.sharedService.getUserNameData().subscribe((userNameEntered) => {
      this.userNameSubmitted = userNameEntered;
      console.log('form data ', userNameEntered);
    });
  }
}
