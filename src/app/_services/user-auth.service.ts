import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  isUserLoggedIn = false;

  constructor() { }

  public setRoles(roles: []){
    localStorage.setItem('roles',JSON.stringify(roles));
  }

  public getRoles(): []{
    return JSON.parse(localStorage.getItem('roles') || '{}');
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public clear() {
    localStorage.clear();

  }

  public isLoggedIn() {
    this.isUserLoggedIn = false;
    return this.getRoles() && this.getToken();

  }
}
