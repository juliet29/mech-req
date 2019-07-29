import { Component, OnInit, Query } from "@angular/core";
import { RequestService } from "src/app/_services/request.service";
import { Router } from "@angular/router";
import { requestData } from "src/app/_models/requestData";
import { ConstantPool } from "@angular/compiler";

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

const sections = [
  "AUTHOR",
  "PLANT",
  "LOCATION",
  "DATE",
  "STATUS",
  "DEPARTMENT"
];

@Component({
  selector: "app-profile-admin",
  templateUrl: "./profile-admin.component.html",
  styleUrls: ["./profile-admin.component.scss"]
})
export class ProfileAdminComponent implements OnInit {
  // array of all the ServiceRequest objects from the API
  public requests;
  private sections: string[] = sections;
  private sectionSelected: boolean = false;
  private sectionName: string = "Section";

  constructor(
    private _RequestService: RequestService,
    private _Router: Router
  ) {}

  ngOnInit() {
    this.getRequests();
  }

  // get the requests from the API -- this should all be in the service tbh
  getRequests() {
    console.log("getRequest");
    this._RequestService.list().subscribe(
      data => {
        this.requests = data as requestData;
        //let author: any;
        //this.query("author");
      },
      err => console.error(err),
      () => {
        console.log("done loading posts");
      }
    );
  }

  // mark requests as complete
  completeRequest(id) {
    console.log(id);
    let my_request: any;

    // get value of request to mark as complete
    this._RequestService.list_request(id).subscribe(
      data => {
        my_request = data[0];
        my_request.status = 1;
        console.log(my_request);
        // replace this request
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

  // handle filtering!
  dropdown(my_class: string) {
    // the specific dropdown that is being shown
    let displayElement = document.getElementsByClassName(
      my_class
    )[0] as HTMLElement;
    console.log(displayElement.classList);

    // for showing and hiding dropdown
    if (displayElement.classList.contains("show")) {
      displayElement.classList.remove("show");
    } else {
      displayElement.classList.add("show");
    }
  }

  query(selector) {
    console.log(selector);
    let optionsArray: any[] = [];
    this.requests.forEach(function(current_req) {
      let possibleOption = current_req[selector];
      if (!optionsArray.includes(possibleOption)) {
        optionsArray.push(possibleOption);
      }
    });
    console.log(optionsArray);
    return optionsArray;
  }

  dropdownSection() {
    this.dropdown("action-bar-display-sometimes");
  }

  possibleQuerries: any[];
  dropdownQuery() {
    console.log("query drop");
    this.dropdown("action-bar-display-sometimes-query");
    let my_query = this.sectionName.toLowerCase();
    this.possibleQuerries = this.query(my_query);
    console.log(this.possibleQuerries);
  }

  // need to make this smoother
  filterSection() {
    // change the name in the "input" box
    let option: any = event.target as HTMLElement;
    let optionText: string = option.innerText;
    if (optionText) {
      this.sectionName = optionText;

      //hide the options
      this.dropdownSection();

      // show dropdown of queries
      this.sectionSelected = true;
      this.dropdownQuery();
    }
  }
}
