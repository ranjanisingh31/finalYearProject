import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { TrackVehicleService } from 'src/app/_services_guard_interceptor/track-vehicle.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from "@angular/common/http";
import { SigninAuthService } from 'src/app/_services_guard_interceptor/signin-auth.service';
import { SocketIoServiceService } from 'src/app/_services_guard_interceptor/socket-io-service.service';

@Component({ selector: 'app-track-edit-vehicle-info-dialog', templateUrl: './track-edit-vehicle-info-dialog.component.html', styleUrls: ['./track-edit-vehicle-info-dialog.component.css'] })
export class TrackEditVehicleInfoDialogComponent implements OnInit {

    constructor(private fb: FormBuilder, private _trackService: TrackVehicleService, private dialogRef: MatDialogRef<TrackEditVehicleInfoDialogComponent>, private _signinService: SigninAuthService, @Inject(MAT_DIALOG_DATA) public dialog_data: any, private _socketService: SocketIoServiceService) { }
    // color
    public colors = [
        {
            name: "Green"
        },
        {
            name: "Yellow"
        },
        {
            name: "Red"
        },
        {
            name: "Blue"
        }, {
            name: "Orange"
        }, {
            name: "Black"
        }
    ];
    vehicleDataForm = this.fb.group({
        vehiclePlan: [
            '', Validators.required
        ],
        userId: [
            '', Validators.required
        ],
        vehicleName: [
            '', Validators.required
        ],
        expirationDate: [
            "", Validators.required
        ],
        iconColor: [
            "", Validators.required
        ],
        moving: [
            "", Validators.required
        ],
        stopped: [
            "", Validators.required
        ],
        offline: ["", Validators.required]
    });
    public deleteButtonDisable = true;
    save() {
        this._trackService.addVehicle_Edit(this.vehicleDataForm.value, this._trackService.clientInfo["data"]._id).subscribe((res) => {
            alert(res.message);
            this.dialogRef.close();
        }, (err) => {
            if (err instanceof HttpErrorResponse) {
                alert(err.error.message + " Try adding vehicle again!!!");
                this.dialogRef.close();
            }
        })

    }
    close() {
        this.dialogRef.close();
    }
    delete() {
        this._trackService.removeVehicle_Edit(this.vehicleDataForm.value, this._trackService.clientInfo["data"]._id).subscribe((res) => {
            alert(res.message);
            this._socketService.socket.emit("updateSelectedPlan", this._signinService.getVerifiedEmail());
            this._socketService.socket.on("response", res => {
                this._trackService.setUserAndTrackInfoAfterVerification(res, res.selectedPlan, res.addVehicle);
            });
            this.dialogRef.close();
        }, (err) => {
            if (err instanceof HttpErrorResponse) {
                alert(err.error.message + " Try again!!!");
                this.dialogRef.close();
            }
        });

    }
    public userIds = [];
    ngOnInit(): void {
        var _month = this._trackService.clientInfo["data"].expirationDate.split('-');
        var data = this._trackService.clientInfo["data"].userIDs;
        this._socketService.socket.emit("updateSelectedPlan", this._signinService.getVerifiedEmail());
        this._socketService.socket.on("response", res => {
            this._trackService.setUserAndTrackInfoAfterVerification(res, res.selectedPlan, res.addVehicle);
            if (this._trackService.editVehicle.length !== 0) {
                var data1 = [];
                for (var i = 0; i < this._trackService.editVehicle.length; i++) {
                    data1.push(this._trackService.editVehicle[i]["userId"]);
                    this.userIds = data.filter(function (i) {
                        return this.indexOf(i) < 0;
                    }, data1);
                }
            }
            else {
                this.userIds = data
            }
        });



        var _date = _month[2].split('');
        console.log(_month, _date);
        this.vehicleDataForm.patchValue({
            expirationDate: `${
                _date[0]
                }${
                _date[1]
                }-${
                _month[1]
                }-${
                _month[0]
                }`,
            vehiclePlan: this._trackService.planInfo["vehicle"]
        });
        if (this.dialog_data.edit === true) {
            for (var i = 0; i < this._trackService.editVehicle.length; i++) {
                if (this.dialog_data.edit === true) {
                    this.deleteButtonDisable = false;
                    if (this.dialog_data.vehicleName === this._trackService.editVehicle[i]["vehicleName"]) {
                        this.vehicleDataForm.patchValue({
                            userId: this._trackService.editVehicle[i]["userId"],
                            vehicleName: this._trackService.editVehicle[i]["vehicleName"],
                            iconType: this._trackService.editVehicle[i]["iconType"],
                            moving: this._trackService.editVehicle[i]["moving"],
                            stopped: this._trackService.editVehicle[i]["stopped"],
                            offline: this._trackService.editVehicle[i]["offline"],
                            iconColor: this._trackService.editVehicle[i]["iconColor"]
                        });
                    }
                }
                else {
                    this.deleteButtonDisable = true;
                }
            }

        }
    }
}
