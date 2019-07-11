import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MudorComponent } from './mudor/mudor.component';
import { LavHillComponent } from './lav-hill/lav-hill.component';
import { ViewRequestComponent } from './view-request/view-request.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Mudor', component: MudorComponent },
  { path: 'Lavender Hill', component: LavHillComponent },
  { path: 'ViewRequest', component: ViewRequestComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
