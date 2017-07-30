import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Headers, Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class JwtService {

  tokenUrl: string = 'Token';

  constructor(private http: Http) {}

  getToken(): String {
    return window.localStorage['jwtToken'];
  }

  requestToken(username, password) {

    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({headers});
    let body = new URLSearchParams();
    body.append('grant_type', 'password');
    body.append('username', username);
    body.append('password', password);

    return this.http.post(`${this.tokenUrl}`, body.toString(), options)
      .map((res: Response) => res.json());
     
  }

  saveToken(token: String) {
    window.localStorage['jwtToken'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }

}
