import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RecipesApiResponse, SingleRecipeApiResponse } from './recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  endpoint: string = 'https://api.edamam.com/api/recipes/v2';
  apiId: string = '1e4ecae3';
  apiKey: string = '%208e3b71f7b15b3a51a6f4e1b82cdf2d60';
  constructor(
    private http: HttpClient, 
    public router: Router
  ) { }

  getAllRecipes(customQuery?: string): Observable<RecipesApiResponse> {
    const api = `${this.endpoint}?type=public&q=vegetarian${customQuery ? customQuery : ''}&app_id=${this.apiId}&app_key=${this.apiKey}`;
    console.log(api);
    return this.http.get<RecipesApiResponse>(api).pipe(catchError(this.handleError));
  }

  getRecipe(id: string): Observable<SingleRecipeApiResponse> {
    const api = `${this.endpoint}/${id}?type=public&app_id=${this.apiId}&app_key=${this.apiKey}`;
    return this.http.get<SingleRecipeApiResponse>(api).pipe(catchError(this.handleError));
  }

  // Error handler
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => new Error(msg));
  }
}
