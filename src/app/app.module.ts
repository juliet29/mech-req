import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MudorComponent } from './mudor/mudor.component';
import { LavHillComponent } from './lav-hill/lav-hill.component';
import { PlantSelectComponent } from './plant-select/plant-select.component';
import { ModalComponent } from './modal/modal.component';
import { ProblemFormComponent } from './problem-form/problem-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MudorComponent,
    LavHillComponent,
    PlantSelectComponent,
    ModalComponent,
    ProblemFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
