import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivate } from '@angular/router';
import { ProfileComponent } from '@modules/user/components/profile/profile.component';
import { UserService } from '@services/user.service';

@Injectable()
export class PersonalDataGuard implements CanDeactivate<ProfileComponent> {

  constructor(private userService: UserService) { }

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.userService.profileDataSaved) return confirm('Profile data not saved. If you continue all canges will be lost. Do you really want to continue?');
    else return true;
  }
}