import { Component, OnInit } from '@angular/core';

import { plants } from '../plants';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  

  constructor() { }

  ngOnInit() {
  }

  plants = plants;

}
