import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { UserService } from "@services/user.service";

@Injectable({
  providedIn: "root",
})
export class CompanyLoginGuardService implements CanActivate {
  constructor(private userService: UserService) { }

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    return this.userService.userLoggedIn.type === 'company' ? true : false
  }
}
