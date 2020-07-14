import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SelfDriveService } from "src/app/_services_guard_interceptor/self-drive.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-self-drive-confirm-dialog",
  templateUrl: "./self-drive-confirm-dialog.component.html",
  styleUrls: ["./self-drive-confirm-dialog.component.css"],
})
export class SelfDriveConfirmDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SelfDriveConfirmDialogComponent>,
    private _selfDriveService: SelfDriveService,
    private router: Router
  ) { }

  public gst = 12;
  public startDate = this.data.details.startDate.toString().split(" ", 4);
  public endDate = this.data.details.endDate.toString().split(" ", 4);
  public duration = (this.endDate[2] - this.startDate[2]) * 24;
  public taxes = (this.data.details.selectedVehicleDetails.price * 12) / 100;
  public total: number =
    parseInt(this.data.details.selectedVehicleDetails.price) * this.duration / 24 + this.taxes;

  onClose() {

    this.dialogRef.close();
  }
  confirm() {
    this._selfDriveService.confirmBooking(this.total).subscribe(
      (res) => {
        alert(res.message);
        this.dialogRef.close();
        this.router.navigate(["/"]);
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          alert(err.error.message + " Please Add vehicle details again!!!");
        }
      }
    );
  }
  ngOnInit(): void { }
}
