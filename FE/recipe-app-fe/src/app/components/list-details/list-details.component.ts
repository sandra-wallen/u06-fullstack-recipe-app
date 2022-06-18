import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  renameForm!: FormGroup;
  routeSub: Subscription = new Subscription;
  list!: any;
  editTitle: boolean = false;
  patchTitleErr: boolean = false;
  patchTitleErrMsg: string = '';
  deleteListErr: boolean = false;
  deleteListErrMsg: string = '';
  removeRecipeErr: boolean = false;
  removeRecipeErrMsg: string = '';

  constructor(
    private route: ActivatedRoute, 
    private recipeService: RecipeService,
    private listService: ListService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get id from url
    this.routeSub = this.route.params.subscribe(params => {
      const id = params['id'];

      const token = this.authService.getToken;
      this.listService.getList(token(), id).subscribe((data: any) => {
        // Recipe array stored as string, needs to be parsed
        const parseRecipesArr = JSON.parse(data.recipes);
        
        const recipes: { id: any; label: any; }[] = [];
        if (parseRecipesArr !== null) {
          // Iterate over each id in recipe array, make API call to Edamam with id
          parseRecipesArr.forEach((recipeId: any) => {
          
            this.recipeService.getRecipe(recipeId).subscribe((recipeData: any) => {
              recipes.push({
                id: recipeId,
                label: recipeData.recipe.label
              })
            })
          })
        }
      
        this.list = {...data, recipes: recipes};
      })
    })

    this.renameForm = new FormGroup({
      title: new FormControl('')
    })
  }

  // Show edit title form
  onEditToggle(): void {
    this.editTitle = !this.editTitle;
  }

  onRenameList(event: Event): void {
    event.preventDefault;
    const newTitle = this.renameForm.value.title;

    const token = this.authService.getToken;
    this.listService.renameList(token(), this.list.id, newTitle)
      .subscribe({
        next: res => {
          this.list.title = res.title;
          this.editTitle = false;
        },
        error: err => {
          this.patchTitleErr = true;
          this.patchTitleErrMsg = err.error.message;
        }
      })
  }

  onDeleteList(event: Event): void {
    event.preventDefault;

    const token = this.authService.getToken;
    this.listService.deleteList(token(), this.list.id)
      .subscribe({
        next: res => {
          this.router.navigate(['/lists']);
        },
        error: err => {
          this.deleteListErr = true;
          this.deleteListErrMsg = err.error.message;
        }
      })
  }

  onRemoveRecipe(event: Event, id: string): void {
    event.preventDefault;
    
    const token = this.authService.getToken;
    this.listService.removeRecipeFromList(token(), this.list.id, id)
      .subscribe({
        next: res => {
          const filteredRecipeArr = this.list.recipes.filter((recipe: any) => recipe.id !== id);
          this.list.recipes = filteredRecipeArr;
        },
        error: err => {
          // Set error bool to true -> render message in template
          this.removeRecipeErr = true;
          this.removeRecipeErrMsg = err.error.message;
        }
      })
  }

  // Unsubscribe to route when component dismounts
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

}
