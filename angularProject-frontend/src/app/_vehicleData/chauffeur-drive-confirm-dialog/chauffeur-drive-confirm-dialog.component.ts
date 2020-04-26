import { Component, OnInit, Inject } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ChauffeurDriveService } from "src/app/_services_guard_interceptor/chauffeur-drive.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-chauffeur-drive-confirm-dialog",
  templateUrl: "./chauffeur-drive-confirm-dialog.component.html",
  styleUrls: ["./chauffeur-drive-confirm-dialog.component.css"],
})
export class ChauffeurDriveConfirmDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ChauffeurDriveConfirmDialogComponent>,
    private _chauffeurDriveService: ChauffeurDriveService,
    private router: Router
  ) {}
  public type = this.data.details.type;
  public gst = 12;
  public start = this.data.details.startDate.toString().split(" ", 4);

  public end =
    this.type === "AIRPORT & RAILWAY TRANSFERS"
      ? null
      : this.data.details.endDate.toString().split(" ", 4);
  public duration =
    this.type === "AIRPORT & RAILWAY TRANSFERS"
      ? null
      : (this.end[2] - this.start[2]) * 24;
  public taxes = (this.data.details.selectedVehicleDetails.price * 12) / 100;
  public total: number =
    parseInt(this.data.details.selectedVehicleDetails.price) + this.taxes;

  onClose() {
    this.dialogRef.close();
  }
  confirm() {
    this._chauffeurDriveService.confirmBooking().subscribe(
      (res) => {
        alert(res.message);
        this.dialogRef.close();
        this.router.navigate(["/ThankYou-Page"]);
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          alert(err.error.message + " Please Add vehicle details again!!!");
        }
      }
    );
  }

  ngOnInit(): void {}
}
