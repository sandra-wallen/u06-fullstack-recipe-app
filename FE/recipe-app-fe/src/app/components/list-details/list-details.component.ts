import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { ListService } from 'src/app/shared/list.service';
import { RecipeService } from 'src/app/shared/recipe.service';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss']
})
export class ListDetailsComponent implements OnInit {

  routeSub: Subscription = new Subscription;
  list!: any;

  constructor(
    private route: ActivatedRoute, 
    private recipeService: RecipeService,
    private listService: ListService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.routeSub = this.route.params.subscribe(params => {
      const id = params['id'];

      const token = this.authService.getToken;
      this.listService.getList(token(), id).subscribe((data: any) => {
        const parseRecipesArr = JSON.parse(data.recipes);
        
        const recipes: { id: any; label: any; }[] = [];
        
        parseRecipesArr.forEach((recipeId: any) => {
          
          this.recipeService.getRecipe(recipeId).subscribe((recipeData: any) => {
            console.log(recipeData)
            recipes.push({
              id: recipeId,
              label: recipeData.recipe.label
            })
          })
        })

        const printRecipes = () => {
          console.log(recipes)
        }

        setTimeout(printRecipes, 10000)
        console.log(recipes)
        this.list = {...data, recipes: recipes};
        console.log(this.list);
      })
    })
  }

}
