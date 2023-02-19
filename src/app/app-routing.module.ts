import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { HomepageComponent } from './content/user/homepage/homepage.component';
import { AdminComponent } from './content/admin/admin.component';
import { AddNewImageComponent } from './content/user/add-new-image/add-new-image.component';
import { AuthGuard } from './auth/services/auth.guard';
import { PostOnFocusComponent } from './content/user/homepage/postOnFocus/post-on-focus/post-on-focus.component';
import { PostManagementService } from './_services/post-management.service';


const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent },
  { path: 'landing', component: LandingComponent},
  { path: 'homepage', component: HomepageComponent,  canActivate:[AuthGuard], data:{roles:['User']} },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data:{roles:['Admin']}},
  { path: 'addNewImage', component: AddNewImageComponent, resolve: {postManager: PostManagementService}},
  { path: 'post-on-focus', component: PostOnFocusComponent, resolve: {postManager: PostManagementService}}
];
// , canActivate: [AuthGuard], data:{roles:['Admin', 'User']} 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
