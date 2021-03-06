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
  private base_url = "https://happyway-backend.herokuapp.com/api/";
  private selfDrive_url = "http://localhost:3000/api/";


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
    return this.http.post<vehicleDetails[]>(this.base_url + "vehicleDetails", { useCase: data });
  }

  confirmBooking(total): Observable<confirmBookingSelfDrive> {
    var data = this.selfDriveForm;
    data["total"] = total;
    return this.http.post<confirmBookingSelfDrive>(
      this.base_url + "self-drive",
      data
    );
  }

  getSelfDriveDetails(): Observable<confirmBookingSelfDrive[]> {
    return this.http.get<confirmBookingSelfDrive[]>(this.base_url + "selfDriveDetails");
  }

  getSelectedVehicleDetails(id): Observable<vehicleDetails> {
    return this.http.post<vehicleDetails>(this.base_url + "selectedVehicleData", { id: id });
  }

  public vehicleDetails = [{}];
  public city = [];
  public selectedVehicle = [];
  public toggle = false;
}
