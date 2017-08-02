import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {

  loggedIn$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<any>({});

  constructor(private router: Router, private jwtService: JwtService) {
    if(this.jwtService.getToken()) this.setLoggedIn(true);
  }

  setLoggedIn(value: boolean) {
    this.loggedIn$.next(value);
  }

  login(username, password) {
    return this.jwtService.requestToken(username, password)
      .subscribe(
        res =>  {
          if(res.success) {
            this.jwtService.saveToken(res.token);
            this.setLoggedIn(true);
          } else {
            if(res.status > 0) {
              this.error$.next(JSON.parse(res._body));
            } else {
              this.error$.next({
                message: 'Server unavailable.'
              });
            }
          }
        },
        error => {
          console.error('Auth:', error);
        }
      );
  }

  logout() {
    this.jwtService.destroyToken();
    this.setLoggedIn(false);
    this.router.navigate(['']);
  }

  get authenticated() {
    return this.loggedIn$.asObservable();
  }

  get error() {
    return this.error$.asObservable();
  }

}
