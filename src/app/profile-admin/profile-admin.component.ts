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
  //"PLANT",
  "LOCATION",
  "DATE",
  "STATUS"
  //"DEPARTMENT"
];

@Component({
  selector: "app-profile-admin",
  templateUrl: "./profile-admin.component.html",
  styleUrls: ["./profile-admin.component.scss"]
})
export class ProfileAdminComponent implements OnInit {
  // array of all the ServiceRequest objects from the API
  public requests;
  public admin: boolean = true;
  private validCheckboxes: any[] = [];
  private sections: string[] = sections;
  private sectionSelected: boolean = false;
  private sectionName: string = "Section";
  private queryName: string = "Query";
  private possibleQuerries: any[];

  constructor(
    private _RequestService: RequestService,
    private _Router: Router
  ) {}

  ngOnInit() {
    this.getRequests();
  }

  // ------ get requests from the api -------------------------
  // -----------------------------------------------------------
  getRequests() {
    console.log("getRequest");
    this._RequestService.list().subscribe(
      data => {
        this.requests = data as requestData;
      },
      err => console.error(err),
      () => {
        console.log("done loading posts");
      }
    );
  }

  // ----- mark requests as complete, pending, or ongoing ----------
  // ---------------------------------------------------------------

  processCheckboxes(checkboxInfo: any) {
    console.log(checkboxInfo);
    // add id to list of valid checkboxes when checkbox checked
    if (checkboxInfo.valid == true) {
      this.validCheckboxes.push(checkboxInfo.id);
    }

    // remove id from list of valid checkboxes when the checkbox is unchecked
    if (checkboxInfo.valid == false) {
      for (let i = 0; i < this.validCheckboxes.length; i++) {
        if (this.validCheckboxes[i] == checkboxInfo.id) {
          this.validCheckboxes.splice(i, 1);
        }
      }
    }

    console.log(this.validCheckboxes);
  }

  completeRequest(id) {
    console.log(id);
    let my_request: any;

    // get value of request to mark as complete
    this._RequestService.list_request(id).subscribe(
      data => {
        my_request = data[0];
        my_request.status = 1;
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

  // --------- handle filtering ------------------------
  // ----------------------------------------------------
  dropdown(my_class: string) {
    // the specific dropdown that is being shown
    let displayElement = document.getElementsByClassName(
      my_class
    )[0] as HTMLElement;

    // for showing and hiding dropdown
    if (displayElement.classList.contains("show")) {
      displayElement.classList.remove("show");
    } else {
      displayElement.classList.add("show");
    }
  }

  // get possible list of queries to filter by
  query(selector) {
    let optionsArray: any[] = [];
    this.requests.forEach(function(current_req) {
      let possibleOption = current_req[selector];
      if (!optionsArray.includes(possibleOption)) {
        optionsArray.push(possibleOption);
      }
    });
    return optionsArray;
  }

  dropdownSection() {
    this.dropdown("action-bar-display-sometimes");
  }

  dropdownQuery() {
    this.dropdown("action-bar-display-sometimes-query");
    let my_query = this.sectionName.toLowerCase();
    this.possibleQuerries = this.query(my_query);
  }

  // need to make this smoother
  filterSection() {
    // change the name in the "input" box
    let option: any = event.target as HTMLElement;
    let optionText: string = option.innerText;
    if (optionText) {
      this.sectionName = optionText;
      console.log(this.sectionName);

      //hide the options
      this.dropdownSection();

      // show dropdown of queries
      this.sectionSelected = true;
      this.dropdownQuery();
    }
  }

  filterQuery() {
    let option: any = event.target as HTMLElement;
    let optionText: string = option.innerHTML;
    console.log(option);
    if (optionText) {
      this.queryName = optionText;
    }
    //hide the options
    this.dropdownQuery();
  }

  filter() {
    let filteredRequests: any[] = [];
    this.requests.forEach(currentRequest => {
      let section = this.sectionName.toLowerCase();
      console.log(currentRequest);
      if (currentRequest[section] == this.queryName) {
        filteredRequests.push(currentRequest);
      }
    });
    console.log(filteredRequests);
    this.requests = filteredRequests;
  }
}
