import { Injectable } from '@angular/core';
import io from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class SocketIoServiceService {

  constructor() {
    this.socket = io("https://happyway-backend.herokuapp.com");
    //this.socket = io("http://localhost:3000");
    this.socket.on('connect', function () {
      console.log('connected to server');
    });

    this.socket.on('disconnect', function () {
      console.log('disconnected to server');
    });
  }


  public socket;
  public location = [];
  public vName = [];
  public userId = [];
  public iconColor = [];



  // for (let j = 0; j < res[i].location.length; j++) {
  //     this.points(res[i].location[j].lng, res[i].location[j].lng, "red", this.count++);
  // }
  // }

}
