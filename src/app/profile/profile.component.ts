import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { RequestService } from 'src/app/_services/request.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private _UserService: UserService, private _RequestService: RequestService ) { }

  private author_id: number;
  public u_request: any;

  ngOnInit() {
    this.author_id = this._UserService.currentUserValue.id;
    if ( this.author_id) {
      this.getUserRequest()
    }

  }

  getUserRequest() {
    this._RequestService.list_user(this.author_id).subscribe(
      data => this.u_request = data,
      err => console.error(err)
    )
  }

  refreshToken() {
    this._UserService.refreshToken();
  }

  logout(){
    this._UserService.logout();
  }



}
