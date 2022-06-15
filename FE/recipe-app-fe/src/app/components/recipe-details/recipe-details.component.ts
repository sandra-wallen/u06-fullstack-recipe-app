import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { Recipe, SingleRecipeApiResponse } from 'src/app/shared/recipe';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Lists } from 'src/app/shared/user';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {

  form!: FormGroup;
  routeSub: Subscription = new Subscription;
  recipe!: Recipe;
  lists!: any;
  
  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private authService: AuthService) { 

  }

  ngOnInit(): void {

    this.routeSub = this.route.params.subscribe(params => {
      const id = params['id'];

      this.setRecipe(id);
    })

    this.form = new FormGroup({
      recipeList: new FormControl('') 
    });

    const token = this.authService.getToken;
    this.authService.getLists(token()).subscribe((data: any) => {
      this.lists = data;
      console.log(this.lists)
    })
  }

  setRecipe(id: string): void {
    console.log(id)
    this.recipeService.getRecipe(id).subscribe((data: any) => {
      console.log(data)
      const recipeId = data.recipe.uri.split('#recipe_').pop();

      this.recipe = {
        id: recipeId,
        label: data.recipe.label,
        image: data.recipe.image,
        cautions: data.recipe.cautions,
        dietLabels: data.recipe.dietLabels,
        ingredientLines: data.recipe.ingredientLines,
        totalTime: data.recipe.totalTime,
        cuisineType: data.recipe.cuisineType,
        dishType: data.recipe.dishType
      }
      console.log(this.recipe);
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    const listId = this.form.value.recipeList;

    const token = this.authService.getToken;
    this.authService.addRecipeToList(listId, this.recipe.id, token()).subscribe((data: any) => console.log(data))
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

}
