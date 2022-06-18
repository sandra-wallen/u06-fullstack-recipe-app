import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { ListService } from 'src/app/shared/list.service';
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
  addRecipeToListErr: boolean = false;
  addRecipeToListErrMsg: string = '';
  getListsErr: boolean = false;
  getListsErrMsg: string = '';
  
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private recipeService: RecipeService, 
    private listService: ListService, 
    private authService: AuthService
  ) { 

  }

  ngOnInit(): void {

    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }

    this.routeSub = this.route.params.subscribe(params => {
      const id = params['id'];

      this.setRecipe(id);
    })

    this.form = new FormGroup({
      recipeList: new FormControl('') 
    });

    const token = this.authService.getToken;
    this.listService.getLists(token()).subscribe({
      next: res => {
        this.lists = res;
      },
      error: err => {
        this.getListsErr = true;
        if (err.status === 404) {
          this.getListsErrMsg = 'No lists found';
        } else {
          this.getListsErrMsg = 'Could not load lists';
        }
      }
    })
  }

  setRecipe(id: string): void {
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
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    const listId = this.form.value.recipeList;

    const token = this.authService.getToken;
    this.listService.addRecipeToList(listId, this.recipe.id, token())
      .subscribe({
        error: err => {
          this.addRecipeToListErr = true;
          this.addRecipeToListErrMsg = 'Recipe could not be saved';
        }
      })
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

}
