import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
// components
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { MudorComponent } from "./mudor/mudor.component";
import { LavHillComponent } from "./lav-hill/lav-hill.component";
import { PlantSelectComponent } from "./plant-select/plant-select.component";
import { ModalComponent } from "./modal/modal.component";
import { ProblemFormComponent } from "./problem-form/problem-form.component";
import { ProfileAdminComponent } from "./profile-admin/profile-admin.component";
import { LoginComponent } from "./login/login.component";
import { NavComponent } from "./nav/nav.component";
// services
import { RequestService } from "src/app/_services/request.service";
import { ModalService } from "./_services/modal.service";
import { PlantIdService } from "src/app/_services/plant-id.service";
import { UserService } from "src/app/_services/user.service";
import { ProfileComponent } from "./profile/profile.component";
import { LandingComponent } from "./landing/landing.component";
import { ShowRequestsComponent } from "./show-requests/show-requests.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MudorComponent,
    LavHillComponent,
    PlantSelectComponent,
    ModalComponent,
    ProblemFormComponent,
    ProfileAdminComponent,
    LoginComponent,
    NavComponent,
    ProfileComponent,
    LandingComponent,
    ShowRequestsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [RequestService, ModalService, PlantIdService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
