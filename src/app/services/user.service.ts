import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // http options used for making API calls
  private httpOptions: any;

  // actual JWT token
  public token: string;

  // token expiration date
  public token_expires: Date;

  // username of logged in user
  public username: string;

  // error messages from login attempt
  public errors: any=[];

  constructor(private http: HttpClient) { 
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }

  // register a user
  public signup(user) {
    var mytest: any;
    mytest = this.http.post('http://127.0.0.1:8000/mech-app/users/', JSON.stringify(user), this.httpOptions).subscribe(
      data  => {
        console.log("Sign Up Request is successful ", data);
        },
      error => {
        console.log("Error", error);
      }
    );
    console.log("subscription finished")
    console.log(user);
    return mytest;
  }


  // get auth token from JWT endpoint
  public login(user) {
    this.http.post('http://127.0.0.1:8000/mech-app/auth/login/', JSON.stringify(user), this.httpOptions).subscribe(
      data => {
        this.updateData(data['token']);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }

  // refresh JWT to extend time of user login 
  public refreshToken() {
    this.http.post('/api-token-refresh/', JSON.stringify({token: this.token}), this.httpOptions).subscribe(
      data => {
        this.updateData(data['token']);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }

  // logout the user
  public logout() {
    this.token = null;
    this.token_expires = null;
    this.username = null;
  }

  // private method to updata data 
  private updateData(token) {
    this.token = token;
    this.errors = [];

    // decode token to read username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
  }


}
