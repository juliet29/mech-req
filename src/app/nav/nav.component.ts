import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/_services/user.service";
import { HostListener } from "@angular/core";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {
  private currentUser;
  private tokenExpiry;
  showNav: boolean = false;
  private intervalId: any;

  constructor(private _UserService: UserService) {}

  ngOnInit() {
    // get information about the user
    if (this._UserService.currentUserValue) {
      this.currentUser = this._UserService.currentUserValue;
    }
    // get information about the token
    this._UserService.currentToken.subscribe(
      data => {
        if (data) {
          this.tokenExpiry = new Date(data.token_expires);
          // log out if the token is expired
          // check about every minute
          this.intervalId = setInterval(() => {
            if (!this._UserService.tokenTimeRemaining(this.tokenExpiry)) {
              this._UserService.logout();
            }
          }, 1000 * 55);
        }
      },
      err => console.error(err)
    );

    // toggle the menu when anywhere that is not the menu is cliccked
  }

  // open the nav on button click
  toggle_nav() {
    this.showNav = true;
  }

  // close the nav when anywhere on the document is clicked
  @HostListener("document:click", ["$event"])
  onClick() {
    let target = event.target as HTMLElement;
    let classes = target.classList;
    if (classes.contains("nav-button") == false) {
      this.showNav = false;
    }
  }
}
