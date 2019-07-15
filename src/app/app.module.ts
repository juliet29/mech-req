import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MudorComponent } from './mudor/mudor.component';
import { LavHillComponent } from './lav-hill/lav-hill.component';
import { PlantSelectComponent } from './plant-select/plant-select.component';
import { ModalComponent } from './modal/modal.component';
import { ProblemFormComponent } from './problem-form/problem-form.component';
import { ViewRequestComponent } from './view-request/view-request.component';

import { RequestService } from 'src/app/services/request.service';
import { ModalService } from './services/modal.service';
import { RequestParentComponent } from './request-parent/request-parent.component';
import { PlantIdService } from 'src/app/services/plant-id.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MudorComponent,
    LavHillComponent,
    PlantSelectComponent,
    ModalComponent,
    ProblemFormComponent,
    ViewRequestComponent,
    RequestParentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [RequestService,
    ModalService,
    PlantIdService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
