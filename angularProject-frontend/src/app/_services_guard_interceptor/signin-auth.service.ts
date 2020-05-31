import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {registrationDetails} from "../_interfaces/registrationDetails";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
@Injectable({providedIn: "root"})
export class SigninAuthService {
    constructor(private http : HttpClient, private router : Router) {}
    private _registerUrl = "http://localhost:3000/api/register";
    private _loginUrl = "http://localhost:3000/api/login";
    private _resetPassUrl = "http://localhost:3000/api/reset";

    registerUser(userData): Observable < registrationDetails > {
        return this.http.post<registrationDetails>(this._registerUrl, userData);
    }

    loginUser(userData): Observable < registrationDetails > {
        return this.http.post<registrationDetails>(this._loginUrl, userData);
    }

    resetPassword(userData): Observable < registrationDetails > {
        return this.http.post<registrationDetails>(this._resetPassUrl, userData);
    }

    loggedIn() {
        var t = !!localStorage.getItem("token");
        return t;
    }

    loggedOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        this.router.navigate(["/"]);
    }
    getToken() {
        return localStorage.getItem("token");
    }

    getVerifiedEmail() {
        return localStorage.getItem("email");

    }
}
