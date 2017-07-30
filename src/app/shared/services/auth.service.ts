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
    this.jwtService.requestToken(username, password)
      .subscribe(
        res =>  {
          if(res.success) this.jwtService.saveToken(res.token);
          this.setLoggedIn(true);
        },
        error => this.error$.next(error.json())
      );
  }

  logout() {
    this.jwtService.destroyToken();
    this.setLoggedIn(false);
    this.router.navigate(['/login']);
  }

  get authenticated() {
    return this.loggedIn$.asObservable();
  }

  get error() {
    return this.error$.asObservable();
  }

}
