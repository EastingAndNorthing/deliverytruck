import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    this.authService.authenticated
      .subscribe(auth => {
        if(!auth) this.router.navigate(['']);
        return false;
      });
    return true;
  }
}
