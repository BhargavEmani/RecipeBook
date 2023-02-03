import { Ingrediants } from './ingrediants.model';
import { Recipe } from './../recipes/recipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient) { }

  storeRecipes(recipe: Recipe[]): Observable<any> {
    return this.http.put('https://recipbook-2023-default-rtdb.firebaseio.com/recipes.json', recipe)
  }

  getRecipes(): Observable<any> {
    return this.http.get<Recipe[]>('https://recipbook-2023-default-rtdb.firebaseio.com/recipes.json').pipe(
      map(recipes => {
        return recipes.map(recipes => {
          return {
            ...recipes, ingrediants: recipes.ingrediants ? recipes.ingrediants : []
          }
        })
      })
    )
  }

  storeIngrediants(ingrediants: Ingrediants[]): Observable<any> {
    return this.http.put('https://ingrediants-2023-default-rtdb.firebaseio.com/ingrediants.json', ingrediants)
  }

  getIngrediants(): Observable<any> {
    return this.http.get<Ingrediants[]>('https://ingrediants-2023-default-rtdb.firebaseio.com/ingrediants.json')
  }

}





