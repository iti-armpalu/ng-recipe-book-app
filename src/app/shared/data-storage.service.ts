import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://ng-course-recipe-book-49043-default-rtdb.firebaseio.com/recipes.json', 
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  // Now here my idea is to return the original recipe but if that recipe doesn't have an ingredients array, to set ingredients to an empty array instead and for this, I will return a new object where I use the spread operator to copy all the properties of recipe, to copy all the existing data and then ingredients will be set equal to and now I'll add a ternary expression where I simply check whether recipe ingredients is true-ish, which it is if it is an array with zero or more elements and if that is the case, then I will set ingredients equal to recipe ingredients which means I will not change it but otherwise, I'll set it to an empty array.

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-course-recipe-book-49043-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, 
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        })
      }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      )
  }
}
