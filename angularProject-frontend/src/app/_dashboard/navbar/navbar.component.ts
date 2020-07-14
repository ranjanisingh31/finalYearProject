import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { SigninAuthService } from "src/app/_services_guard_interceptor/signin-auth.service";
import { LoginPageComponent } from "src/app/_dashboard/login-page/login-page.component";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private _signinService: SigninAuthService,
  ) { }
  openLoginDialog() {
    this.dialog.open(LoginPageComponent, {
      width: "400px",
      data: {
        login: true,
        reset: false,
        register: false,
      },
    });
  }
  public fun;
  ngDoCheck() {
    this.fun = this._signinService.loggedIn();
  }

  logOut() {
    this._signinService.loggedOut();
    alert("LoggedOut Successfully!!!");
  }
  ngOnInit(): void { }
}
