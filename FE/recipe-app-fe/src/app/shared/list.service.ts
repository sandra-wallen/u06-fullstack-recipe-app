import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  endpoint: string = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  generateHttpHeaders(token: string | null) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return headers;
  }

  getLists(token: string | null): Observable<any> {

    return this.http.get<any>(`${this.endpoint}/recipe-lists`, { headers: this.generateHttpHeaders(token) });
  }

  getList(token: string | null, id: string): Observable<any> {

    return this.http.get<any>(`${this.endpoint}/recipe-list/${id}`, { headers: this.generateHttpHeaders(token) });
  }

  createList(token: string | null, title: string): Observable<any> {

    return this.http.post<any>(`${this.endpoint}/recipe-lists/create`, { "title": title }, { headers: this.generateHttpHeaders(token) });
  }

  renameList(token: string | null, listId: string, title: string): Observable<any> {

    return this.http.patch<any>(`${this.endpoint}/recipe-list/${listId}/rename`, { "title": title }, { headers: this.generateHttpHeaders(token) });
  }

  deleteList(token: string | null, listId: string): Observable<any> {

    return this.http.delete<any>(`${this.endpoint}/recipe-list/${listId}/delete`, { headers: this.generateHttpHeaders(token) });
  }

  addRecipeToList(listId: string, recipeId: string | undefined, token: string | null): Observable<any> {

    return this.http.patch<any>(`${this.endpoint}/recipe-list/${listId}/add-recipe`, { "recipeId": recipeId }, { headers: this.generateHttpHeaders(token) });
  }

  removeRecipeFromList(token: string | null, listId: string, recipeId: string): Observable<any> {

    return this.http.patch<any>(`${this.endpoint}/recipe-list/${listId}/remove-recipe`, { "recipeId": recipeId }, { headers: this.generateHttpHeaders(token) });
  }

}
