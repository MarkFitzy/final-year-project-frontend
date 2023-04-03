import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  userNameSubmitted : string | any;
  currentUserName : string | any;

  constructor() {}

  setUserNameData(data: any) {
    localStorage.setItem('userName', JSON.stringify(data));
    this.userNameSubmitted =  localStorage.getItem('userName');
  }

  changeUserName(userNameEntered: string) {
    this.userNameSubmitted.next(userNameEntered);
  }
}
