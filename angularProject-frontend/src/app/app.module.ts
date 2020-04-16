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
import { LeaseVehicleComponent } from "./_vehicleData/lease-vehicle/lease-vehicle.component";
import { SelfDriveComponent } from "./_vehicleData/self-drive/self-drive.component";
import { SelfDriveDetailsComponent } from "./_vehicleData/self-drive-details/self-drive-details.component";
import { SelfDriveInfoDialogComponent } from "./_vehicleData/self-drive-info-dialog/self-drive-info-dialog.component";
import { TrackVehicleComponent } from "./_vehicleData/track-vehicle/track-vehicle.component";
import { SigninAuthService } from "./_services_guard_interceptor/signin-auth.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptorService } from "./_services_guard_interceptor/token-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    AnimationBackgroundComponent,
    LoginPageComponent,
    NavbarComponent,
    UserOptionTabsComponent,
    VideosComponent,
    ChauffeurDriveComponent,
    LeaseVehicleComponent,
    SelfDriveComponent,
    SelfDriveDetailsComponent,
    SelfDriveInfoDialogComponent,
    TrackVehicleComponent,
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
export class AppModule {}
