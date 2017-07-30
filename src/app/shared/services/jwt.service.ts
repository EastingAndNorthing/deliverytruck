import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Headers, Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class JwtService {

  constructor(private http: Http) {}

  getToken(): String {
    return window.localStorage['token'];
  }

  requestToken(username, password) {

    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers });
    
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('email', username);
    urlSearchParams.append('password', password);

    let body = urlSearchParams.toString()

    return this.http.post(`${environment.apiUrl}/authenticate`, body, options)
      .map((res: Response) => res.json());
     
  }

  saveToken(token: String) {
    window.localStorage['token'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('token');
  }

}
