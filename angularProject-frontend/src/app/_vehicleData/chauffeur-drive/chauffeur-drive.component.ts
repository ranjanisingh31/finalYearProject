import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

@Component({
  selector: "app-chauffeur-drive",
  templateUrl: "./chauffeur-drive.component.html",
  styleUrls: ["./chauffeur-drive.component.css"],
})
export class ChauffeurDriveComponent implements OnInit {
  constructor(private fb: FormBuilder) {
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
  selectedRadio: string;
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

  public check;
  ngOnInit(): void {
    this.check = this.radios[0].title;
  }
}
