import { Component, OnInit, Input } from "@angular/core";
import { ModalService } from "src/app/_services/modal.service";

@Component({
  selector: "app-plant-select",
  templateUrl: "./plant-select.component.html",
  styleUrls: ["./plant-select.component.scss"]
})
export class PlantSelectComponent implements OnInit {
  constructor(private modalService: ModalService) {}

  ngOnInit() {}

  @Input() plantName: string;
  @Input() locations: any;

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
