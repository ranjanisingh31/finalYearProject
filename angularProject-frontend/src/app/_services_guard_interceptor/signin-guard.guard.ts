import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { SigninAuthService } from "./signin-auth.service";

@Injectable({
  providedIn: "root",
})
export class SigninGuardGuard implements CanActivate {
  constructor(
    private _signinService: SigninAuthService,
    private _router: Router
  ) {}
  canActivate(): boolean {
    if (this._signinService.loggedIn()) {
      return true;
    } else {
      this._router.navigate(["/"]);
      return false;
    }
  }
}
