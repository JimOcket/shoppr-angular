import {Injectable} from '@angular/core';
import {AppConnect} from './AppConnect';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Recipe} from './recipe';
import {AuthenticationService} from './authenticationService';
import {Product} from './product';

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
    return this.http.get<Recipe>(this.recipesUrl + `/${id}`);
  }

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl);
  }

  searchItems(recipes: Recipe[], term: string) {
    return recipes.filter(item => item.name.toLowerCase().includes(term.toLowerCase()));
  }

  deleteRecipe(id: number) {
    const headers = AuthenticationService.createHeaders();
    return this.http.delete<Recipe[]>(`${this.recipesUrl}/${id}/delete`, headers);
  }

  removeProduct(recipeId: number, entryId: number) {
    const headers = AuthenticationService.createHeaders();
    return this.http.put<Recipe>(`${this.recipesUrl}/${recipeId}/remove/${entryId}`, {}, headers);
  }

  addProduct(value: string) {
    const headers = AuthenticationService.createHeaders();
    return this.http.put<Product>(`${AppConnect.getSiteUrl()}/products?name=${value}`, {}, headers).subscribe();
  }
}
