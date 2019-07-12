import { Component, OnInit, Input} from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';
import {throwError} from 'rxjs';


@Component({
  selector: 'app-problem-form',
  templateUrl: './problem-form.component.html',
  styleUrls: ['./problem-form.component.scss']
})
export class ProblemFormComponent implements OnInit {

  // object representing the data that will be sent to the API
  public new_request: any;

  constructor(private _RequestService: RequestService) { }

  ngOnInit() {
    this.new_request={};
  }

  serviceRequestForm = new FormGroup({
    request_id: new FormControl(''),
    sender: new FormControl(''),
    time_sent: new FormControl(''),
    location: new FormControl(''),
    complaint: new FormControl(''),
  })

  onSubmit(){
    this.new_request = this.serviceRequestForm.value;
    console.warn(this.new_request);
    this._RequestService.create(this.new_request);

  }



  


}
