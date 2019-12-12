import {Injectable} from '@angular/core';
import {AppConnect} from "./AppConnect";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Recipe} from "./recipe";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesUrl = `${AppConnect.getSiteUrl()}/recipes`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }),
  };

  constructor(private http: HttpClient) {
  }

  createRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.recipesUrl, recipe, this.httpOptions);
  }

}
