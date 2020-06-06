import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModuleModule } from "./material-module/material-module.module";
import { AnimationBackgroundComponent } from "./_dashboard/animation-background/animation-background.component";
import { LoginPageComponent } from "./_dashboard/login-page/login-page.component";
import { NavbarComponent } from "./_dashboard/navbar/navbar.component";
import { UserOptionTabsComponent } from "./_dashboard/user-option-tabs/user-option-tabs.component";
import { VideosComponent } from "./_dashboard/videos/videos.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ChauffeurDriveComponent } from "./_vehicleData/chauffeur-drive/chauffeur-drive.component";
import { SelfDriveComponent } from "./_vehicleData/self-drive/self-drive.component";
import { SelfDriveDetailsComponent } from "./_vehicleData/self-drive-details/self-drive-details.component";
import { SelfDriveInfoDialogComponent } from "./_vehicleData/self-drive-info-dialog/self-drive-info-dialog.component";
import { TrackVehicleComponent } from "./_vehicleData/track-vehicle/track-vehicle.component";
import { SigninAuthService } from "./_services_guard_interceptor/signin-auth.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptorService } from "./_services_guard_interceptor/token-interceptor.service";
import { ChauffeurDriveDetailsComponent } from './_vehicleData/chauffeur-drive-details/chauffeur-drive-details.component';
import { SelfDriveConfirmDialogComponent } from './_vehicleData/self-drive-confirm-dialog/self-drive-confirm-dialog.component';
import { ChauffeurDriveConfirmDialogComponent } from './_vehicleData/chauffeur-drive-confirm-dialog/chauffeur-drive-confirm-dialog.component';
import { ChauffeurDriveInfoDialogComponent } from './_vehicleData/chauffeur-drive-info-dialog/chauffeur-drive-info-dialog.component';
import { TrackVehicleBookingDialogComponent } from './_vehicleData/track-vehicle-booking-dialog/track-vehicle-booking-dialog.component';
import { TrackSelectedPlanComponent } from './_vehicleData/track-selected-plan/track-selected-plan.component';
import { TrackEditVehicleInfoDialogComponent } from './_vehicleData/track-edit-vehicle-info-dialog/track-edit-vehicle-info-dialog.component';
import { AdminComponent } from './_admin/admin/admin.component';
import { AdminSelectedVehicleDialogComponent } from './_admin/admin-selected-vehicle-dialog/admin-selected-vehicle-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AnimationBackgroundComponent,
    LoginPageComponent,
    NavbarComponent,
    UserOptionTabsComponent,
    VideosComponent,
    ChauffeurDriveComponent,
    SelfDriveComponent,
    SelfDriveDetailsComponent,
    SelfDriveInfoDialogComponent,
    TrackVehicleComponent,
    ChauffeurDriveDetailsComponent,
    SelfDriveConfirmDialogComponent,
    ChauffeurDriveConfirmDialogComponent,
    ChauffeurDriveInfoDialogComponent,
    TrackVehicleBookingDialogComponent,
    TrackSelectedPlanComponent,
    TrackEditVehicleInfoDialogComponent,
    AdminComponent,
    AdminSelectedVehicleDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModuleModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    SigninAuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
