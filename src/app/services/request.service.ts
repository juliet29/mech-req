import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { throwError } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';


// create http headers
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

let api_site = 'http://127.0.0.1:8000/servicerequest'



@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  // use http.get() to load data from API endpoint
  list() {
    return this.http.get(api_site);
    // should add error handling
  }

  create(newRequest){
    var mytest: any;
    console.log(newRequest);
    mytest = this.http.post(api_site, newRequest).subscribe(
      data  => {
        console.log("POST Request is successful ", data);
        },
      error => {
        console.log("Error", error);
      }
    );

    console.log(mytest);
    return mytest;
  }

  


 }


