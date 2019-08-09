import {
  Component,
  OnInit,
  ElementRef,
  Input,
  OnDestroy,
  AfterContentInit
} from "@angular/core";
import { ModalService } from "src/app/_services/modal.service";
import { PlantIdService } from "src/app/_services/plant-id.service";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  public element: any;

  constructor(
    public modalService: ModalService,
    public el: ElementRef,
    public _PlantIdService: PlantIdService
  ) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    this.html = "hello";
    this._PlantIdService.updateLocationID(this.html);
    // set up modal as the king pin
    let modal = this;
    // ensure id attribute exists
    if (!this.id) {
      console.error("modal must have an id");
      return;
    }

    // move element to the bottom of the page, just before body so it can be displayed before anything else
    document.body.appendChild(this.element);

    //close Modal on background click
    this.element.addEventListener("click", function(e: any) {
      if (e.target.className === "app-modal") {
        console.log(e.target);
        modal.close();
      }
    });

    // add self (this modal instance) to the modal service so that its accessible from controllers
    this.modalService.add(this);
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  html: string;
  no_html: string;
  location_html: any;

  // open modal
  open(): void {
    //console.log(this.html);
    // set up so that user can know location when modal is open
    this.location_html = event.target;
    this.html = this.location_html.innerHTML;
    this._PlantIdService.updateLocationID(this.html);
    // console.log(this.html);

    document.body.classList.add("app-modal");
    this.element.firstChild.style.display = "block";
    this.element.lastChild.style.display = "block";
  }

  // close modal
  close(): void {
    this.element.firstChild.style.display = "none";
    this.element.lastChild.style.display = "none";
    document.body.classList.remove("app-modal");
  }
}
