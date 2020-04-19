import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-self-drive-confirm-dialog",
  templateUrl: "./self-drive-confirm-dialog.component.html",
  styleUrls: ["./self-drive-confirm-dialog.component.css"],
})
export class SelfDriveConfirmDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  public duration = this.data.details.endDate - this.data.details.startDate;
  public gst = 12;
  public taxes = (this.data.details.selectedVehicleDetails.price * 12) / 100;
  public total = this.data.details.selectedVehicleDetails.price + this.taxes;
  ngOnInit(): void {}
}
