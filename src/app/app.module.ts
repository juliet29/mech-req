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

import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { RequestService } from 'src/app/services/request.service';
import { ModalService } from './services/modal.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MudorComponent,
    LavHillComponent,
    PlantSelectComponent,
    ModalComponent,
    ProblemFormComponent,
    ViewRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [EventEmitterService,
    RequestService,
    ModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
