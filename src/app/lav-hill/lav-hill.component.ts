import { Component, OnInit } from "@angular/core";
import { PLANTS } from "../_models/plantInfo";
import { PlantIdService } from "src/app/_services/plant-id.service";

@Component({
  selector: "app-lav-hill",
  templateUrl: "./lav-hill.component.html",
  styleUrls: ["./lav-hill.component.scss"]
})
export class LavHillComponent implements OnInit {
  constructor(public _PlantIdService: PlantIdService) {}

  ngOnInit() {
    this._PlantIdService.updatePlantID(this.currentPlantName);
  }

  PLANTS = PLANTS;

  currentPlantName = PLANTS[1].name;
  currentLocations = PLANTS[1].locations;
}
