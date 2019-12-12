import {Injectable} from '@angular/core';
import {AppConnect} from "./AppConnect";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Recipe} from "./recipe";
import {AuthenticationService} from "./authenticationService";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesUrl = `${AppConnect.getSiteUrl()}/recipes`;

  constructor(private http: HttpClient) {
  }

  createRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.recipesUrl, recipe, AuthenticationService.createHeaders());
  }

  getRecipeById(id): Observable<Recipe> {
    return this.http.get<Recipe>(this.recipesUrl + `/${id}`, AuthenticationService.createHeaders());
  }

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl, AuthenticationService.createHeaders());
  }

}
