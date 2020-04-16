import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { VideosComponent } from "./_dashboard/videos/videos.component";
import { LoginPageComponent } from "./_dashboard/login-page/login-page.component";
import { SelfDriveDetailsComponent } from "./_vehicleData/self-drive-details/self-drive-details.component";
import { SigninGuardGuard } from "./_services_guard_interceptor/signin-guard.guard";

const routes: Routes = [
  { path: "", component: VideosComponent },
  { path: "login", component: LoginPageComponent },
  {
    path: "self-drive",
    component: SelfDriveDetailsComponent,
    canActivate: [SigninGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
