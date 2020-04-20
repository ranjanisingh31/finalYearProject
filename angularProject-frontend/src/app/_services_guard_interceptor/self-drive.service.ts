import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { vehicleDetails } from "../_interfaces/vehicleDetails";
import { confirmBookingSelfDrive } from "../_interfaces/confirmBookingSelfDrive";

@Injectable({
  providedIn: "root",
})
export class SelfDriveService {
  constructor(private http: HttpClient) {}
  private selfDrive_url = "http://localhost:3000/api/self-drive";
  private vehicleDetails_url = "http://localhost:3000/api/vehicleDetails";

  public selfDriveForm = {};
  setUserRequirements(data) {
    this.selfDriveForm = data;
  }
  setUserSubmitFormDetails(data, data1) {
    this.selfDriveForm["clientDetails"] = data;
    this.selfDriveForm["selectedVehicleDetails"] = data1;
  }
  getUserRequirements() {
    return this.selfDriveForm;
  }

  getVehicleDetails(): Observable<vehicleDetails[]> {
    return this.http.get<vehicleDetails[]>(this.vehicleDetails_url);
  }

  confirmBooking(): Observable<confirmBookingSelfDrive> {
    return this.http.post<confirmBookingSelfDrive>(
      this.selfDrive_url,
      this.selfDriveForm
    );
  }
}
