import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private _UserService: UserService) { }

  ngOnInit() {
  }

  refreshToken() {
    this._UserService.refreshToken();
  }

  logout(){
    this._UserService.logout();
  }

}
