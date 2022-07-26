import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe', 
      'This is simply a test', 
      'https://images.unsplash.com/photo-1524859330668-c357331384f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80'
      ),
    new Recipe(
      'Another Recipe', 
      'This is simply a test', 
      'https://images.unsplash.com/photo-1524859330668-c357331384f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80'
      ),
    new Recipe(
      'One More Recipe', 
      'This is simply a test', 
      'https://images.unsplash.com/photo-1524859330668-c357331384f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80'
      ),
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
