import { Component, OnInit, Query } from "@angular/core";
import { RequestService } from "src/app/_services/request.service";
import { Router } from "@angular/router";

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC"
];

@Component({
  selector: "app-view-request",
  templateUrl: "./view-request.component.html",
  styleUrls: ["./view-request.component.scss"]
})
export class ViewRequestComponent implements OnInit {
  // array of all the ServiceRequest objects from the API
  public request;

  constructor(
    private _RequestService: RequestService,
    private _Router: Router
  ) {}

  ngOnInit() {
    this.getRequest();
  }

  // get the requests from the API
  getRequest() {
    console.log("getRequest");
    this._RequestService.list().subscribe(
      // on success, convert data into a nice format to display
      data => {
        this.request = data;
        for (let a_request of this.request) {
          let s_date = new Date(a_request.time_sent);
          a_request.date_sent =
            s_date.getDate() +
            "-" +
            months[s_date.getMonth()] +
            "-" +
            s_date.getFullYear();
          var minutes: any = s_date.getMinutes();
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          a_request.time_sent = s_date.getHours() + ":" + minutes;
        }
      },

      // on failure, log error
      err => console.error(err),

      // on completion, log completion
      () => {
        console.log("done loading posts");
        console.log(this.request);
      }
    );
  }

  // mark requests as complete
  completeRequest(id) {
    console.log(id);
    let my_request: any;

    // get value of request to mark as compleye
    this._RequestService.list_request(id).subscribe(
      data => {
        my_request = data[0];
        my_request.status = 1;
        console.log(my_request);
        // replace this reques
        this.edit(id, my_request);
      },
      error => {
        console.log("Error", error);
      }
    );
  }

  edit(id, my_request) {
    this._RequestService.edit(id, my_request).subscribe(data => {
      this._Router.navigate(["/ViewRequest"]);
    });
  }

  dropdown() {
    // the specific dropdown that is being shown
    let displayElement = document.getElementsByClassName(
      "action-bar-display-sometimes"
    )[0] as HTMLElement;
    console.log(displayElement);

    // for showing and hiding dropdown
    if (displayElement.classList.contains("show")) {
      displayElement.classList.remove("show");
    } else {
      displayElement.classList.add("show");
    }
  }

  dropdownQuery() {
    console.log("query drop");
  }
}
