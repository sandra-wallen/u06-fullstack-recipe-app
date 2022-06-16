import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  endpoint: string = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getLists(token: string | null): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.get<any>(`${this.endpoint}/recipe-lists`, {headers: headers}).pipe(catchError(this.handleError));
  }

  getList(token: string | null, id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.get<any>(`${this.endpoint}/recipe-list/${id}`, { headers: headers }).pipe(catchError(this.handleError));
  }

  addRecipeToList(listId: string, recipeId: string | undefined, token: string | null): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.patch<any>(`${this.endpoint}/recipe-list/${listId}/add-recipe`, { "recipeId": recipeId }, { headers: headers }).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`
    }

    return throwError(() => new Error(msg));
  }
}
