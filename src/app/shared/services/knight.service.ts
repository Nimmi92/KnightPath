import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class KnightService {
  private endpoint:string = 'https://v86wed9i20.execute-api.eu-west-1.amazonaws.com/public/knight-path';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || [];
  }

  getPath(start,end): Observable<any> {
  	return this.http.get(this.endpoint + '?start=' + start + '&end=' + end).pipe(
      map(this.extractData));
  }

  convertToArray(str,alpha){
    let result = [];
    for(let i=0;i<str.length;i++) {
      if(alpha.indexOf(str[i]) > -1) {
        let element = str[i] + str[i+1];
        result.push(element);
      }
    }
    return result;
  }  

  computeTravelPath(data) {
    let result = [];
    let temp;
    for(let i=0;i<data.length-1;i++) {
      temp = this.calc(data[i],data[i+1]);
      result.push(temp[0]);
      result.push(temp[1]);
    }
    return result;
  }

  calc(start,end) {
    let sletter = start.charAt(0);
    let snumber = parseInt(start.charAt(1));
    let eletter = end.charAt(0);
    let enumber = parseInt(end.charAt(1));
    let result = []; 
    let point1, point2;
    /* Moving Right */
    if(sletter < eletter) {
      /* Moving to one box right */
      if(sletter.charCodeAt(0)+1 == eletter.charCodeAt(0)) {
        /* Moving down */
        if(snumber < enumber) {
          point1 = sletter + (snumber + 1);
          point2 = sletter + (snumber + 2);
          result.push({'point': point1, 'class': 'down'});
          result.push({'point': point2, 'class': 'right'});
        }
        /* Moving up */
        else {
          point1 = sletter + (snumber - 1);
          point2 = sletter + (snumber - 2);
          result.push({'point': point1, 'class': 'up'});
          result.push({'point': point2, 'class': 'right'});
        }
      }
      /* Moving to two box right */
      else if(sletter.charCodeAt(0)+2 == eletter.charCodeAt(0)) {
        if(snumber < enumber) {
          point1 = sletter + enumber;
          point2 = (String.fromCharCode(sletter.charCodeAt(0)+1)) + enumber;
          result.push({'point': point1, 'class': 'down'});
          result.push({'point': point2, 'class': 'right'});
        }
        else {
          point1 = sletter + enumber;
          point2 = (String.fromCharCode(sletter.charCodeAt(0)+1)) + enumber;
          result.push({'point': point1, 'class': 'up'});
          result.push({'point': point2, 'class': 'right'});
        }
      }
    }
    /* Moving Left */
    else {
     /* Moving to one box left */
      if(sletter.charCodeAt(0)-1 == eletter.charCodeAt(0)) {
        /* Moving down */
        if(snumber < enumber) {
          point1 = sletter + (snumber + 1);
          point2 = sletter + (snumber + 2);
          result.push({'point': point1, 'class': 'down'});
          result.push({'point': point2, 'class': 'left'});
        }
        /* Moving up */
        else {
          point1 = sletter + (snumber - 1);
          point2 = sletter + (snumber - 2);
          result.push({'point': point1, 'class': 'up'});
          result.push({'point': point2, 'class': 'left'});
        }
      }
      /* Moving to two box left */
      else if(sletter.charCodeAt(0)-2 == eletter.charCodeAt(0)) {
        if(snumber < enumber) {
          point1 = sletter + enumber;
          point2 = (String.fromCharCode(sletter.charCodeAt(0)-1)) + enumber;
          result.push({'point': point1, 'class': 'down'});
          result.push({'point': point2, 'class': 'left'});
        }
        else{
          point1 = sletter + enumber;
          point2 = (String.fromCharCode(sletter.charCodeAt(0)-1)) + enumber;
          result.push({'point': point1, 'class': 'up'});
          result.push({'point': point2, 'class': 'left'});
        } 
      }
    }
    return result;
  }

}
