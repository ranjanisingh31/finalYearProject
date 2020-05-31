import { Component, OnInit } from "@angular/core";
import { ChauffeurDriveService } from "src/app/_services_guard_interceptor/chauffeur-drive.service";
import { FormBuilder, Validators } from "@angular/forms";
import { ChauffeurDriveConfirmDialogComponent } from "../chauffeur-drive-confirm-dialog/chauffeur-drive-confirm-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { ChauffeurDriveInfoDialogComponent } from "../chauffeur-drive-info-dialog/chauffeur-drive-info-dialog.component";
import { vehicleDetails } from "src/app/_interfaces/vehicleDetails";
import { SelfDriveService } from "src/app/_services_guard_interceptor/self-drive.service";
import { SigninAuthService } from "src/app/_services_guard_interceptor/signin-auth.service";

@Component({
  selector: "app-chauffeur-drive-details",
  templateUrl: "./chauffeur-drive-details.component.html",
  styleUrls: ["./chauffeur-drive-details.component.css"],
})
export class ChauffeurDriveDetailsComponent implements OnInit {
  constructor(
    private _chauffeurDriveService: ChauffeurDriveService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _selfDriveService: SelfDriveService,
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
    this.dialog.open(ChauffeurDriveInfoDialogComponent, {
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
  public _detail: vehicleDetails;
  public toggle = false;
  bookingDetails(detail) {
    this._detail = detail;
    this.toggle = true;
  }
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
  }
  onSubmit() {
    this._chauffeurDriveService.setFormDetails(
      this.personalDetailsForm.value,
      this._detail
    );
    this.dialog.open(ChauffeurDriveConfirmDialogComponent, {
      width: "1580px",
      height: "300px",
      data: {
        details: this._chauffeurDriveService.getUserRequirements(),
      },
    });
  }
  ngOnInit(): void {
    this._selfDriveService.getVehicleDetails().subscribe((res) => {
      this.vehicleDetails = res;
    });
    this.personalDetailsForm.patchValue({
      email: this._signinAuthService.getVerifiedEmail(),
    });
  }
}
