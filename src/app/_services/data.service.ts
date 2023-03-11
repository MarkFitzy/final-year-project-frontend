import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // public userNameSubmitted = new BehaviorSubject<any>([]);
  userNameSubmitted : string | any;
  currentUserName : string | any;

  constructor() {}

  setUserNameData(data: any) {
    localStorage.setItem('userName', JSON.stringify(data));
    this.userNameSubmitted =  localStorage.getItem('userName');
    // this.userNameSubmitted.next(data);
    // this.currentUserName =  this.userNameSubmitted;
    // this.userNameSubmitted = this.currentUserName;
    
  }

  changeUserName(userNameEntered: string) {
    this.userNameSubmitted.next(userNameEntered);
  }
}
