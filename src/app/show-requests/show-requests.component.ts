import { Component, OnInit, Input } from "@angular/core";
import { requestData } from "src/app/_models/requestData";

@Component({
  selector: "app-show-requests",
  templateUrl: "./show-requests.component.html",
  styleUrls: ["./show-requests.component.scss"]
})
export class ShowRequestsComponent implements OnInit {
  @Input() req: any;

  constructor() {}

  ngOnInit() {
    console.log("hi!");
    console.log(this.req);
  }

  dropdown() {
    let target = event.target as HTMLElement;
    let target_id = Number(target.id);

    // the specific dropdown that is being shown
    let displayElement = document.getElementsByClassName("display-sometimes")[
      target_id
    ] as HTMLElement;

    // for showing and hiding dropdown
    if (displayElement.classList.contains("show")) {
      displayElement.classList.remove("show");
    } else {
      displayElement.classList.add("show");
    }
  }
}
