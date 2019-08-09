import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { UserService } from "src/app/_services/user.service";
import { Router } from "@angular/router";
import { MustMatch } from "src/app/_helpers/must-match.validator";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public registerNewUser: boolean = false;
  public successRegister: boolean = false;
  public test: string;

  loggedIn: boolean = false;

  constructor(public _UserService: UserService, public _Router: Router) {}

  ngOnInit() {
    console.log(this.signUpForm.get("admin").value);
  }

  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  });

  signUpForm = new FormGroup({
    username: new FormControl("", [
      Validators.required,
      Validators.minLength(3)
    ]),
    email: new FormControl("", [Validators.required]),
    // phoneNumber: new FormControl("", [
    //   Validators.required,
    //   Validators.minLength(5)
    // ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ]),
    passwordCheck: new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ]),
    admin: new FormControl(false, [Validators.required])
  });

  login() {
    this._UserService.login({
      username: this.loginForm.get("username").value,
      password: this.loginForm.get("password").value
    });

    // subscribe to the token as evidence of logged in or not
    this._UserService.currentToken.subscribe(
      data => {
        if (data) {
          console.log("logged in");
          this.loggedIn = true;
          console.log(this.loggedIn);
          // redirect url or regular one when user gets in succesfully
        }
      },
      err => {
        console.error(err);
        alert("Log In Unsuccesful!");
        console.log("not logged in");
        this.loggedIn = false;
        console.log(this.loggedIn);
      }
    );
  }

  redirect() {
    if (this.loggedIn) {
      console.log("redirecting");
      let redirect = this._UserService.redirectUrl
        ? this._Router.parseUrl(this._UserService.redirectUrl)
        : "/Profile";

      this._Router.navigateByUrl(redirect);
      console.log(redirect);
    }
  }

  onLoginSubmit() {
    this.login();
  }

  renderSignUp() {
    // show the sign up page
    this.registerNewUser = true;
  }

  onSignupSubmit() {
    // check that passwords match
    if (
      this.signUpForm.get("password").value !=
      this.signUpForm.get("passwordCheck").value
    ) {
      alert("Passwords don't match!");
    } else {
      let check = this._UserService.signup({
        username: this.signUpForm.get("username").value,
        email: this.signUpForm.get("email").value,
        password: this.signUpForm.get("password").value,
        is_staff: this.signUpForm.get("admin").value
      });
      // let it be known
      console.log(check);
      if (check == true) {
        alert("Sign Up Succesful");
      } else if (check == false) {
        alert("Sign Up Unsuccesful. Please Refresh the Page and Retry");
      }

      // dont send phone numbers yet
      // if (check) {
      //   this._UserService.signupPhone({
      //     username: this.signUpForm.get("username").value,
      //     phone_number: JSON.stringify(this.signUpForm.get("phoneNumber").value)
      //   });
      // }

      this.successRegister = true;
      this.registerNewUser = false;
    }
  }
}
