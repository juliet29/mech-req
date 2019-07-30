import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { requestData } from "src/app/_models/requestData";

@Component({
  selector: "app-show-requests",
  templateUrl: "./show-requests.component.html",
  styleUrls: ["./show-requests.component.scss"]
})
export class ShowRequestsComponent implements OnInit {
  @Input() req: any;
  @Input() id: any;
  @Input() admin: boolean;
  @Output() boxChecked = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  public isChecked: boolean;
  sendCheckboxInfo() {
    let my_target = event.target as HTMLInputElement;
    console.log(my_target.checked);
    let checkboxInfo: {
      id: BigInteger;
      valid: boolean;
    };

    checkboxInfo = {
      id: this.req.request_id,
      valid: my_target.checked
    };

    //console.log(this.req.request_id);
    this.boxChecked.emit(checkboxInfo);
  }

  // control the showing of the body of the complaint
  dropdown() {
    let my_id = "button" + this.id;

    // the specific dropdown that is being shown
    let displayElement = document
      .getElementById(my_id)
      .getElementsByClassName("display-sometimes")[0] as HTMLElement;

    // for showing and hiding dropdown
    if (displayElement.classList.contains("show")) {
      displayElement.classList.remove("show");
    } else {
      displayElement.classList.add("show");
    }
  }
}
