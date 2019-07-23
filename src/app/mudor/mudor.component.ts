import { Component, OnInit, Input } from '@angular/core';
import { PLANTS } from '../_models/plantInfo';
import { PlantIdService } from 'src/app/_services/plant-id.service';

var currentPlant =  '';
export default currentPlant;

@Component({
  selector: 'app-mudor',
  templateUrl: './mudor.component.html',
  styleUrls: ['./mudor.component.scss']
})


export class MudorComponent implements OnInit {
  constructor(private _PlantIdService: PlantIdService) { }

  ngOnInit() {
    this._PlantIdService.updatePlantID(this.currentPlantName)
  }

  PLANTS = PLANTS;

  currentPlantName = PLANTS[0].name;
  currentLocations = PLANTS[0].locations;


}
