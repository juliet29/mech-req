import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { UserService } from "src/app/_services/user.service";
import { Router } from "@angular/router";
import { MustMatch } from "src/app/_helpers/must-match.validator";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public registerNewUser: boolean = false;
  public successRegister: boolean = false;
  public test: string;

  loggedIn: boolean = false;

  constructor(private _UserService: UserService, private _Router: Router) {}

  ngOnInit() {
    console.log(this.signUpForm.get("admin").value);
  }

  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  signUpForm = new FormGroup({
    username: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
    passwordCheck: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
    admin: new FormControl(false, [Validators.required]),
  });

  // pass in here the username tokens
  login() {
    this._UserService.login({
      username: this.loginForm.get("username").value,
      password: this.loginForm.get("password").value,
    });

    // subscribe to the token as evidence of logged in or not
    this._UserService.currentToken.subscribe(
      (data) => {
        if (data) {
          console.log("logged in");
          this.loggedIn = true;
          console.log(this.loggedIn);
          // redirect url or regular one when user gets in succesfully
        }
      },
      (err) => console.error(err)
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
      let check_1 = this._UserService.signup({
        username: this.signUpForm.get("username").value,
        email: this.signUpForm.get("email").value,
        password: this.signUpForm.get("password").value,
        is_staff: this.signUpForm.get("admin").value,
      });
      console.log(check_1);

      // let check_2 = this._UserService.signupPhone({
      //   username: this.signUpForm.get("username").value,
      //   phone_number: JSON.stringify(this.signUpForm.get("phoneNumber").value),
      // });
      // console.log(check_2);

      if (check_1 == true) {
        alert("Sign Up Succesful, Refresh Page to Login");
        this.successRegister = true;
        this.registerNewUser = false;
      } else {
        alert(
          "Sign Up Unsuccesful, Please Enter Real Values. Check the Console For More Details!"
        );
      }
    }
  }
}
