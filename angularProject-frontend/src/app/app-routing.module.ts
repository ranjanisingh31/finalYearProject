import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { VideosComponent } from "./_dashboard/videos/videos.component";
import { SelfDriveDetailsComponent } from "./_vehicleData/self-drive-details/self-drive-details.component";
import { SigninGuardGuard } from "./_services_guard_interceptor/signin-guard.guard";
import { ChauffeurDriveDetailsComponent } from "./_vehicleData/chauffeur-drive-details/chauffeur-drive-details.component";
import { TrackVehicleComponent } from "./_vehicleData/track-vehicle/track-vehicle.component";
import { TrackSelectedPlanComponent } from "./_vehicleData/track-selected-plan/track-selected-plan.component";
import { AdminComponent } from './_admin/admin/admin.component';

const routes: Routes = [
  { path: "", component: VideosComponent },
  {
    path: "self-drive",
    component: SelfDriveDetailsComponent,
    canActivate: [SigninGuardGuard],
  },
  {
    path: "chauffeur-drive",
    component: ChauffeurDriveDetailsComponent,
    canActivate: [SigninGuardGuard],
  },
  {
    path: "track-vehicle",
    component: TrackVehicleComponent,
    canActivate: [SigninGuardGuard],
  },
  {
    path: "track-vehicle/track-selected-plan",
    component: TrackSelectedPlanComponent,
    canActivate: [SigninGuardGuard],
  },
  { path: "admin", component: AdminComponent },
  {
    path: "**", redirectTo: "/"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
