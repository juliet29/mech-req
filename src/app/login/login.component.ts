import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup,} from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public registerNewUser: boolean = false;
  public successRegister: boolean = false;
  public test: string;

  constructor(private _UserService: UserService, private _Router: Router) { }

  ngOnInit() {
  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  signUpForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    permissions: new FormControl(false, [Validators.required]),
    // validators should check that passwords match on the client side
    password: new FormControl('', [Validators.required]),
    password_check: new FormControl('', [Validators.required]),
  })

  login() {
    this._UserService.login({
      'username': this.loginForm.get('username').value,
      'password': this.loginForm.get('password').value
    });
    // redirect url or regular one when user gets in succesfully
    if (this._UserService.isLoggedIn) {
      let redirect = this._UserService.redirectUrl ? this._Router.parseUrl(this._UserService.redirectUrl) : '/Profile';
      this._Router.navigateByUrl(redirect); 
    }
    
  }

  onLoginSubmit(){
    this.login();
  }

  renderSignUp() {
    this.registerNewUser = true;
  }

  onSignupSubmit() {
    this._UserService.signup({
      'username': this.signUpForm.get('username').value,
      'password': this.signUpForm.get('password').value,
    });
    this.successRegister = true;
    this.registerNewUser = false;
  }

}
