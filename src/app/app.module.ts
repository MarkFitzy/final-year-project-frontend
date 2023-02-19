import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AdminComponent } from './content/admin/admin.component';
import { ShowPhotoDialogComponent } from './content/admin/show-photo-dialog/show-photo-dialog.component';
import { AddNewImageComponent } from './content/user/add-new-image/add-new-image.component';
import { HomepageComponent } from './content/user/homepage/homepage.component';
import { PostOnFocusComponent } from './content/user/homepage/postOnFocus/post-on-focus/post-on-focus.component';
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AuthGuard } from './auth/services/auth.guard';
import { AuthInterceptor } from './auth/services/auth.interceptor';
import { UserService } from './_services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    LandingComponent,
    HeaderComponent,
    AdminComponent,
    HomepageComponent,
    AddNewImageComponent,
    ShowPhotoDialogComponent,
    PostOnFocusComponent,
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
    RouterModule,
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
  ],
  exports: [
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
    RouterModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatDialogModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatDividerModule,
  ],
  providers: [ AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
