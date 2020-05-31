import { Component, OnInit, HostListener } from '@angular/core';
import { environment } from "src/environments/environment";
import { FormControl } from "@angular/forms";
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from "@angular/material/dialog";
import { TrackEditVehicleInfoDialogComponent } from '../track-edit-vehicle-info-dialog/track-edit-vehicle-info-dialog.component';
import { TrackVehicleService } from 'src/app/_services_guard_interceptor/track-vehicle.service';
import { SigninAuthService } from 'src/app/_services_guard_interceptor/signin-auth.service';
import { Router } from "@angular/router";
import * as mapboxgl from 'mapbox-gl';
import RulerControl from 'mapbox-gl-controls/lib/ruler';
import CompassControl from 'mapbox-gl-controls/lib/compass';
import ZoomControl from 'mapbox-gl-controls/lib/zoom';
import { SocketIoServiceService } from 'src/app/_services_guard_interceptor/socket-io-service.service';
import * as MapboxTraffic from '@mapbox/mapbox-gl-traffic';



@Component({ selector: 'app-track-selected-plan', templateUrl: './track-selected-plan.component.html', styleUrls: ['./track-selected-plan.component.css'] })
export class TrackSelectedPlanComponent implements OnInit {

    constructor(private dialog: MatDialog, private _trackService: TrackVehicleService, private _signinService: SigninAuthService, private router: Router, private _socketService: SocketIoServiceService) {
        mapboxgl.accessToken = environment.mapboxKey;
    }

    myControl = new FormControl();
    filteredOptions: Observable<string[]>;
    public options = [];
    edit(item) {
        const dialogBox = this.dialog.open(TrackEditVehicleInfoDialogComponent, {
            width: "400px",
            height: "510px",
            data: {
                vehicleName: item,
                edit: true
            }
        }
        );
        dialogBox.afterClosed().subscribe(() => {
            this.updateList();
        });


    }
    add() {
        const dialogBox = this.dialog.open(TrackEditVehicleInfoDialogComponent, {
            width: "400px",
            height: "510px",
            data: { edit: false }
        });
        dialogBox.afterClosed().subscribe(() => {
            this.updateList();
        });
    }

    // filter
    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(option =>
            option.vName.toLowerCase().includes(filterValue));
    }

    public interval;
    public status = false;
    public activeList;

    updateStatus(status) {
        let value = this.activeList;
        value["state"] = status;
        value["searchId"] = this._trackService.clientInfo["data"]._id;
        this._socketService.socket.emit("updateStatusOfVehicles", value);
        this.updateList();
    }


    currentLocation() {

        this.interval = setInterval(() => {
            this.map.on('locationfound', (e) => {
                this.lng = e.latlng.lng;
                this.lat = e.latlng.lat;
                console.log("map", this.lng, this.lat);
            });
            navigator.geolocation.getCurrentPosition((position) => {
                // this.lng = position.coords.longitude;
                // this.lat = position.coords.latitude;
                var coords = {};
                coords = this.activeList;
                coords["location"] = { "lng": this.lng, "lat": this.lat };
                console.log("coords", coords);
                this._socketService.socket.emit("coordinates", coords);
                this._socketService.socket.emit("location", this.activeList.searchId);
                console.log("lng", position.coords.longitude, "lat", position.coords.latitude);

            });


        }, 3000);

    }

    start() {
        console.log(this.activeList);
        if (this.activeList === undefined || this.activeList == '') {
            alert("Select a vehicle to start tracking!!!");
        }
        else {
            this.status = !this.status;
            if (this.status === true) {

                this.updateStatus("moving");
                this.currentLocation();
                this.points();
            }
            else {
                this.updateStatus("stopped");
                clearInterval(this.interval);

                // for (let i = 0; i < this.count; i++) {
                //     console.log(this.count, i);
                //     this.mark.remove();
                // }
                this._socketService.socket.emit("vehiclesLocationRemove", this.activeList);
            }

        }
    }

    @HostListener('window:beforeunload')
    doSomething() {
        this.updateStatus("offline");
        clearInterval(this.interval);
    }

    updateList() {
        this._socketService.socket.emit("updateSelectedPlan", this._signinService.getVerifiedEmail());

    }

    t() {
        this.map.flyTo({
            center: [-122.019807,
                45.632433],
            zoom: 20
        });
        this.mark = new mapboxgl.Marker().setLngLat([-122.019807,
            45.632433]).addTo(this.map);
        this.points();
    }
    // settings style
    public styles = [
        {
            name: "streets",
            type: "streets-v11"
        },
        {
            name: "light",
            type: "light-v10"
        },
        {
            name: "dark",
            type: "dark-v10"
        },
        {
            name: "outdoors",
            type: "outdoors-v11"
        }, {
            name: "satellite",
            type: "satellite-v9"
        }
    ];

    changeStyle(change) {
        this.map.setStyle('mapbox://styles/mapbox/' + change.value);
    }

    // map
    map = mapboxgl.Map;
    style = "mapbox://styles/mapbox/streets-v11";
    lat = 77.6274434;
    lng = 13.1307466;
    message = "hello!!!";
    source: any;
    markers: any;
    currentMarker: any;
    mark: mapboxgl.Marker;
    initializeMap() {
        this.buildMap();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
                this.map.flyTo({
                    center: [this.lng, this.lat]
                });
            })
        }

    }
    buildMap() {
        this.map = new mapboxgl.Map({
            container: "_map",
            style: this.style,
            center: [
                this.lng, this.lat
            ],
            zoom: 5
        });
    }

    points() {
        var data = {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": []
                },
                "properties": {
                    "modelId": 1,
                },
            }]
        };
        // var coordinates = data.features[0].geometry.coordinates;
        // data.features[0].geometry.coordinates = [coordinates[0]];
        this.map.addSource('trace', { type: 'geojson', data: data });
        this.map.addLayer({
            "id": "line",
            "source": "trace",
            "type": "line",
            "paint": {
                'line-color': "yellow",
                'line-opacity': 0.5,
                'line-width': 5
            },
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            "filter": ["==", "modelId", 1],
        });

        this.map.jumpTo({ 'center': [this.lng, this.lat], 'zoom': 20 });
        this.map.setPitch(30);

        var currentMarkers = [];
        var location = [];
        var vName = [];
        var userId = [];
        var iconColor = [];
        this._socketService.socket.on("vehiclesLocation", (res) => {
            location = [];
            vName = [];
            userId = [];
            iconColor = [];
            for (let i = 0; i < res.length; i++) {
                location.push([res[i].location[res[i].location.length - 1].lng, res[i].location[res[i].location.length - 1].lat]);
                vName.push(res[i].vName);
                userId.push(res[i].userId);
                iconColor.push(res[i].iconColor);
                console.log("vl", res, res[i].location[res[i].location.length - 1].lng, res[i].location[res[i].location.length - 1].lat);
                console.log(location, vName, userId, iconColor);
            }

            for (let i = 0; i < location.length; i++) {

                if (location[i] === undefined) {
                    data.features[0].geometry.coordinates.push(
                        [this.lng, this.lat]
                    );
                } else {
                    data.features[0].geometry.coordinates.push(location[i]);

                }
                this.map.getSource('trace').setData(data);
                this.map.setPaintProperty('line', 'line-color', iconColor[i]);
                this.map.panTo(location[i]);
                this.mark = new mapboxgl.Marker().setLngLat(location[i]).setPopup(new mapboxgl.Popup({ offset: 25 })
                    .setHTML('<h3 style="margin:0px;">' + "Vehicle Name: " + vName[i] + "<br/>" + "User Id: " + userId[i] + '</h3>' + '<p style="margin:0px;">' + "[" + location[i] + "]" + '</p>')).addTo(this.map);
                currentMarkers.push(this.mark);
                console.log("loc", location[i], data.features[0].geometry.coordinates);

            }
            if (currentMarkers !== null) {
                for (let i = 0; i < currentMarkers.length - 2; i++) {
                    currentMarkers[i].remove();
                }
            }



        });


    }

    ngOnInit(): void {

        //socketIo
        this._socketService.socket.on("response", (res) => {
            this._trackService.setUserAndTrackInfoAfterVerification(res, res.selectedPlan, res.addVehicle);
            console.log("Plan exists...", "res", res);
            this.options = [];
            for (var i = 0; i < this._trackService.editVehicle.length; i++) {
                this.options.push({ 'vName': this._trackService.editVehicle[i]["vehicleName"], 'state': this._trackService.editVehicle[i][this._trackService.editVehicle[i]["state"]], 'userId': this._trackService.editVehicle[i]["userId"], 'iconColor': this._trackService.editVehicle[i]["iconColor"] });
                console.log("state", this._trackService.editVehicle[i][this._trackService.editVehicle[i]["state"]]);
            }
            console.log("opt", this.options);
        });

        this._socketService.socket.on("result", (res) => {
            console.log(res);
        });

        this._socketService.socket.on("updateStatusOfVehicles", (res) => {
            console.log(res);
        });

        // user data plans
        this.updateList();

        // filter search box
        this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''), map(value => this._filter(value)));
        // map
        if (!mapboxgl.supported()) {
            alert("Browser Does not support mapbox!!!");
        } else {
            this.initializeMap();
        }

        // compass control
        this.map.addControl(new CompassControl(), 'top-right');

        // zoom control
        this.map.addControl(new ZoomControl(), 'top-right');

        // ruler control
        this.map.addControl(new RulerControl(), 'top-right');
        this.map.on('ruler.on', () => console.log('ruler: on'));
        this.map.on('ruler.off', () => console.log('ruler: off'));



        //traffic 
        this.map.on('load', () => {
            this.map.addControl(new MapboxTraffic());
        });



    }
}

