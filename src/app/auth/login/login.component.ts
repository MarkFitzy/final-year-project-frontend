import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/_services/shared.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    private sharedService: SharedService,
  ) {}
  isUserLoggedOn : boolean | undefined;
  userNameEntered: any;
  isHidden = true;
  isPasswordOrEmailInValid = false;

  ngOnInit() {
  }

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe({
      next: (response: any) => {
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);
        this.userAuthService.setUserNameData(response.user.userName);
        console.log(this.userAuthService.getUserNameData())
        this.userNameEntered = response.user.userName;
        this.sharedService.setUserNameData(this.userNameEntered);

        const role = response.user.role[0].roleName;
        if (role == 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/homepage']);
        }
      },
      error: (error) => {
        this.isPasswordOrEmailInValid = true;
      },
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
    this.router.navigate(['/landing']);
  }

  public loginButton(){
    this.router.navigateByUrl('/login')
  }
}
