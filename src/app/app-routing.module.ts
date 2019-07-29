import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "src/app/_auth/auth.guard";

import { HomeComponent } from "./home/home.component";
import { MudorComponent } from "./mudor/mudor.component";
import { LavHillComponent } from "./lav-hill/lav-hill.component";
import { ProfileAdminComponent } from "./profile-admin/profile-admin.component";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { LandingComponent } from "./landing/landing.component";

const routes: Routes = [
  { path: "", component: LandingComponent },
  { path: "login", component: LoginComponent },
  { path: "Profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "Home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "Mudor", component: MudorComponent, canActivate: [AuthGuard] },
  {
    path: "Lavender Hill",
    component: LavHillComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "ProfileAdmin",
    component: ProfileAdminComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
