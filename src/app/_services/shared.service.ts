import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  userNameData = new BehaviorSubject<string>('');
  userFirstNameData = new BehaviorSubject<string>('');
  profileNameData = new BehaviorSubject<string>('');

  constructor() {}

  setUserNameData(userNameEntered: any) {
    this.userNameData.next(userNameEntered);
  }

  getUserNameData() {
    return this.userNameData.asObservable();
  }

  setProfileNameData(profileNameSelected: any) {
    this.profileNameData.next(profileNameSelected);
  }

  getProfileNameData() {
    return this.profileNameData.asObservable();
  }

  setUserFirstNameData(userProfile: any) {
    return this.userFirstNameData.next(userProfile);
  }
  getUserFirstNameData() {
    return this.userFirstNameData.asObservable();
  }
}
