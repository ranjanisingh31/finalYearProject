import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { SelfDriveService } from "src/app/_services_guard_interceptor/self-drive.service";
import { SelfDriveInfoDialogComponent } from "../self-drive-info-dialog/self-drive-info-dialog.component";
import { FormBuilder, Validators } from "@angular/forms";
import { vehicleDetails } from "src/app/_interfaces/vehicleDetails";
import { SelfDriveConfirmDialogComponent } from "../self-drive-confirm-dialog/self-drive-confirm-dialog.component";

@Component({
  selector: "app-self-drive-details",
  templateUrl: "./self-drive-details.component.html",
  styleUrls: ["./self-drive-details.component.css"],
})
export class SelfDriveDetailsComponent implements OnInit {
  constructor(
    private _selfDriveService: SelfDriveService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}
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
  public _detail: vehicleDetails;
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
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
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
    this._selfDriveService.setUserSubmitFormDetails(
      this.personalDetailsForm.value,
      this._detail
    );
    this.dialog.open(SelfDriveConfirmDialogComponent, {
      width: "800px",
      height: "400px",
      data: {
        details: this._selfDriveService.getUserRequirements(),
      },
    });
  }
  ngOnInit(): void {
    this._selfDriveService.getVehicleDetails().subscribe((res) => {
      this.vehicleDetails = res;
    });
  }
}
