import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes(); 
  }

    // On click navigate to the new route - for this use Router method "navigate" and pass keyword "new" as set in AppRouting
  // Also you need to inform the router about our current route, hence ActivatedRoute
  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

}
