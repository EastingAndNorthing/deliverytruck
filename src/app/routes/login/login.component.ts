import { Component, OnInit, Input} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMsg: string;

  constructor(private authService: AuthService, private router: Router) {
    if(this.router.url == '/logout') {
      this.authService.logout();
    }
    this.authService.authenticated.subscribe(auth => {
      if(auth) this.router.navigate(['/dashboard']);
    });
    // this.authService.error.subscribe(err => {
    //   this.errorMsg = err.error_description
    // });
  }

  ngOnInit() { }

  login(username, password) {
    this.authService.login(username, password);
  }

}
