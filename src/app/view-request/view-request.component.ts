import { Component, OnInit } from '@angular/core';
import {RequestService} from 'src/app/services/request.service'


const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.scss']
})
export class ViewRequestComponent implements OnInit {
  

  // array of all the ServiceRequest objects from the API
  public request;

  constructor(private _RequestService: RequestService) { }

  ngOnInit() {
    this.getRequest();
  }

  // get the requests from the API
  getRequest() {
    console.log("getRequest");  
    
    this._RequestService.list().subscribe(
      // on success, convert data into a nice format to display
      data => {
        this.request = data;
        for (let a_request of this.request) {
          let s_date = new Date(a_request.time_sent);
          a_request.time_sent = s_date.getDate() + "-" + months[s_date.getMonth()] + "-" + s_date.getFullYear()
        }
      },

      // on failure, log error
      err => console.error(err),

      // on completion, log completion
      () => console.log('done loading posts')
    );  
  }

  // send new request to the API
  createRequest() {
    console.log("createRequest");
    // refresh the list 
    // or throw an error
  }

}
