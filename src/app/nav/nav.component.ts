import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { UserData } from '../_models/userData'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  private currentUser;
  private token_date;


  constructor(private _UserService: UserService) { }
  
  ngOnInit() {
    if (this._UserService.currentUserValue) {
      this.currentUser = this._UserService.currentUserValue;
      console.log(this.currentUser);
    }

    console.log(this._UserService.currentTokenValue);

    this._UserService.currentToken.subscribe(
      data => {
        if (data) {
          this.token_date = data.token_expires;
        }
        
        },
      err => console.error(err),
    )
    
  }

  
  
}
