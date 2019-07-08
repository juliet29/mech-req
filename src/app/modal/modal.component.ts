import { Component, OnInit, ElementRef, Input, OnDestroy } from '@angular/core';

import { ModalService } from 'src/app/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: any;

  constructor(private modalService: ModalService, private el: ElementRef) { 
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    let modal = this;

    // ensure id attribute exists
    if (!this.id){
      console.error('modal must have an id');
      return;
    }

    // move element to the bottom of the page, just before body so it can be displayed before anything else
    document.body.appendChild(this.element);

    //close Modal on background click
    this.element.addEventListener('click', function (e: any) {
      if (e.target.className === 'app-modal') {
        modal.close();
      }
    });

    // add self (this modal instance) to the modal service so that its accessible from controllers
    this.modalService.add(this);
  }

  // move self from modal service when component is destroyed
  ngOnDestroy(): void{
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void{
      this.element.style.display = 'block';
      document.body.classList.add('app-modal');
  }

  // close modal
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('app-modal');
  }

}
