<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\RecipeListController;
use App\Models\RecipeList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/recipe-lists', [RecipeListController::class, 'getAllLists']);
    Route::get('/recipe-list/{id}', [RecipeListController::class, 'getList']);
    Route::post('/recipe-lists/create', [RecipeListController::class, 'createList']);
    Route::patch('/recipe-list/{id}/rename', [RecipeListController::class, 'renameList']);
    Route::patch('/recipe-list/{id}/add-recipe', [RecipeListController::class, 'addRecipe']);
    Route::patch('/recipe-list/{id}/remove-recipe', [RecipeListController::class, "removeRecipe"]);
    Route::delete('/recipe-list/{id}/delete', [RecipeListController::class, 'deleteList']);
});