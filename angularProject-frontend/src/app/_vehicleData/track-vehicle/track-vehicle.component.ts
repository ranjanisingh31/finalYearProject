import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { TrackVehicleService } from "src/app/_services_guard_interceptor/track-vehicle.service";
import { HttpErrorResponse } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { TrackVehicleBookingDialogComponent } from "../track-vehicle-booking-dialog/track-vehicle-booking-dialog.component";
import { trackPlan } from "src/app/_interfaces/trackPlan";
import { SigninAuthService } from "src/app/_services_guard_interceptor/signin-auth.service";
import { Router } from "@angular/router";
import { MatStepper } from "@angular/material/stepper";

@Component({ selector: "app-track-vehicle", templateUrl: "./track-vehicle.component.html", styleUrls: ["./track-vehicle.component.css"] })
export class TrackVehicleComponent implements OnInit {
    @ViewChild('stepper') private stepper: MatStepper;
    constructor(private fb: FormBuilder, private _trackServices: TrackVehicleService, private dialog: MatDialog, private _signinAuthService: SigninAuthService, private router: Router) { }

    userDetails_track = this.fb.group({
        fullName: [
            "", Validators.required
        ],
        email: [
            "",
            [
                Validators.required, Validators.email
            ]
        ],
        mob: [
            "",
            [
                Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("^[0-9]*$"),
            ],
        ],
        address: [
            "", Validators.required
        ],
        city: [
            "",
            [Validators.required]
        ],
        state: [
            "", Validators.required
        ],
        postalCode: [
            "",
            [
                Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern("^[0-9]*$"),
            ],
        ],
        trackFor: [
            "", Validators.required
        ],
        companyName: [""],
        url: [""],
        companyDesc: [""]
    });

    checkPlan_track = this.fb.group({
        check: ['', Validators.required]
    });

    public data1 = {};
    public gst: number = 21;
    public gstValue;
    public grandT;
    calculateGstValue() {
        this.gstValue = (this.data1["price"] * Number(this.gst)) / 100;
        this.grandT = (this.data1["price"] + this.gstValue).toFixed(2);
    }

    public data;
    public count = false;
    checkUncheckAll(item) {
        this.data1 = item;
        this.data = item.vehicle;
    }
    track() {
        this._trackServices.getSelectedPlan(this.email).subscribe((res) => {
            if (res === null) {
                alert("Not Selected any plan yet???")
                window.location.hash = "stepper";
            } else {
                this._trackServices.setUserAndTrackInfoAfterVerification(res, res.selectedPlan, res.addVehicle);
                this.router.navigate(["/track-vehicle/track-selected-plan"]);
            }
        }, (err) => {
            if (err instanceof HttpErrorResponse) {
                alert(err.error.message + " Please select a plan !!!");
                window.location.hash = "stepper";
            }
        });
    }
    onSubmit() {
        this._trackServices.setUserTrackInfo(this.userDetails_track.value, this.data1);
        this.calculateGstValue();
    }
    confirm() {
        this.count = true;
        this._trackServices.confirmTrackingDetails(this.grandT).subscribe((res) => {
            console.log(res.message);
            this.dialog.open(TrackVehicleBookingDialogComponent, {
                width: "450px",
                height: "500px",
                data: {
                    vehicle: this.data1["vehicle"]
                }
            });

        }, (err) => {
            if (err instanceof HttpErrorResponse) {
                alert(err.error.message);
                this.stepper.reset();
                this.data = null;
                this.data1 = null;
            }
        });

    }
    public planDetails: trackPlan[];
    public email;
    ngOnInit(): void {
        var data = {};
        this._trackServices.getTrackPlan().subscribe((res) => {
            data = res;
            this.planDetails = Object.values(data);
        });
        this.email = this._signinAuthService.getVerifiedEmail();
        this.userDetails_track.patchValue({ email: this.email });
    }
}
