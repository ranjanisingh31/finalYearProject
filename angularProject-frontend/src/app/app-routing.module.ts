import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { VideosComponent } from "./_dashboard/videos/videos.component";
import { LoginPageComponent } from "./_dashboard/login-page/login-page.component";
import { SelfDriveDetailsComponent } from "./_vehicleData/self-drive-details/self-drive-details.component";
import { SigninGuardGuard } from "./_services_guard_interceptor/signin-guard.guard";
import { ChauffeurDriveDetailsComponent } from "./_vehicleData/chauffeur-drive-details/chauffeur-drive-details.component";
import { ThankYouPageComponent } from "./_dashboard/thank-you-page/thank-you-page.component";

const routes: Routes = [
  { path: "", component: VideosComponent },
  { path: "login", component: LoginPageComponent },
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
    path: "ThankYou-Page",
    component: ThankYouPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
