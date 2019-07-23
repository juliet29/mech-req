import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private _UserService: UserService, private _Router: Router) {}

  loggedIn: boolean=false;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      let url: string = state.url;

      return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {

    // subscribe to the authorization token as evidence of logged in or not
    this._UserService.currentToken.subscribe(
      data => {
        if (data) {
          this.loggedIn = true,
          console.log("Auth Guard Passed? " + this.loggedIn)
          }    
        },
      err => console.error(err),
    )

    if (this.loggedIn) { 
      return true; 
    }

    // Store the attempted URL for redirecting
    this._UserService.redirectUrl = url;

    // Navigate to the login page 
    this._Router.navigate(['/login']);
    return false;
  }
}
