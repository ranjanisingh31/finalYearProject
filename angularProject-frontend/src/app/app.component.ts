import { Component } from "@angular/core";
import { SigninAuthService } from "./_services_guard_interceptor/signin-auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "angularProject-frontend";
  // constructor(private _signService: SigninAuthService) {}
  // ngOnInit(): void {
  //   this._signService.loggedOut();
  // }
}
