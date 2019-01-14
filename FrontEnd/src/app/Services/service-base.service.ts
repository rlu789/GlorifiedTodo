import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, zip } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ServiceBaseService {
  public Constants = {
    "Get": 0,
    "Post": 1,
    "Put": 2,
    "Delete": 3
  }
  public accessPointUrlBase = 'http://localhost:57115/api/';

  constructor(private http: HttpClient, public snackBar: MatSnackBar) { }

  public call(callType: number, url: string, reqHeaders: HttpHeaders, payload?: {} | [any]): Observable<any> {
    var observableToReturn = new Observable(observableToReturn => {
      var call;
      switch (callType) {
        case 0:
          call = this.http.get(url, { headers: reqHeaders });
          break;
        case 1:
          call = this.http.post(url, payload, { headers: reqHeaders });
          break;
        case 2:
          call = this.http.put(url, payload, { headers: reqHeaders });
          break;
        case 3:
          call = this.http.delete(url, { headers: reqHeaders });
          break;
        default:
          throw Error("callType param required");
      }
      call.subscribe((data: any) => {
        observableToReturn.next(data);
      }, (err: HttpErrorResponse) => {
        console.log(err);
        var errMsg = err.error && err.error.message || err.statusText;
        // THIS IS THE OLD FORMAT FOR NON 4.5 BACKEND
        // if (err.error.length !== undefined) {
        //   errMsg += ': ';
        //   Object.keys(err.error).forEach(function (e) {
        //     // errMsg += ' ' + e + ": "
        //     err.error[e].forEach(function (str) {
        //       errMsg += str;
        //     })
        //   })
        // }
        if (err.error && err.error.modelState && typeof err.error.modelState === "object") {
          Object.keys(err.error.modelState).forEach(function (e) {
            err.error.modelState[e].forEach(function (str) {
              errMsg += str;
            })
          })
        }
        this.openSnackBar(errMsg);
        observableToReturn.error(err);
      });
    });

    return observableToReturn;
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', { duration: 2500});
  }

  public generateHeaders(password: string): HttpHeaders {
    var headers = { 'Content-Type': 'application/json; charset=utf-8' }
    if (password) headers['Authorization'] = password;
    return new HttpHeaders(headers);
  };
}
