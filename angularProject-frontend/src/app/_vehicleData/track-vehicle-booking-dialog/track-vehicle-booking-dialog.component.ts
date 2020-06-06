import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
  selector: "app-track-vehicle-booking-dialog",
  templateUrl: "./track-vehicle-booking-dialog.component.html",
  styleUrls: ["./track-vehicle-booking-dialog.component.css"],
})
export class TrackVehicleBookingDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TrackVehicleBookingDialogComponent>, private router: Router
  ) { }

  start() {
    this.dialogRef.close();
    this.router.navigate(["/track-vehicle/track-selected-plan"]);
  }
  onClose() {
    this.dialogRef.close();
  }
  ngOnInit(): void { }
}
