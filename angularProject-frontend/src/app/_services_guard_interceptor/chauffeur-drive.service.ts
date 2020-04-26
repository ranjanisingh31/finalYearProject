import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { confirmBookingChauffeurDrive } from "../_interfaces/confirmBookingChauffeurDrive";

@Injectable({
  providedIn: "root",
})
export class ChauffeurDriveService {
  constructor(private http: HttpClient) {}

  private chauffeurDrive_url = "http://localhost:3000/api/chauffeur-drive";
  private vehicleDetails_url = "http://localhost:3000/api/vehicleDetails_CD";
  public chauffeurDriveForm = {};
  setUserRequirements(data, data1) {
    this.chauffeurDriveForm = data;
    this.chauffeurDriveForm["type"] = data1;
  }
  setFormDetails(data, data1) {
    this.chauffeurDriveForm["clientDetails"] = data;
    this.chauffeurDriveForm["selectedVehicleDetails"] = data1;

    console.log("data", this.chauffeurDriveForm);
  }
  getUserRequirements() {
    return this.chauffeurDriveForm;
  }
  confirmBooking(): Observable<confirmBookingChauffeurDrive> {
    return this.http.post<confirmBookingChauffeurDrive>(
      this.chauffeurDrive_url,
      this.chauffeurDriveForm
    );
  }
}
