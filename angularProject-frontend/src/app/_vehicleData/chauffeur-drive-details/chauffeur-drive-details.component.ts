import { Component, OnInit } from "@angular/core";
import { ChauffeurDriveService } from "src/app/_services_guard_interceptor/chauffeur-drive.service";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-chauffeur-drive-details",
  templateUrl: "./chauffeur-drive-details.component.html",
  styleUrls: ["./chauffeur-drive-details.component.css"],
})
export class ChauffeurDriveDetailsComponent implements OnInit {
  constructor(
    private _chauffeurDriveService: ChauffeurDriveService,
    private fb: FormBuilder
  ) {}

  public personalDetailsForm = this.fb.group({
    fullName: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    mobile: [
      "",
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
    gender: ["", [Validators.required]],
    dob: ["", Validators.required],
  });
  onSubmit() {
    this._chauffeurDriveService.setFormDetails(this.personalDetailsForm.value);
  }
  ngOnInit(): void {}
}
