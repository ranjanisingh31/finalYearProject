import { Component, OnInit, Inject } from '@angular/core';
import { SelfDriveService } from 'src/app/_services_guard_interceptor/self-drive.service';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";


@Component({
  selector: 'app-admin-selected-vehicle-dialog',
  templateUrl: './admin-selected-vehicle-dialog.component.html',
  styleUrls: ['./admin-selected-vehicle-dialog.component.css']
})
export class AdminSelectedVehicleDialogComponent implements OnInit {

  constructor(private _selfDriveService: SelfDriveService, @Inject(MAT_DIALOG_DATA) public data, private dialogRef: MatDialogRef<AdminSelectedVehicleDialogComponent>) { }

  public vehicleData;
  ngOnInit(): void {
    this.vehicleData = this.data.vehicle;
  }

}
