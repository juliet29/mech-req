import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private _UserService: UserService, private _Router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      let url: string = state.url;

      return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this._UserService.isLoggedIn) { 
      return true; 
    }

    // Store the attempted URL for redirecting
    this._UserService.redirectUrl = url;

    // Navigate to the login page with extras
    this._Router.navigate(['/login']);
    return false;
  }
}
