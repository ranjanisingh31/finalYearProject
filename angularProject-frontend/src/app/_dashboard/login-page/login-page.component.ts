import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SigninAuthService } from "src/app/_services_guard_interceptor/signin-auth.service";
import { HttpErrorResponse } from "@angular/common/http";

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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
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

  onSubmitLogin() {
    console.log(this.loginForm.value);
    this._signinService.loginUser(this.loginForm.value).subscribe(
      (res) => {
        localStorage.setItem("token", res.token);
        alert(res.message);
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            alert(err.error.message + " Enter registered Email.");
          } else {
            console.log(err);
            alert(err.statusText + " Try Again!!!");
          }
        }
        this.openLogin();
      }
    );
  }
  //registration
  registerationForm = this.fb.group({
    fullName: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],
  });

  onSubmitRegister() {
    console.log("value", this.registerationForm.value);
    this._signinService.registerUser(this.registerationForm.value).subscribe(
      (res) => {
        localStorage.setItem("token", res.token);
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
    console.log("value", this.resetPasswordForm.value);
    this._signinService.resetPassword(this.resetPasswordForm.value).subscribe(
      (res) => {
        console.log("res", res);
        alert(res.message);
        this.openLogin();
      },
      (err) => {
        console.log("err", err);
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            console.log("err1", err);
            alert(err.error.message);
          } else {
            console.log("err", err);
            alert(err.statusText + ". Try Again!!!");
          }
        }
        this.openResetPass();
      }
    );
  }

  ngOnInit(): void {}
}
