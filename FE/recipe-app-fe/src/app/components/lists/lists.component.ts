import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { ListService } from 'src/app/shared/list.service';
import { RecipeService } from 'src/app/shared/recipe.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  form!: FormGroup;
  lists!: any;
  getListsErr: boolean = false;
  getListsErrMsg: string = '';
  postListErr: boolean = false;
  postListErrMsg: string = '';

  constructor(
    private authService: AuthService, 
    private listService: ListService,
    private router: Router
  ) { }

  ngOnInit(): void {

    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }

    const token = this.authService.getToken;
    this.listService.getLists(token()).subscribe({
      next: res => {
        this.lists = res;
      },
      error: err => {
        if (err.status === 404) {
          this.getListsErr = true;
          this.getListsErrMsg = err.error.message;
        }
      }
    })

    this.form = new FormGroup({
      title: new FormControl('')
    })
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const title = this.form.value.title;

    const token = this.authService.getToken;
    this.listService.createList(token(), title).subscribe({
      next: res => {
        this.lists = [...this.lists, res];
      },
      error: err => {
        this.postListErr = true;
        this.postListErrMsg = err.error.message;
      }
    })
  }

  recipesArrCount(arr: string): Array<string> {
    return arr !== null ? JSON.parse(arr).length : '0';
  }

}
