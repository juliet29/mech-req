import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { UserService } from "src/app/_services/user.service";
import { RequestService } from "src/app/_services/request.service";

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
  // @ViewChild("toDisplay", { static: true }) toDisplay: ElementRef;

  // ngAfterViewInit() {
  //   console.log(this.toDisplay);
  // }

  ngOnInit() {
    this.author_id = this._UserService.currentUserValue.id;
    if (this.author_id) {
      this.getUserRequest();
    }
  }

  getUserRequest() {
    this._RequestService
      .list_user(this.author_id)
      .subscribe(data => (this.user_request = data), err => console.error(err));
  }

  refreshToken() {
    this._UserService.refreshToken();
  }

  logout() {
    this._UserService.logout();
  }

  dropdown() {
    let target = event.target as HTMLElement;
    let target_id = Number(target.id);

    // the specific dropdown that is being shown
    let displayElement = document.getElementsByClassName("display-sometimes")[
      target_id
    ] as HTMLElement;

    // logi for showing and hiding dropdown
    if (displayElement.classList.contains("show")) {
      displayElement.classList.remove("show");
    } else {
      displayElement.classList.add("show");
    }
  }
}
