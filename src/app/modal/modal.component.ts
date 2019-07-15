import { Component, OnInit, ElementRef, Input, OnDestroy } from '@angular/core';

import { ModalService } from 'src/app/services/modal.service';

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
        console.log(e.target);
        modal.close();
      }
    });

    // add self (this modal instance) to the modal service so that its accessible from controllers
    this.modalService.add(this);
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void{
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void{
      var hello = event.target;
      console.log(hello);
      document.body.classList.add('app-modal');
      this.element.firstChild.style.display = 'block';
      this.element.lastChild.style.display = 'block';


  }

  // close modal
  close(): void {
    this.element.firstChild.style.display = 'none';
    this.element.lastChild.style.display = 'none';
    document.body.classList.remove('app-modal');
  }

}
