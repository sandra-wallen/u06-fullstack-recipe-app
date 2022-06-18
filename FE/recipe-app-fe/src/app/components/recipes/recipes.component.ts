import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../shared/recipe.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Hit, Recipe } from '../../shared/recipe';
import { RecipesApiResponse } from '../../shared/recipe';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  
  form!: FormGroup;

  recipes: Recipe[] = [];
  constructor(
    private recipeService: RecipeService, 
    private authService: AuthService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }

    this.recipeService.getAllRecipes().subscribe((data: RecipesApiResponse) => this.setRecipes(data));

    this.form = new FormGroup({
      mealType: new FormControl(''),
      vegan: new FormControl(''),
      glutenFree: new FormControl(''),
      peanutFree: new FormControl('')
    });
  }

  onSubmit(): void {
     
    const mealType = this.form.value.mealType;
    const vegan = this.form.value.vegan;
    const glutenFree = this.form.value.glutenFree;
    const peanutFree = this.form.value.peanutFree;

    const customQuery = `${mealType ? '&mealType=' + mealType : ''}${vegan ? '&health=vegan' : ''}${glutenFree ? '&health=gluten-free' : ''}${peanutFree ? '&health=peanut-free' : ''}`;
    this.recipeService.getAllRecipes(customQuery).subscribe((data: RecipesApiResponse) => this.setRecipes(data));
  }

  setRecipes(data: RecipesApiResponse): void {

    const recipes: Recipe[] = [];
      data.hits.map((val: any) => {

        const recipeId = val.recipe.uri.split('#recipe_').pop();

        const recipe: Recipe = {
          id: recipeId,
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
  }

}
