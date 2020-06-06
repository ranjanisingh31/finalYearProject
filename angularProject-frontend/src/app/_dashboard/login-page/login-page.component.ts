import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SigninAuthService } from "src/app/_services_guard_interceptor/signin-auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _signinService: SigninAuthService,
    public dialog: MatDialog,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  public hide = true;

  openResetPass() {
    this.dialog.open(LoginPageComponent, {
      width: "450px",
      data: {
        login: false,
        reset: true,
        register: false,
      },
    });
  }
  openRegister() {
    this.dialog.open(LoginPageComponent, {
      width: "450px",
      data: {
        login: false,
        reset: false,
        register: true,
      },
    });
  }
  openLogin() {
    this.dialog.open(LoginPageComponent, {
      width: "450px",
      data: {
        login: true,
        reset: false,
        register: false,
      },
    });
  }

  //Login
  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],
  });

  onSubmitLogin(email, pass) {
    if (email === "admin@gmail.com" && pass === "123") {
      this.router.navigate(["/admin"]);
    }
    else {
      this._signinService.loginUser(this.loginForm.value).subscribe(
        (res) => {
          localStorage.setItem("token", res.token);
          localStorage.setItem("email", res.email);
          alert(res.message);
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              alert(err.error.message + " Enter registered Email.");
            } else {
              alert(err.statusText + " Try Again!!!");
            }
          }
          this.openLogin();
        }
      );
    }
  }
  //registration
  registerationForm = this.fb.group({
    fullName: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],
  });

  onSubmitRegister() {
    this._signinService.registerUser(this.registerationForm.value).subscribe(
      (res) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("email", res.email);
        alert(res.message);
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            alert(err.error.message + " Please Register again!!!");
          } else {
            alert(err.statusText + " Try Again!!!");
          }
        }
        this.openRegister();
      }
    );
  }
  //reset password
  resetPasswordForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],
  });

  onSubmitReset() {
    this._signinService.resetPassword(this.resetPasswordForm.value).subscribe(
      (res) => {
        alert(res.message);
        this.openLogin();
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            alert(err.error.message);
          } else {
            alert(err.statusText + ". Try Again!!!");
          }
        }
        this.openResetPass();
      }
    );
  }

  ngOnInit(): void { }
}
