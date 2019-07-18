import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // http options used for making API calls
  private httpOptions: any;

  // the link 
  private link: string = '/api-token-auth/';
  private link2: string = '/api-token-refresh/';

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
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  // get auth token from JWT endpoint
  public login(user) {
    this.http.post(this.link, JSON.stringify(user), this.httpOptions).subscribe(
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
    this.http.post(this.link2, JSON.stringify({token: this.token}), this.httpOptions).subscribe(
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
