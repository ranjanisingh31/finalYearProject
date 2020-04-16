import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { SelfDriveService } from "src/app/_services_guard_interceptor/self-drive.service";
import { SelfDriveInfoDialogComponent } from "../self-drive-info-dialog/self-drive-info-dialog.component";
import { FormBuilder, Validators } from "@angular/forms";
import { vehicleDetails } from "src/app/_interfaces/vehicleDetails";

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
      width: "400px",
      height: "300px",
      data: {
        mode: detail.mode,
        seat: detail.seat,
        door: detail.door,
        luggage: detail.luggage,
      },
    });
  }
  //booking details
  public detail: vehicleDetails;
  bookingDetails(detail) {
    this.detail = detail;
  }
  //form
  public personalDetailsForm = this.fb.group({});
  public vehicleDetails = [];
  public hideNext;
  public hidePrev;
  ngDoCheck() {
    if (this.min == 0) {
      this.hidePrev = false;
      this.hideNext = true;
    } else if (
      this.max == this.vehicleDetails.length &&
      this.min == this.vehicleDetails.length - 1
    ) {
      this.hideNext = false;
      this.hidePrev = true;
    } else {
      this.hideNext = true;
      this.hidePrev = true;
    }
    console.log("max", this.max);
    console.log("min", this.min);
    console.log(this.vehicleDetails.length);
  }
  ngOnInit(): void {
    this._selfDriveService.getVehicleDetails().subscribe((res) => {
      this.vehicleDetails = res;
    });
  }
}
