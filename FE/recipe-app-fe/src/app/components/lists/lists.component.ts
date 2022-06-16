import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { ListService } from 'src/app/shared/list.service';
import { RecipeService } from 'src/app/shared/recipe.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  lists!: any;

  constructor(
    private authService: AuthService, 
    private recipeService: RecipeService, 
    private listService: ListService
  ) { }

  ngOnInit(): void {

    const token = this.authService.getToken;
    this.listService.getLists(token()).subscribe((data: any) => {
      this.lists = data;
      console.log(this.lists)
    })
  }

  recipesArrCount(arr: string): Array<string> {
    const recipes = JSON.parse(arr);
    return recipes !== null ? recipes.length : '0';
  }

}
