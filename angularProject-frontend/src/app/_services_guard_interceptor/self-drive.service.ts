import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { vehicleDetails } from "../_interfaces/vehicleDetails";
import { confirmBookingSelfDrive } from "../_interfaces/confirmBookingSelfDrive";

@Injectable({
  providedIn: "root",
})
export class SelfDriveService {
  constructor(private http: HttpClient) { }
  private selfDrive_url = "http://localhost:3000/api/self-drive";
  private getVehicleDetails_url = "http://localhost:3000/api/vehicleDetails";
  private selfDriveDetails_url = "http://localhost:3000/api/selfDriveDetails";
  private selectedVehicle_url = "http://localhost:3000/api/selectedVehicleData";

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

  getVehicleDetails(data): Observable<vehicleDetails[]> {
    return this.http.post<vehicleDetails[]>(this.getVehicleDetails_url, { useCase: data });
  }

  confirmBooking(total): Observable<confirmBookingSelfDrive> {
    var data = this.selfDriveForm;
    data["total"] = total;
    return this.http.post<confirmBookingSelfDrive>(
      this.selfDrive_url,
      data
    );
  }

  getSelfDriveDetails(): Observable<confirmBookingSelfDrive[]> {
    return this.http.get<confirmBookingSelfDrive[]>(this.selfDriveDetails_url);
  }

  getSelectedVehicleDetails(id): Observable<vehicleDetails> {
    return this.http.post<vehicleDetails>(this.selectedVehicle_url, { id: id });
  }

  public vehicleDetails = [{}];
  public city = [];
  public selectedVehicle = [];
  public toggle = false;
}
