import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RootObject } from '../Models/Test';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class NutritionServiceService {



  readonly baseUrl = environment.baseUrl;

  apiUrlGET: string = 'https://api.edamam.com/api/nutrition-data?app_id=f09217e9&app_key=1ab63e891ae33fb2c91ae9ce06d73ea0';
  apiUrlPOST: string = 'https://api.edamam.com/api/nutrition-details?app_id=f09217e9&app_key=1ab63e891ae33fb2c91ae9ce06d73ea0';

  app_id: string = 'f09217e9';
  app_key: string = '1ab63e891ae33fb2c91ae9ce06d73ea0';

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

//GET
  getAllData(nutrition:any, inger:any[]) : Observable<RootObject[]> {

    return this.httpClient.get<RootObject[]>(this.apiUrlGET + '&' + 'nutrition-type=' + nutrition + '&' + 'ingr=' + inger )
    .pipe(
      map((response: RootObject[]) => {
        return response as RootObject[];
      }),
      catchError((err, caught) => {
        console.error(err);
        throw err;
      }
      )
    )
}
////////////////////////////////////////////////
//****************  POST **********************
///////////////////////////////////////////////

CreateData(data: any): Observable<any> {
  return this.httpClient.post(this.apiUrlPOST , JSON.stringify(data), httpOptions ).pipe(
    catchError(this.handleError)
  );
}

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}
