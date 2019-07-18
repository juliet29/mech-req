import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup,} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: any;

  constructor(private _UserService: UserService) { }

  ngOnInit() {
    this.user = {
      username: '',
      password: ''
    };

  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  login() {
    this._UserService.login({
      'username': this.loginForm.get('username').value,
      'password': this.loginForm.get('password').value
    });
  }

  onSubmit(){
    this.login();
  }

  refreshToken() {
    this._UserService.refreshToken();
  }

  logout(){
    this._UserService.logout();
  }

}
