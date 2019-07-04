import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-plant-select',
  templateUrl: './plant-select.component.html',
  styleUrls: ['./plant-select.component.scss']
})
export class PlantSelectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  @Input() plantName: string;
  @Input() locations: any;

  clickMessage = '';

  onClickMe() {
    this.clickMessage = "What's the problem?";
  }
  
  



}
