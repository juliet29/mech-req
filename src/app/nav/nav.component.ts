import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  private token_present: boolean=false;

  constructor(private _UserService: UserService) { }

  ngOnInit() {
    if (this._UserService.currentUserValue) {
      this.token_present = true;
      console.log(this.token_present);
    } 
  }
  
}
