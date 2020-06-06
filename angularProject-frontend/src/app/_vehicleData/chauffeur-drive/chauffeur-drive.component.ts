import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { ChauffeurDriveService } from "src/app/_services_guard_interceptor/chauffeur-drive.service";
import { Router } from "@angular/router";
import { SigninAuthService } from "src/app/_services_guard_interceptor/signin-auth.service";
import { MatDialog } from "@angular/material/dialog";
import { LoginPageComponent } from "src/app/_dashboard/login-page/login-page.component";

@Component({
  selector: "app-chauffeur-drive",
  templateUrl: "./chauffeur-drive.component.html",
  styleUrls: ["./chauffeur-drive.component.css"],
})
export class ChauffeurDriveComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _chauffeurDriveService: ChauffeurDriveService,
    private router: Router,
    private _signinService: SigninAuthService,
    private dialog: MatDialog
  ) {
    this.minDate = new Date();
    this.maxDate = new Date(
      this.minDate.getFullYear(),
      this.minDate.getMonth(),
      this.minDate.getDate() + 5
    );
  }
  public radios = [
    {
      title: "AIRPORT & RAILWAY TRANSFERS",
    },
    {
      title: "WITHIN CITY",
    },
    {
      title: "OUTSTATION",
    },
  ];

  //AIRPORT/RAILWAY
  selectedRadio: string = "AIRPORT & RAILWAY TRANSFERS";
  minDate: Date;
  maxDate: Date;
  minDate1: Date;
  maxDate1: Date;
  minDate2: Date;
  maxDate2: Date;

  chauffeurAirportRailway = this.fb.group({
    city: ["", Validators.required],
    transferType: ["", Validators.required],
    pickupAddress: ["", Validators.required],
    startDate: ["", Validators.required],
  });
  onSubmitAR() {
    this._chauffeurDriveService.setUserRequirements(
      this.chauffeurAirportRailway.value,
      this.selectedRadio
    );
    this.checkSignin();
  }
  //WITHINCITY
  chauffeurWithinCity = this.fb.group({
    city: ["", Validators.required],
    pickupAddress: ["", Validators.required],
    startDate: ["", Validators.required],
    endDate: ["", Validators.required],
  });
  setEndDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.minDate1 = new Date();
    this.minDate1 = event.value;
    this.maxDate1 = new Date(
      this.minDate1.getFullYear(),
      this.minDate1.getMonth(),
      this.minDate1.getDate() + 3
    );

    this.chauffeurWithinCity.patchValue({
      endDate: "",
    });
  }

  onSubmitWC() {
    this._chauffeurDriveService.setUserRequirements(
      this.chauffeurWithinCity.value,
      this.selectedRadio
    );
    this.checkSignin();
  }

  //OUTSTATION
  chauffeurOutstation = this.fb.group({
    city: ["", Validators.required],
    toCity: ["", Validators.required],
    pickupAddress: ["", Validators.required],
    startDate: ["", Validators.required],
    endDate: ["", Validators.required],
  });
  setEndDate1(type: string, event: MatDatepickerInputEvent<Date>) {
    this.minDate2 = new Date();
    this.minDate2 = event.value;
    this.maxDate2 = new Date(
      this.minDate2.getFullYear(),
      this.minDate2.getMonth(),
      this.minDate2.getDate() + 3
    );
    this.chauffeurOutstation.patchValue({
      endDate: "",
    });
  }
  onSubmitO() {
    this._chauffeurDriveService.setUserRequirements(
      this.chauffeurOutstation.value,
      this.selectedRadio
    );
    this.checkSignin();
  }
  //authentication
  checkSignin() {
    if (this._signinService.loggedIn()) {
      this._chauffeurDriveService.toggle = true;
      this.router.navigate(["/chauffeur-drive"]);
    } else {
      this.dialog.open(LoginPageComponent, {
        width: "450px",
        data: {
          reset: false,
          login: true,
          register: false,
        },
      });
    }
  }
  //on city change
  public vehicles = [];
  cityChange(event) {
    this.vehicles = [];
    var details = [{}];
    details = this._chauffeurDriveService.vehicleDetails;
    for (let i = 0; i < details.length; i++) {
      for (let j = 0; j < details[i]["city"].length; j++) {
        if (details[i]["city"][j] === event.value && details[i]["type"] === this.selectedRadio) {
          this.vehicles.push(details[i]["name"]);
        }
      }
    }

    this._chauffeurDriveService.selectedVehicle = this.vehicles;
  }

  cityChange1(value) {
    this.vehicles = [];
    var details = [{}];
    details = this._chauffeurDriveService.vehicleDetails;
    if (details.length !== 1) {
      for (let i = 0; i < details.length; i++) {
        for (let j = 0; j < details[i]["city"].length; j++) {
          if (details[i]["city"][j] === value && details[i]["type"] === this.selectedRadio) {
            this.vehicles.push(details[i]["name"]);
          }
        }
      } this._chauffeurDriveService.selectedVehicle = this.vehicles;
    }
  }
  onchangeRadio() {
    for (let i = 0; i < this._chauffeurDriveService.vehicleDetails.length; i++) {
      for (let j = 0; j < this._chauffeurDriveService.vehicleDetails[i]["city"].length; j++) {
        if (this._chauffeurDriveService.vehicleDetails[i]["type"] === this.selectedRadio) {
          this._chauffeurDriveService.city.push(this._chauffeurDriveService.vehicleDetails[i]["city"][j]);
          this._chauffeurDriveService.city = this._chauffeurDriveService.city.filter((el, i, a) => i === a.indexOf(el));
        }
      }
    }
    this.city = this._chauffeurDriveService.city;
  }

  public formData = {};
  public city = [];
  ngOnInit(): void {
    this._chauffeurDriveService.getVehicleDetails("chauffeur-drive").subscribe((res) => {
      this._chauffeurDriveService.vehicleDetails = res;
      this.onchangeRadio();
    })

    this.formData = this._chauffeurDriveService.getUserRequirements();
    this.cityChange1(this.formData["city"]);
    if (this.formData["type"] === "AIRPORT & RAILWAY TRANSFERS") {
      this.selectedRadio = this.formData["type"];
      this.chauffeurAirportRailway.patchValue({
        city: this.formData["city"],
        transferType: this.formData["transferType"],
        pickupAddress: this.formData["pickupAddress"],
        startDate: this.formData["startDate"],
      });
    } else if (this.formData["type"] === "WITHIN CITY") {
      this.selectedRadio = this.formData["type"];
      this.chauffeurWithinCity.patchValue({
        city: this.formData["city"],
        pickupAddress: this.formData["pickupAddress"],
        startDate: this.formData["startDate"],
        endDate: this.formData["endDate"],
      });
    } else if (this.formData["type"] === "OUTSTATION") {
      this.selectedRadio = this.formData["type"];
      this.chauffeurOutstation.patchValue({
        city: this.formData["city"],
        toCity: this.formData["toCity"],
        pickupAddress: this.formData["pickupAddress"],
        startDate: this.formData["startDate"],
        endDate: this.formData["endDate"],
      });
    }
  }
}
