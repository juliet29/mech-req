import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { UserData } from "../_models/userData";
import { tokenData } from "../_models/tokenData";

@Injectable({
  providedIn: "root"
})
export class UserService {
  // private apiURL = "http://127.0.0.1:8000/mech-app/";
  // production url
  apiURL = "http://ssgl2019.pythonanywhere.com/mech-app/";

  // http options used for making API calls
  httpOptions: any;

  // actual JWT token
  token: string;

  // token expiration date
  token_expires: Date;

  // token data object

  // error messages from login attempt
  errors: any = [];

  // username of logged in user
  username: string;

  // success of login?
  isLoggedIn: boolean = false;

  // redirect url
  redirectUrl: string;

  // Subjects that will make user info available
  currentUserSubject: BehaviorSubject<UserData>;
  public currentUser: Observable<UserData>;

  // Subjects that will make token info available
  currentTokenSubject: BehaviorSubject<any>;
  public currentToken: Observable<any>;

  constructor(public http: HttpClient) {
    // declare headers for talking to database
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

    // give the current value of the user what is in local storage
    this.currentUserSubject = new BehaviorSubject<UserData>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();

    // do the same for the token -- dont put in local storage tho!
    this.currentTokenSubject = new BehaviorSubject<UserData>(
      JSON.parse(localStorage.getItem("currentToken"))
    );
    this.currentToken = this.currentTokenSubject.asObservable();
  }

  // easy way for components to get info about user and the token w/o subscribing
  public get currentUserValue(): UserData {
    return this.currentUserSubject.value;
  }

  public get currentTokenValue(): any {
    return this.currentTokenSubject.value;
  }

  // register a user
  public signup(user) {
    this.http
      .post(this.apiURL + "users/", JSON.stringify(user), this.httpOptions)
      .subscribe(
        data => {
          console.log("Sign Up Request is successful ", data);
        },
        err => console.error(err)
      );
    return true;
  }
  // get their phone num also
  public signupPhone(userDetails) {
    return this.http
      .post(
        this.apiURL + "userdetails/",
        JSON.stringify(userDetails),
        this.httpOptions
      )
      .subscribe(
        data => {
          console.log("User Details Added ", data);
        },
        err => console.error(err)
      );
  }

  // get auth token from JWT endpoint and store users data
  public login(user) {
    // parse the log in entry to create local user variable
    let my_user = JSON.stringify(user);
    let my_username = JSON.parse(my_user).username;

    // get the authentication token for the user
    this.http.post(this.apiURL + "token/", my_user, this.httpOptions).subscribe(
      data => {
        this.updateData(data["token"], my_username);
      },
      err => console.error(err)
    );
  }

  // refresh JWT to extend time of user login
  public refreshToken() {
    // don't need to update info about the user
    let my_username: string = null;

    this.http
      .post(
        this.apiURL + "token/refresh/",
        JSON.stringify({ token: this.currentTokenValue.token }),
        this.httpOptions
      )
      .subscribe(
        data => {
          this.updateData(data["token"], my_username);
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
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);

    localStorage.removeItem("currentToken");
    this.currentTokenSubject.next(null);

    this.isLoggedIn = false;
  }

  // private method to updata data
  updateData(token, my_username) {
    let tokendata: {
      token: string;
      token_expires: Date;
    };
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

    localStorage.setItem("currentToken", JSON.stringify(tokendata));
    this.currentTokenSubject.next(tokendata);

    if (this.token && my_username) {
      // get information about the user and put in local storage
      let param1 = new HttpParams().set("username", my_username);
      this.http.get(this.apiURL + "users/", { params: param1 }).subscribe(
        userdata => {
          let _userdata = userdata[0] as UserData;
          localStorage.setItem("currentUser", JSON.stringify(_userdata));
          this.currentUserSubject.next(_userdata);
          return _userdata;
        },
        err => console.error(err)
      );
    }
  }

  tokenTimeRemaining(expiryDate) {
    let now = new Date();
    // milliseconds remaining
    let msRemaining = expiryDate.getTime() - now.getTime();

    // return if ms remaining is less than 0
    if (msRemaining <= 0) {
      console.log("Token Expired");
      return null;
    }

    // Get days from miliseconds
    let days = msRemaining / (1000 * 60 * 60 * 24);
    let absoluteDays = Math.floor(days);

    // if still have days remaining, ignore hours and minutes
    if (absoluteDays > 0) {
      let timeRemaining = absoluteDays + " days";
      return timeRemaining;
    }

    // get remainder from days and convert into hours
    let hours = (days - absoluteDays) * 24;
    let absoluteHours = Math.floor(hours);
    let h = absoluteHours > 9 ? absoluteHours : "0" + absoluteHours;

    // get remainder from hours and convert to minutes
    let minutes = (hours - absoluteHours) * 60;
    let absoluteMinutes = Math.floor(minutes);
    let m = absoluteMinutes > 9 ? absoluteMinutes : "0" + absoluteMinutes;

    let timeRemaining = h + ":" + m;
    return timeRemaining;
  }
}
