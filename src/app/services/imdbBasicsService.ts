import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {Basics} from "../models/basics";

@Injectable({
  providedIn: 'root',
})

export class ImdbBasicsService {




  apiUrl: string = 'http://localhost:3000/basics';
  headers = new HttpHeaders({
    'Cache-Control':
      'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
    Pragma: 'no-cache',
    Expires: '0',
  }).set('Content-Type', 'application/json');

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    }),
  };

  constructor(private http: HttpClient) {}

  // Create
  create(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}`;
    return this.http.post(API_URL, data).pipe(catchError(this.handleError));
  }


  read() {
    return this.http.get<Basics[]>(`${this.apiUrl}`);
  }

  // Update
  update(id: any, data: Basics): Observable<any> {
    let API_URL = `${this.apiUrl}/${id}`;
    console.log('API URL PUT : ' + API_URL);
    console.log('API DATA PUT GENRE: ' +data.originalTitle);
    return this.http
      .put<Basics>(API_URL, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }


  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  public notify = new BehaviorSubject<any>('');

  notifyUpdateDataBasics$ = this.notify.asObservable();

  public notifyOther(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }

}
