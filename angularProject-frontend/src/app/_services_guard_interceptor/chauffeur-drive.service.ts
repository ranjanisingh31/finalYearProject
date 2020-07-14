import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { confirmBookingChauffeurDrive } from "../_interfaces/confirmBookingChauffeurDrive";
import { vehicleDetails } from '../_interfaces/vehicleDetails';


@Injectable({
  providedIn: "root",
})
export class ChauffeurDriveService {
  constructor(private http: HttpClient) { }

  private base_url = "https://happyway-backend.herokuapp.com/";
  private chauffeurDrive_url = "http://localhost:3000/";

  public chauffeurDriveForm = {};
  setUserRequirements(data, data1) {
    this.chauffeurDriveForm = data;
    this.chauffeurDriveForm["type"] = data1;
  }
  setFormDetails(data, data1) {
    this.chauffeurDriveForm["clientDetails"] = data;
    this.chauffeurDriveForm["selectedVehicleDetails"] = data1;
  }
  getUserRequirements() {
    return this.chauffeurDriveForm;
  }
  confirmBooking(total): Observable<confirmBookingChauffeurDrive> {
    var data = this.chauffeurDriveForm;
    data["total"] = total;
    return this.http.post<confirmBookingChauffeurDrive>(
      this.base_url + "api/chauffeur-drive",
      data);
  }
  getVehicleDetails(data): Observable<vehicleDetails[]> {
    return this.http.post<vehicleDetails[]>(this.base_url + "api/vehicleDetails", { useCase: data });
  }

  getChauffeurDriveDetails(): Observable<confirmBookingChauffeurDrive[]> {
    return this.http.get<confirmBookingChauffeurDrive[]>(this.base_url + "api/chauffeurDriveDetails");
  }

  public vehicleDetails = [{}];
  public city = [];
  public selectedVehicle = [];
  public toggle = false;
}
