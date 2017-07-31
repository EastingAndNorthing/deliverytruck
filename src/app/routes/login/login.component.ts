import { Component, OnInit, Input} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'app/shared/services/auth.service';

import { User } from 'app/shared/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMsg: string;
  submitted: boolean = false;
  model: User = new User('', '');

  constructor(private authService: AuthService, private router: Router) {
    if(this.router.url == '/logout') {
      this.authService.logout();
    }
    this.authService.authenticated.subscribe(auth => {
      if(auth) this.router.navigate(['/dashboard']);
    });

    this.authService.error.subscribe(err => {
      this.errorMsg = err.message
      setTimeout(() => this.submitted = false, 1000);
    });
  }

  ngOnInit() { }

  onSubmit(username, password) {
    this.submitted = true;
    this.authService.login(username, password)
  }

}
