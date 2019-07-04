import { Component, OnInit } from '@angular/core';
import { PLANTS } from '../plantInfo';

@Component({
  selector: 'app-lav-hill',
  templateUrl: './lav-hill.component.html',
  styleUrls: ['./lav-hill.component.scss']
})
export class LavHillComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  PLANTS = PLANTS;

  currentPlantName = PLANTS[1].name;
  currentLocations = PLANTS[1].locations;
}
