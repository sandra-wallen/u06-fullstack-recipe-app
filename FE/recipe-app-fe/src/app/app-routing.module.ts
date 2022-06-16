import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RegisterComponent } from './components/register/register.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { AuthGuard } from './shared/auth.guard';
import { ListsComponent } from './components/lists/lists.component';
import { ListDetailsComponent } from './components/list-details/list-details.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard]},
  {path: 'recipes/:id', component: RecipeDetailsComponent},
  {path: 'lists', component: ListsComponent},
  {path: 'lists/:id', component: ListDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
