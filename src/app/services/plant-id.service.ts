import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantIdService {

  constructor() { }

  private PlantID = new Subject<any>();
  private LocationID = new Subject<any>();

  // get info
  getPlantID(): Observable<any> {
    return this.PlantID.asObservable();
  }

  getLocationID(): Observable<any> {
    return this.LocationID.asObservable();
  }

  // update info
  updatePlantID(id: string){
    this.PlantID.next(id);
  }

  updateLocationID(id: string){
    this.LocationID.next(id);
  }




}
