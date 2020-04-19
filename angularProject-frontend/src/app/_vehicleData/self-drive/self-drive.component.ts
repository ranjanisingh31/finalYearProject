import { Component, OnInit } from "@angular/core";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { SigninAuthService } from "src/app/_services_guard_interceptor/signin-auth.service";
import { SelfDriveService } from "src/app/_services_guard_interceptor/self-drive.service";
import { LoginPageComponent } from "src/app/_dashboard/login-page/login-page.component";

@Component({
  selector: "app-self-drive",
  templateUrl: "./self-drive.component.html",
  styleUrls: ["./self-drive.component.css"],
})
export class SelfDriveComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  minDate1: Date;
  maxDate1: Date;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private _signinService: SigninAuthService,
    private _selfDriveService: SelfDriveService
  ) {
    this.minDate = new Date();
    this.maxDate = new Date(
      this.minDate.getFullYear(),
      this.minDate.getMonth(),
      this.minDate.getDate() + 5
    );
  }

  setEndDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.minDate1 = new Date();
    this.minDate1 = event.value;
    this.maxDate1 = new Date(
      this.minDate1.getFullYear(),
      this.minDate1.getMonth(),
      this.minDate1.getDate() + 5
    );

    this.selfDriveForm.patchValue({
      endDate: "",
    });
  }

  //FORMBUILDER
  selfDriveForm = this.fb.group({
    city: ["", Validators.required],
    deliveryAddress: ["", Validators.required],
    startDate: ["", Validators.required],
    endDate: ["", Validators.required],
    vehicle: ["", Validators.required],
  });

  //FORM SUBMIT
  onSubmit() {
    this._selfDriveService.setUserRequirements(this.selfDriveForm.value);
    if (this._signinService.loggedIn()) {
      this.router.navigate(["/self-drive"]);
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
  public formData = {};
  ngOnInit(): void {
    this.formData = this._selfDriveService.getUserRequirements();
    this.selfDriveForm.patchValue({
      city: this.formData["city"],
      deliveryAddress: this.formData["deliveryAddress"],
      startDate: this.formData["startDate"],
      endDate: this.formData["endDate"],
      vehicle: this.formData["vehicle"],
    });
  }
}
