import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { SelfDriveService } from "src/app/_services_guard_interceptor/self-drive.service";
import { SelfDriveInfoDialogComponent } from "../self-drive-info-dialog/self-drive-info-dialog.component";
import { FormBuilder, Validators } from "@angular/forms";
import { SelfDriveConfirmDialogComponent } from "../self-drive-confirm-dialog/self-drive-confirm-dialog.component";
import { SigninAuthService } from "src/app/_services_guard_interceptor/signin-auth.service";


@Component({
  selector: "app-self-drive-details",
  templateUrl: "./self-drive-details.component.html",
  styleUrls: ["./self-drive-details.component.css"],
})
export class SelfDriveDetailsComponent implements OnInit {
  constructor(
    private _selfDriveService: SelfDriveService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private _signinAuthService: SigninAuthService
  ) { }
  public min = 0;
  public max = 1;
  next() {
    this.min++;
    this.max++;
  }

  prev() {
    this.min--;
    this.max--;
  }
  //info

  getInfo(detail) {
    this.dialog.open(SelfDriveInfoDialogComponent, {
      width: "420px",
      height: "350px",
      data: {
        mode: detail.mode,
        seat: detail.seat,
        door: detail.door,
        luggage: detail.luggage,
      },
    });
  }
  //booking details
  public _detail;
  public toggle = false;
  bookingDetails(detail) {
    this._detail = detail;
    this.toggle = true;
  }
  //form
  public personalDetailsForm = this.fb.group({
    fullName: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    mobile: [
      "",
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern("^[0-9]*$"),
      ],
    ],
    gender: ["", [Validators.required]],
    dob: ["", Validators.required],
  });
  public vehicleDetails = [];
  public hideNext;
  public hidePrev;
  ngDoCheck() {
    if (this.min == 0) {
      this.hidePrev = false;
      this.hideNext = true;
    } else if (this.max == this.vehicleDetails.length) {
      this.hideNext = false;
      this.hidePrev = true;
    } else {
      this.hideNext = true;
      this.hidePrev = true;
    }
    this.toggleVehicle = this._selfDriveService.toggle;
    this.vehicledata();
  }
  onSubmit() {
    this._selfDriveService.setUserSubmitFormDetails(
      this.personalDetailsForm.value,
      this._detail
    );
    this.dialog.open(SelfDriveConfirmDialogComponent, {
      width: "1580px",
      height: "300px",
      data: {
        details: this._selfDriveService.getUserRequirements(),
      },
    });
  }
  public toggleVehicle = false;
  vehicledata() {
    this.vehicleDetails = [];
    for (let i = 0; i < this._selfDriveService.vehicleDetails.length; i++) {
      for (let j = 0; j < this._selfDriveService.selectedVehicle.length; j++) {
        if (this._selfDriveService.vehicleDetails[i]["name"] === this._selfDriveService.selectedVehicle[j]) {
          this.vehicleDetails.push(this._selfDriveService.vehicleDetails[i]);
        }
      }
    }
  }
  ngOnInit(): void {
    this.vehicledata();
    this.personalDetailsForm.patchValue({
      email: this._signinAuthService.getVerifiedEmail(),
    });
  }
}
