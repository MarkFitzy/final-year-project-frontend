import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  isUserLoggedIn = false;

  constructor() { }

  public setRoles(roles:[]){
    localStorage.setItem('roles',JSON.stringify(roles));
  }

  public getRoles(): []{
    return JSON.parse(localStorage.getItem('roles')!);
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken), { withCredentials: true };
  }

  public getToken(): string{
    return  (localStorage.getItem('jwtToken')!);
  }

  setUserNameData(userName: any) {
    localStorage.setItem('userName', userName)
 }

 getUserNameData() {
    return (localStorage.getItem('userName'));
 }

 setUserFirstNameData(userFirstName: any) {
  localStorage.setItem('userFirstName', userFirstName)

 }
 getUserFirstNameData() {
  return (localStorage.getItem('userFirstName'));
}

 setUserLastNameData(userLastName: any) {
  localStorage.setItem('userLastName', userLastName)

 }
 getUserLastNameData() {
  return (localStorage.getItem('userLastName'));
}

setUserProfileNameData(userProfile: any) {
  localStorage.setItem('userProfile', userProfile)

 }
 getUserProfileNameData() {
  return (localStorage.getItem('userProfile'));
}


  public clear() {
    localStorage.clear();

  }

  public isLoggedIn() {
    this.isUserLoggedIn = false;
    return this.getRoles() && this.getToken();

  }
}
