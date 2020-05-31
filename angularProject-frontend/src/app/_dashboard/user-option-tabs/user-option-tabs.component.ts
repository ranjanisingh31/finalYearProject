import { Component, OnInit } from "@angular/core";
import { SigninAuthService } from "src/app/_services_guard_interceptor/signin-auth.service";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { LoginPageComponent } from "../login-page/login-page.component";

@Component({
  selector: "app-user-option-tabs",
  templateUrl: "./user-option-tabs.component.html",
  styleUrls: ["./user-option-tabs.component.css"],
})
export class UserOptionTabsComponent implements OnInit {
  constructor(
    private _signinService: SigninAuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  onClick() {
    if (this._signinService.loggedIn()) {
      this.router.navigate(["/track-vehicle"]);
    } else {
      this.dialog.open(LoginPageComponent, {
        width: "450px",
        data: {
          reset: false,
          login: true,
          register: false,
        },
      });
    }
  }
  ngOnInit(): void {}
}
