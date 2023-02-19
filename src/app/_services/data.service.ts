import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public userNameSubmitted = new BehaviorSubject<any>([]);
  currentUserName = this.userNameSubmitted.asObservable();

  constructor() {}

  setUserNameData(data: any) {
    this.userNameSubmitted.next(data);
  }

  changeUserName(userNameEntered: string) {
    this.userNameSubmitted.next(userNameEntered);
  }
}
