import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MudorComponent } from './mudor/mudor.component';
import { LavHillComponent } from './lav-hill/lav-hill.component';
import { ViewRequestComponent } from './view-request/view-request.component'
import { LoginComponent } from './login/login.component'
import { ProfileComponent } from './profile/profile.component'
import { LandingComponent } from './landing/landing.component'

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'Mudor', component: MudorComponent },
  { path: 'Lavender Hill', component: LavHillComponent },
  { path: 'ViewRequest', component: ViewRequestComponent },
  { path: 'login', component: LoginComponent },
  { path: 'Profile', component: ProfileComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
