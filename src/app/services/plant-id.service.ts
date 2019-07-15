import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantIdService {

  constructor() { }

  private PlantID = new Subject<any>();

  getPlantID(): Observable<any> {
    return this.PlantID.asObservable();
  }

  updatePlantID(id: string){
    this.PlantID.next(id);
  }

  


}
