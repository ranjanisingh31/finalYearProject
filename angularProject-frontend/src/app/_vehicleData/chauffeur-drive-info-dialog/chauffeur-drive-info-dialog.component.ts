import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-chauffeur-drive-info-dialog",
  templateUrl: "./chauffeur-drive-info-dialog.component.html",
  styleUrls: ["./chauffeur-drive-info-dialog.component.css"],
})
export class ChauffeurDriveInfoDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}
}
