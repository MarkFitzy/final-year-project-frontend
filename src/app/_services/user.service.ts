import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_model/user';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  PATH_OF_API ="https://macro-photography.herokuapp.com";
  // PATH_OF_API ="https://macro-photography.herokuapp.com";
  requestHeader = new HttpHeaders({"No-Auth":"True"})

  constructor(private http: HttpClient, private userAuthService: UserAuthService) { }

  public signup(signupData: any){
    return this.http.post(this.PATH_OF_API + "/registerNewUser", signupData);
  }

  public getUser(searchKeyword: string = "") {
    return this.http.get<User[]>(this.PATH_OF_API + "/getUser?searchKey="+searchKeyword);
  }

  public login(loginData: any){{
    return this.http.post(this.PATH_OF_API + "/authenticate", loginData,{headers:this.requestHeader});
  }}

  public roleMatch(allowedRoles: any ): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if(userRoles != null && userRoles){
      for(let i=0; i< userRoles.length; i++){
        for(let j=0; j< allowedRoles.length; j++){
          if(userRoles[i].roleName === allowedRoles[j]){
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
    }
  }
}
return isMatch;
  }
}
