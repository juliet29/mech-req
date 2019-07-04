import { Component, OnInit, Input } from '@angular/core';
import { PLANTS } from '../plantInfo';

var currentPlant =  '';
export default currentPlant;

@Component({
  selector: 'app-mudor',
  templateUrl: './mudor.component.html',
  styleUrls: ['./mudor.component.scss']
})


export class MudorComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  PLANTS = PLANTS;

  currentPlantName = PLANTS[0].name;
  currentLocations = PLANTS[0].locations;


}
