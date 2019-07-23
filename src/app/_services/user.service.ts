import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserData } from '../_models/userData';
import { tokenData } from '../_models/tokenData';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  // http options used for making API calls
  private httpOptions: any;

  // actual JWT token
  token: string;

  // token expiration date
  token_expires: Date;

  // token data object
  

  // error messages from login attempt
  errors: any=[]; 
 
  // username of logged in user
  username: string;

  // success of login?
  isLoggedIn: boolean = false;

  // redirect url 
  redirectUrl: string;

  // Subjects that will make user info available 
  private currentUserSubject: BehaviorSubject<UserData>;
  public currentUser: Observable<UserData>;

  // Subjects that will make token info available 
  private currentTokenSubject: BehaviorSubject<any>;
  public currentToken: Observable<any>;


  constructor(private http: HttpClient) { 
    // declare headers for talking to database
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    // give the current value of the user what is in local storage
    this.currentUserSubject = new BehaviorSubject<UserData>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    // do the same for the token -- dont put in local storage tho!
    this.currentTokenSubject = new BehaviorSubject<UserData>(JSON.parse(localStorage.getItem('currentToken')));
    this.currentToken = this.currentTokenSubject.asObservable();


  }

  // easy way for components to get info about user w/o subscribing
  public get currentUserValue(): UserData {
    return this.currentUserSubject.value;
  }

  public get currentTokenValue(): any {
    return this.currentTokenSubject.value;
  }




  // register a user
  public signup(user) {
    var mytest: any;
    mytest = this.http.post('http://127.0.0.1:8000/mech-app/users/', JSON.stringify(user), this.httpOptions).subscribe(
      data  => {
        console.log("Sign Up Request is successful ", data);
        },
        err => console.error(err)
    );
    return mytest;
  }




  // get auth token from JWT endpoint and store users data 
  public login(user) {
    // parse the log in entry to create local user variable
    let my_user = JSON.stringify(user)
    let my_username = JSON.parse(my_user).username;

    // get the authentication token for the user
    this.http.post('http://127.0.0.1:8000/mech-app/token/', my_user, this.httpOptions).subscribe(
      data => {
        this.updateData(data['token'], my_username); 
      },
      err => console.error(err)
    );   
    
  }

  // refresh JWT to extend time of user login 
  public refreshToken() {
    // don't need to update info about the user
    let my_username: string = null;

    this.http.post('http://127.0.0.1:8000/mech-app/token/refresh/', JSON.stringify({token: this.currentTokenValue.token}), this.httpOptions).subscribe(
      data => {
        this.updateData(data['token'], my_username); 
      },
      err => console.error(err)
    );
  }

  // logout the user
  public logout() {
    this.token = null;
    this.token_expires = null;
    this.username = null;

    // remove user and token from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);

    localStorage.removeItem('currentToken');
    this.currentTokenSubject.next(null);

    this.isLoggedIn = false;
  }


  // private method to updata data 
  private updateData(token, my_username) {

    let tokendata: {
      token: string,
      token_expires: Date
    }
    this.token = token; 
    this.errors = [];
    
    // decode token to read username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000); 
    this.username = token_decoded.username;

    // set info about token into local storage
    tokendata = {
      token: this.token,
      token_expires: this.token_expires
    };
    
    localStorage.setItem('currentToken', JSON.stringify(tokendata));
    this.currentTokenSubject.next(tokendata);

    if (this.token && my_username) {
      // get information about the user and put in local storage
      let param1 = new HttpParams().set('username', my_username);
      this.http.get('http://127.0.0.1:8000/mech-app/users/', {params: param1}).subscribe(
        userdata => {
          let _userdata = userdata[0] as UserData
          localStorage.setItem('currentUser', JSON.stringify(_userdata)); 
          this.currentUserSubject.next(_userdata);
          return _userdata;
        },
        err => console.error(err)
      );
    }

    
  }


}
