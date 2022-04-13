import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../shared/recipe.service';
import { Hit, Recipe } from '../../shared/recipe';
import { RecipesApiResponse } from '../../shared/recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  recipes: Recipe[] = [];
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe((data: RecipesApiResponse) => {

      const recipes: Recipe[] = [];
      data.hits.map((val: any) => {
        const recipe: Recipe = {
          label: val.recipe.label,
          image: val.recipe.image,
          cautions: val.recipe.cautions,
          dietLabels: val.recipe.dietLabels,
          ingredientLines: val.recipe.ingredientLines,
          totalTime: val.recipe.totalTime,
          cuisineType: val.recipe.cuisineType,
          dishType: val.recipe.dishType
        } 
        recipes.push(recipe)
      })
      this.recipes = recipes;

      
      console.log(this.recipes);
    })
  }

}
