import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';



// create http headers
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

let api_site = 'http://127.0.0.1:8000/mech-app/service/'



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

  list_user(author) {
    // get information about the user and put in local storage
    let param1 = new HttpParams().set('author', author);
    return this.http.get('http://127.0.0.1:8000/mech-app/service/', {params: param1});
  }

  create(newRequest){
    var mytest: any;
    mytest = this.http.post(api_site, newRequest).subscribe(
      data  => {
        console.log("Service Request Creation is successful ", data);
        },
      error => {
        console.log("Error", error);
      }
    );

    console.log(mytest);
    return mytest;
  }

  


 }


