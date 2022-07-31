import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  // Since we store our data in Firebase database, we don't need to store this data locally anymore, but still initialize recipes property

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'A Test Recipe', 
  //     'This is simply a test', 
  //     'https://images.unsplash.com/photo-1524859330668-c357331384f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80',
  //     [
  //       new Ingredient ('Meat', 1),
  //       new Ingredient ('French Fries', 20),
  //     ]
  //   ),
  //   new Recipe(
  //     'Another Recipe', 
  //     'This is simply a test', 
  //     'https://images.unsplash.com/photo-1524859330668-c357331384f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80',
  //     [
  //       new Ingredient ('Cabbage', 2),
  //       new Ingredient ('Carrot', 3),
  //     ]
  //   ),
  //   new Recipe(
  //     'One More Recipe', 
  //     'This is simply a test', 
  //     'https://images.unsplash.com/photo-1524859330668-c357331384f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80',
  //     [
  //       new Ingredient ('Buns', 4),
  //       new Ingredient ('Meat', 4),
  //     ]
  //   ),
  // ];

  constructor(private slService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  // Slice returns a shallow copy of a portion of an array. This wa original array cannot be modified.
  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
