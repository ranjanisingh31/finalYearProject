import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ChauffeurDriveService {
  constructor() {}
  public chauffeurDriveForm = {};
  setUserRequirements(data, data1) {
    this.chauffeurDriveForm = data;
    this.chauffeurDriveForm["type"] = data1;
    console.log("data", this.chauffeurDriveForm);
  }
  setFormDetails(data) {
    this.chauffeurDriveForm["clientDetails"] = data;
    console.log("data", this.chauffeurDriveForm);
  }
  getUserRequirements() {
    return this.chauffeurDriveForm;
  }
}
