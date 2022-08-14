import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as RecipeActions from './recipe.actions'
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';



@Injectable()
export class RecipeEffects {

  fetchRecipes$ = createEffect(
    () => this.actions$.pipe(
      ofType(RecipeActions.fetchRecipes),
      switchMap(() => {
        return this.http.get<Recipe[]>('https://ng-course-recipe-book-49043-default-rtdb.firebaseio.com/recipes.json');
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      map(recipes => {return RecipeActions.setRecipes( {recipes} )})
    )
  );

  storeRecipes$ = createEffect(
    () => this.actions$.pipe(
      ofType(RecipeActions.storeRecipes),
      withLatestFrom(this.store.select('recipe')),
      switchMap(([actionData, recipesState]) => {
        return this.http.put('https://ng-course-recipe-book-49043-default-rtdb.firebaseio.com/recipes.json', recipesState.recipes);
      })
    ),
    { dispatch: false }
  );

  // Convention is to add a $ after Observable
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
