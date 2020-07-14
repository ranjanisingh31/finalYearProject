import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { trackDetails } from "../_interfaces/trackDetails";
import { trackPlan } from "../_interfaces/trackPlan";
import { editVehicle } from '../_interfaces/editVehicle';
import { coordinates } from '../_interfaces/coordinates';

@Injectable({ providedIn: "root" })
export class TrackVehicleService {
    constructor(private http: HttpClient) { }
    private _trackUrl = "http://localhost:3000/api/";
    private base_url = "https://happyway-backend.herokuapp.com/api/track";


    public trackDetails = {};
    setUserTrackInfo(data, data1) {
        this.trackDetails = data;
        this.trackDetails["selectedPlan"] = data1;
    }
    confirmTrackingDetails(total): Observable<trackDetails> {
        var data = this.trackDetails;
        data["total"] = total;
        return this.http.post<trackDetails>(this.base_url + "track", data);
    }
    getTrackPlan(): Observable<trackPlan> {
        return this.http.get<trackPlan>(this.base_url + "trackPlan");
    }

    public clientInfo = {};
    public planInfo = {};
    public editVehicle = [];
    setUserAndTrackInfoAfterVerification(clientInfo, planInfo, vehicleInfo) {
        this.clientInfo = clientInfo;
        this.planInfo = planInfo;
        this.editVehicle = vehicleInfo;
    }

    addVehicle_Edit(data, id): Observable<editVehicle> {
        var value = {};
        value = data;
        value["searchId"] = id;
        return this.http.post<editVehicle>(this.base_url + "addVehicle", value);
    }
    removeVehicle_Edit(data, id): Observable<editVehicle> {
        var value = {};
        value = data;
        value["searchId"] = id;
        return this.http.put<editVehicle>(this.base_url + "removeVehicle", value);
    }
    getSelectedPlan(email): Observable<trackDetails> {
        return this.http.post<trackDetails>(this.base_url + "selectedTrackPlan", { email: email });
    }
    getUserTrackData(): Observable<trackDetails[]> {
        return this.http.get<trackDetails[]>(this.base_url + "userTrackDetails");
    }
}