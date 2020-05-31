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
    private _trackUrl = "http://localhost:3000/api/track";
    private _planUrl = "http://localhost:3000/api/trackPlan";
    private _addVehicle = "http://localhost:3000/api/addVehicle";
    private _removeVehicle = "http://localhost:3000/api/removeVehicle";
    private _selectedPlan = "http://localhost:3000/api/selectedTrackPlan";


    public trackDetails = {};
    setUserTrackInfo(data, data1) {
        this.trackDetails = data;
        this.trackDetails["selectedPlan"] = data1;
    }
    confirmTrackingDetails(): Observable<trackDetails> {
        return this.http.post<trackDetails>(this._trackUrl, this.trackDetails);
    }
    getTrackPlan(): Observable<trackPlan> {
        return this.http.get<trackPlan>(this._planUrl);
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
        console.log("value", value);
        return this.http.post<editVehicle>(this._addVehicle, value);
    }
    removeVehicle_Edit(data, id): Observable<editVehicle> {
        var value = {};
        value = data;
        value["searchId"] = id;
        return this.http.put<editVehicle>(this._removeVehicle, value);
    }
    getSelectedPlan(email): Observable<trackDetails> {
        return this.http.post<trackDetails>(this._selectedPlan, { email: email });
    }

}
