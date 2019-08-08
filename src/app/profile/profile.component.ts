import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { UserService } from "src/app/_services/user.service";
import { RequestService } from "src/app/_services/request.service";
import { requestData } from "src/app/_models/requestData";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  constructor(
    private _UserService: UserService,
    private _RequestService: RequestService
  ) {}

  private author_id: number;
  public user_request: any;
  public loginTimeRemaining: any;

  ngOnInit() {
    // make sure that the user is logged in before getting their requests
    this.author_id = this._UserService.currentUserValue.id;
    if (this.author_id) {
      this.getUserRequest();
    }

    // check expiry of token
    let token_exp = new Date(this._UserService.currentTokenValue.token_expires);
    console.log(token_exp);
    this.loginTimeRemaining = this._UserService.tokenTimeRemaining(token_exp);
  }

  getUserRequest() {
    this._RequestService.list_user(this.author_id).subscribe(
      data => {
        this.user_request = data as requestData[];
      },
      err => console.error(err)
    );
  }

  refreshToken() {
    this._UserService.refreshToken();
  }

  logout() {
    this._UserService.logout();
  }
}
