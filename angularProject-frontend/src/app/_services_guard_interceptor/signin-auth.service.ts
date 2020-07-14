import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { registrationDetails } from "../_interfaces/registrationDetails";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
@Injectable({ providedIn: "root" })
export class SigninAuthService {
    constructor(private http: HttpClient, private router: Router) { }
    private base_url = "http://localhost:3000/api/";
    private _registerUrl = "https://happyway-backend.herokuapp.com/api/";

    registerUser(userData): Observable<registrationDetails> {
        return this.http.post<registrationDetails>(this.base_url + "register", userData);
    }

    loginUser(userData): Observable<registrationDetails> {
        return this.http.post<registrationDetails>(this.base_url + "login", userData);
    }

    resetPassword(userData): Observable<registrationDetails> {
        return this.http.post<registrationDetails>(this.base_url + "reset", userData);
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
