import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SelfDriveService } from "src/app/_services_guard_interceptor/self-drive.service";

@Component({
  selector: "app-self-drive-info-dialog",
  templateUrl: "./self-drive-info-dialog.component.html",
  styleUrls: ["./self-drive-info-dialog.component.css"],
})
export class SelfDriveInfoDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit(): void {}
}
