import { Component, OnInit } from "@angular/core";
import { ScrollDispatcher } from "@angular/cdk/scrolling";

@Component({
  selector: "app-videos",
  templateUrl: "./videos.component.html",
  styleUrls: ["./videos.component.css"],
})
export class VideosComponent implements OnInit {
  constructor(private scrollDispatcher: ScrollDispatcher) {}
  public videos = [
    {
      name: "assets/video/cars1.mp4",
      cols: "2",
      rows: "1",
    },

    {
      name: "assets/video/cars9.mp4",
      cols: "2",
      rows: "1",
    },
    {
      name: "assets/video/cars8.mp4",
      cols: "1",
      rows: "1",
    },
    {
      name: "assets/video/cars12.mp4",
      cols: "2",
      rows: "2",
    },
    {
      name: "assets/video/cars16.mp4",
      cols: "1",
      rows: "1",
    },
    {
      name: "assets/video/cars4.webm",
      cols: "2",
      rows: "1",
    },
    {
      name: "assets/video/cars7.mp4",
      cols: "2",
      rows: "1",
    },
    {
      name: "assets/video/cars11.mp4",
      cols: "2",
      rows: "1",
    },
    {
      name: "assets/video/cars14.mp4",
      cols: "2",
      rows: "1",
    },
    {
      name: "assets/video/cars6.webm",
      cols: "2",
      rows: "1",
    },
    {
      name: "assets/video/cars13.mp4",
      cols: "1",
      rows: "1",
    },
    {
      name: "assets/video/cars5.webm",
      cols: "1",
      rows: "1",
    },
    {
      name: "assets/video/cars2.mp4",
      cols: "2",
      rows: "1",
    },
    {
      name: "assets/video/cars15.webm",
      cols: "2",
      rows: "1",
    },
    {
      name: "assets/video/cars10.mp4",
      cols: "2",
      rows: "1",
    },
  ];

  ngOnInit(): void {
    var head = document.getElementById("header");
    this.scrollDispatcher.scrolled().subscribe((x) => {
      if (
        document.body.scrollTop > 400 ||
        document.documentElement.scrollTop > 400
      ) {
        head.style.fontSize = "70px";
        head.style.textAlign = "left";
        head.style.zIndex = "1";
        head.style.width = "500px";
        head.style.margin = "0px";
        head.style.top = "0px";
      } else {
        head.style.fontSize = "100px";
        head.style.textAlign = "center";
        head.style.zIndex = "0";
        head.style.width = "100%";
        head.style.margin = "50px auto";
        head.style.top = "100px";
      }
    });
  }
}
