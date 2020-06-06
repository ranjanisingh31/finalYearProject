import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SelfDriveService } from 'src/app/_services_guard_interceptor/self-drive.service';
import { HttpErrorResponse } from "@angular/common/http";
import { MatTableDataSource } from "@angular/material/table";
import { confirmBookingChauffeurDrive } from 'src/app/_interfaces/confirmBookingChauffeurDrive';
import { AdminSelectedVehicleDialogComponent } from '../admin-selected-vehicle-dialog/admin-selected-vehicle-dialog.component';
import { MatDialog } from "@angular/material/dialog";
import { ChauffeurDriveService } from 'src/app/_services_guard_interceptor/chauffeur-drive.service';
import { confirmBookingSelfDrive } from 'src/app/_interfaces/confirmBookingSelfDrive';
import { TrackVehicleService } from 'src/app/_services_guard_interceptor/track-vehicle.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private _selfDriveService: SelfDriveService, private cd: ChangeDetectorRef, private dialog: MatDialog, private _chauffeurDriveService: ChauffeurDriveService, private _trackService: TrackVehicleService) { }


  vehicleData = {};
  selectedVehicleDetails(id) {
    this._selfDriveService.getSelectedVehicleDetails(id).subscribe((res) => {
      this.dialog.open(AdminSelectedVehicleDialogComponent, {
        width: '848px',
        data: { id: id, vehicle: res }
      });
    }, (err) => {
      if (err instanceof HttpErrorResponse) {
        console.log(err.error.message);
      }
    });

  }

  public displayedColumns: string[];
  public displayedColumns2: string[];
  public displayedColumns3: string[];
  public selfDriveData: MatTableDataSource<confirmBookingChauffeurDrive[]>;
  public chauffeurDriveData: MatTableDataSource<confirmBookingSelfDrive[]>;
  public trackData: MatTableDataSource<confirmBookingSelfDrive[]>;
  ngOnInit(): void {
    this._selfDriveService.getSelfDriveDetails().subscribe((res) => {
      this.selfDriveData = new MatTableDataSource<confirmBookingChauffeurDrive[]>()
      this.selfDriveData = res["data"];
    }, (err) => {
      if (err instanceof HttpErrorResponse) {
        console.log(err.error.message);
      }
    });
    this.displayedColumns = ['Number', 'Client Information', 'Vehicle Information', 'City', 'Delivery Address', 'Amount Paid', 'Start Date', 'End Date', 'Created At'];


    this._chauffeurDriveService.getChauffeurDriveDetails().subscribe((res) => {
      this.chauffeurDriveData = new MatTableDataSource<confirmBookingChauffeurDrive[]>()
      this.chauffeurDriveData = res["data"];
    }, (err) => {
      if (err instanceof HttpErrorResponse) {
        console.log(err.error.message);
      }
    });

    this.displayedColumns2 = ['Number', 'Client Information', 'Vehicle Information', 'City', 'Pickup Address', 'Amount Paid', 'Start Date', 'End Date', 'Created At', 'Type'];

    this._trackService.getUserTrackData().subscribe((res) => {
      this.trackData = new MatTableDataSource<confirmBookingChauffeurDrive[]>()
      this.trackData = res["data"];
    }, (err) => {
      if (err instanceof HttpErrorResponse) {
        console.log(err.error.message);
      }
    });
    this.displayedColumns3 = ['Number', 'Client Information', 'Company Information', 'Plan', 'Amount Paid', 'Expiration Date', 'Created At'];

  }
}