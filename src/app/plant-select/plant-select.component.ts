import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';


@Component({
  selector: 'app-plant-select',
  templateUrl: './plant-select.component.html',
  styleUrls: ['./plant-select.component.scss']
})
export class PlantSelectComponent implements OnInit {
  bodyText: string;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.bodyText = 'This text can be updated in modal 1';
  }
  
  @Input() plantName: string;
  @Input() locations: any;

  clickMessage = '';

  onClickMe() {
    this.clickMessage = "What's the problem?";
  }

  openModal(id: string) {
      this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }
  
  



}
