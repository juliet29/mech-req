import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { RequestService } from 'src/app/_services/request.service';
import { PlantIdService } from 'src/app/_services/plant-id.service';



const months = ["January", "Februaury", "March","April", "May", "June", "July", "August", "September", "October", "November", "December"];

@Component({
  selector: 'app-problem-form',
  templateUrl: './problem-form.component.html',
  styleUrls: ['./problem-form.component.scss']
})
export class ProblemFormComponent implements OnInit {

  @Input() currentPlantName: string;  
  // some vars that get used 
  today: any;
  today_nice: any;
  subscription: any;
  subscription2: any;
  afterSubmit: boolean

  // object representing the data that will be sent to the API
  public new_request: any;

  // all variables for the new_request are null to begin with
  request_id: any;
  time_sent: any;
  plant: any;
  location: string;
  complaint_title: string;
  complaint: any;
  author: any;
 

  constructor(private _UserService: UserService, private _RequestService: RequestService, 
    private _PlantIdService: PlantIdService) {
      // get info about the current plant and location
      this.subscription = this._PlantIdService.getPlantID().subscribe(
        currentPlant => this.plant = currentPlant
      );
      this.subscription2 = this._PlantIdService.getLocationID().subscribe(
        currentLocation => this.location = currentLocation
      );

    }

  ngOnInit() {
    this.new_request={};
    this.today_nice = this.current_time();
    this.afterSubmit = false;
  }

  serviceRequestForm = new FormGroup({
    complaint_title: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(28)]),
    complaint: new FormControl('', [Validators.required, Validators.minLength(4)])
  })

  // get current time for the submision
  current_time() {
    this.today = new Date();
    var date = (this.today.getDate()+1)+' '+ months[this.today.getMonth()] + ' ' + this.today.getFullYear();
    var minutes = this.today.getMinutes()
    if (minutes < 10){
      minutes = '0' + minutes
    }
    var time = this.today.getHours() + ":" + minutes;
    var dateTime = date+' at '+time;
    return dateTime;
  }

  // generate a unique ID for the submission
  IDGenerator() {
    var length = 8;
    var timestamp = +new Date; 
    var _getRandomInt = function( min, max ) {
     return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    }
    var generate = function() {
      var ts = timestamp.toString();
      var parts = ts.split( "" ).reverse();
      var id = "";
      for( var i = 0; i < length; ++i ) {
       var index = _getRandomInt( 0, parts.length - 1 );
       id += parts[index];
      }  
      return id;
    }
    var new_id = generate();
    return new_id;
  }

  // give all the fields their appropriate values 
  onSubmit(){
    this.request_id = this.IDGenerator()
    this.time_sent = this.today;
    this.complaint_title = this.serviceRequestForm.get('complaint_title').value;
    this.complaint = this.serviceRequestForm.get('complaint').value;
    this.location = this.plant + ' - '+ this.location;
    this.author = this._UserService.username
    this.afterSubmit = true;
    this.postSubmit();
  }

  // prepare and actually post the submission
  postSubmit() {
    console.log("submission event!");
    this.new_request = {
      request_id: this.request_id,
      time_sent: this.time_sent,
      location: this.location,
      title: this.complaint_title,
      complaint: this.complaint,
      author: this._UserService.currentUserValue.id
    };
    this._RequestService.create(this.new_request);
    }

  // unsubscribe from subscriptions giving info about the location
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

  



  


}
