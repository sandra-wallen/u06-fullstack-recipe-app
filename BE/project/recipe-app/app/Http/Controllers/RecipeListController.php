<?php

namespace App\Http\Controllers;

use App\Models\RecipeList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecipeListController extends Controller
{
    public function getAllLists() 
    {
        $lists = RecipeList::where('userId', Auth::user()->id)->get();

        if ($lists == null || count($lists) == 0) {

            return response([
                "message" => "No lists found"
            ], 404);

        } else {
            return response($lists, 200);    
        }
    }

    public function getList($id) 
    {
        $list = RecipeList::find($id);
        
        if ($list == null) {

            return response([
                "message" => "List not found"
            ], 404);

        } else {
            return response($list, 200);
        }
        
    }

    public function createList(Request $request) 
    {
        $fields = $request->validate([
            'title' => 'required|string',
        ]);

        $list = RecipeList::create([
            'title' => $fields['title'],
            'userId' => Auth::user()->id
        ]);

        return response($list, 200);
    }

    public function renameList(Request $request, $id) 
    {
        $fields = $request->validate([
            'title' => 'required|string'
        ]);

        $list = RecipeList::find($id);

        if ($list == null) {

            return response([
                "message" => "List not found"
            ], 404);

        } else {

            $list->title = $fields['title'];
            $list->update();

            return response($list, 200);

        }
    }

    public function addRecipe(Request $request, $id) 
    {
        $fields = $request->validate([
            'recipeId' => 'required|string'
        ]);

        $list = RecipeList::find($id);

        $recipes = [];

        if ($list->recipes != null) {

            $recipes = json_decode($list->recipes);

        }

        if (in_array($fields['recipeId'], $recipes)) {
            
            return response([
                "message" => "Recipe already exists in list"
            ], 409);

        } else {
            
            array_push($recipes, $fields['recipeId']);

            $list->recipes = json_encode($recipes);
            $list->update();
    
            return response($list, 200);

        }
    }

    public function removeRecipe(Request $request, $id) 
    {
        $fields = $request->validate([
            'recipeId' => 'required|string'
        ]);

        $list = RecipeList::find($id);

        if ($list->recipes != null) {

            $recipes = [];

            if (!in_array($fields['recipeId'], json_decode($list->recipes))) {

                return response([
                    "message" => "Recipe doesn't exist in list"
                ], 404);

            } else {

                foreach (json_decode($list->recipes) as $recipeId) {
                    if ($fields['recipeId'] != $recipeId) {
                        array_push($recipes, $recipeId);
                    }
                }

                $list->recipes = json_encode($recipes);
                $list->update();
        
                return response($list, 200);
            }
        }
    }

    public function deleteList($id) 
    {
        $list = RecipeList::find($id);

        if ($list == null) {

            return response([
                "message" => "List not found"
            ], 404);

        } else {

            $list->delete();

            return response([
                "message" => "List was deleted"
            ], 200);
            
        }
    }
}
