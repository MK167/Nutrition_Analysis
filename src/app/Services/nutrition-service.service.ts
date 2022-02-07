import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RootObject } from '../Models/NurtirationGET';
import { RootObjectIngr } from '../Models/IngredientStructure';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class NutritionServiceService {

  readonly baseUrl = environment.baseUrl;

  app_id: string = 'f09217e9';
  app_key: string = '1ab63e891ae33fb2c91ae9ce06d73ea0';

  apiUrlGET: string = `nutrition-data?app_id=${this.app_id}&app_key=${this.app_key}`;
  apiUrlPOST: string = `nutrition-details?app_id=${this.app_id}&app_key=${this.app_key}`;

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

////////////////////////////////////////////////
//****************  GET  **********************
///////////////////////////////////////////////

  getAllData(nutritionType:any, inger:any) : Observable<RootObject[]> {

    return this.httpClient.get<RootObject[]>(this.baseUrl+ this.apiUrlGET + '&' + 'nutrition-type=' + nutritionType + '&' + 'ingr=' + inger )
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
//**************** GET Data ingredients *******
///////////////////////////////////////////////

  getAllDataIngr(inger:any) : Observable<RootObject[]> {

    return this.httpClient.get<RootObject[]>(this.baseUrl+ this.apiUrlGET + '&' +  'ingr=' + inger )
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
  return this.httpClient.post(this.baseUrl + this.apiUrlPOST , JSON.stringify(data), httpOptions ).pipe(
    catchError(this.handleError)
  );
}
////////////////////////////////////////////////
//****************  HandleError ***************
///////////////////////////////////////////////

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
