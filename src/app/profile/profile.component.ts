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

  ngOnInit() {
    this.author_id = this._UserService.currentUserValue.id;
    if (this.author_id) {
      this.getUserRequest();
    }
  }

  getUserRequest() {
    this._RequestService.list_user(this.author_id).subscribe(
      data => {
        this.user_request = data as requestData[];

        this.user_request.forEach(req => {
          req.time_sent = this._RequestService.formatTime(req.time_sent);
          req.status = this._RequestService.formatStatus(req.status);
        });
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
