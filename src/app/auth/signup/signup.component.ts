import { Component, Input, OnInit} from '@angular/core';
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  isLinear = true;
  isEditable = false;

  constructor( private userService: UserService, private router: Router, private userAuthService: UserAuthService) {}
  isUserLoggedOn : boolean | undefined;

  
  signup(SignInForm: NgForm) {
        console.log("login is completed");
        console.log(SignInForm.value);
        this.userService.signup(SignInForm.value).subscribe( {next: (response:any) => {
          this.router.navigate(['/login']);

        }, error: (error) => {
          console.log(error);
        }
      });

  }
  public isLoggedIn(){
    this.userAuthService.isUserLoggedIn = false;
    this.isUserLoggedOn = this.userAuthService.isUserLoggedIn;

    return this.userAuthService.isLoggedIn();
  }

  public logout(){
    this.userAuthService.isUserLoggedIn = false;
    this.isUserLoggedOn = this.userAuthService.isUserLoggedIn;
    this.userAuthService.clear();
    console.log('logged out');
    this.router.navigate(['/landing']);
  }

  public login(){
    this.router.navigateByUrl('/login')
  }
}

