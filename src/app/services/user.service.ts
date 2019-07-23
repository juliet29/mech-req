import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

// interface to get info about user 
export interface UserInfo {
  username: string;
  id: any;
}
// move into seperate file later
interface UserData {
  id: number;
  password: string;
  last_login: Date;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  groups: any;
  user_permissions: any;
}

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

  // error messages from login attempt
  public errors: any=[];

  // username of logged in user
  public username: string;

  // id of logged in user
  public id: any;

  public test: string;

  

  // object holding users information that will be made globally available
  public user_info = {} as UserInfo

  // Subjects that will make user info available 
  private currentUserSubject: BehaviorSubject<UserInfo>;
  public currentUser: Observable<UserInfo>;


  constructor(private http: HttpClient) { 
    // declare headers for talking to database
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    // give the current value of the user what is in local storage
    this.currentUserSubject = new BehaviorSubject<UserInfo>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  // easy way for components to get info about user w/o subscribing
  public get currentUserValue(): UserInfo {
    return this.currentUserSubject.value;
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
    this.http.post('http://127.0.0.1:8000/mech-app/token/', JSON.stringify(user), this.httpOptions).subscribe(
      data => {
        this.updateData(data['token']); 
      },
      err => {
        this.errors = err['error'];
      }
    );
    this.furtherLog();
  }

  // refresh JWT to extend time of user login 
  public refreshToken() {
    this.http.post('http://127.0.0.1:8000/mech-app/token/refresh/', JSON.stringify({token: this.token}), this.httpOptions).subscribe(
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

    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  // private method to updata data 
  private updateData(token) {
    this.token = token;
    console.log(this.token);
    this.errors = [];

    // decode token to read username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;

    this.user_info.username = this.username;
    console.log(this.user_info.username );
    console.log(this.test);
  }

  // update user's info
  public furtherLog() {
    // get the users info and save in a safe place
    this.getUserInfo(); 
    this.user_info.username = this.username;
    this.user_info.id = this.id;
    
    console.log("id" + this.id);
    console.log(this.username);
    console.log(this.user_info);
    console.log(this.test);

    // save this info in local storage so that user will only be logged out after the token expires or they log out
    localStorage.setItem('currentUser', JSON.stringify(this.user_info));

    // update the subject with the current logged in user
    this.currentUserSubject.next(this.user_info);

  }

  _userdata1: any;

  // get info about the user once they are logged in 
  private getUserInfo() {
    let param1 = new HttpParams().set('username', "juliet");
    this.http.get('http://127.0.0.1:8000/mech-app/users/', {params: param1}).subscribe(
      data => {
        // get the specific users id number -- this is not a great way to do this 
        
        this._userdata1 = data;
        console.log(this._userdata1)
      },
      err => console.error(err)
      )
  }
  

}
