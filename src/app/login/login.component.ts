import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup,} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public registerNewUser: boolean = false;

  constructor(private _UserService: UserService) { }

  ngOnInit() {
  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  signUpForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    phone_number: new FormControl('', [Validators.required]),
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
  }

  onLoginSubmit(){
    this.login();
  }

  refreshToken() {
    this._UserService.refreshToken();
  }

  logout(){
    this._UserService.logout();
  }

  renderSignUp() {
    this.registerNewUser = true;
  }

  onSignupSubmit() {
    this._UserService.signup({
      'username': this.signUpForm.get('username').value,
      'phonenum': this.signUpForm.get('phone_number').value,
      'password': this.signUpForm.get('password').value,
    });
  }

}
