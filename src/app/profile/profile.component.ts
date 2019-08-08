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
  public tokenExpiry: any;
  private intervalId: any;

  ngOnInit() {
    // make sure that the user is logged in before getting their requests
    this.author_id = this._UserService.currentUserValue.id;
    if (this.author_id) {
      this.getUserRequest();
    }

    this._UserService.currentToken.subscribe(
      data => {
        if (data) {
          // get the date of token expiry
          this.tokenExpiry = new Date(data.token_expires);
          console.log(this.tokenExpiry);

          // check expiry of token once, and then at at time interval
          this.checkLogin(this.tokenExpiry);
          let checkLoginTime = 1000 * 55;
          this.intervalId = setInterval(
            () => this.checkLogin(this.tokenExpiry),
            checkLoginTime
          );
        }
      },
      err => console.error(err)
    );
  }

  checkLogin(tokenExpiry) {
    // get data about when the token will expire
    this.loginTimeRemaining = this._UserService.tokenTimeRemaining(tokenExpiry);
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
    // update the log in time remaining
    this.tokenExpiry = new Date(
      this._UserService.currentTokenValue.token_expires
    );
    this.checkLogin(this.tokenExpiry);
  }

  logout() {
    this._UserService.logout();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
