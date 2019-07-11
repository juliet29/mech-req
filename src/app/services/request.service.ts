import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  // use http.get() to load data from API endpoint
  list() {
    return this.http.get('http://127.0.0.1:8000/servicerequest');
  }

}
