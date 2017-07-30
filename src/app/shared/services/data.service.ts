import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../../environments/environment';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { JwtService } from './jwt.service';
import { AuthService } from './auth.service';

@Injectable()
export class DataService {

  constructor(
    private jwtService: JwtService,
    private http: Http,
    private authService: AuthService,
    private router: Router
  ) {}

  private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (this.jwtService.getToken()) {
      headersConfig['Authorization'] = this.jwtService.getToken();
    }
    return new Headers(headersConfig);
  }

  private handleHttpStatus(status: any) {
    switch (status) {
      case 401:
        this.authService.logout();
        break;
      case 404:
        console.error('Request 404')
        break;
      default:
    }
  }

  public get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, 
      { headers: this.setHeaders(), search: params })
      .catch((err:any) => {
        this.handleHttpStatus(err.status);
        return Observable.of(undefined);
      })
      .map((res: Response) => {
        this.handleHttpStatus(res.status);
        return (res) ? res.json() : []
      });
  }

  public put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
    .catch((err:any) => {
      this.handleHttpStatus(err.status);
      return Observable.of(undefined);
    })
    .map((res: Response) => res.json());
  }

  public post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
    .catch((err:any) => {
      this.handleHttpStatus(err.status);
      return Observable.of(undefined);
    })
    .map((res: Response) => res.json());
  }

  public delete(path): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}${path}`,
      { headers: this.setHeaders() }
    )
    .catch((err:any) => {
      this.handleHttpStatus(err.status);
      return Observable.of(undefined);
    })
    .map((res: Response) => res.json());
  }
}
