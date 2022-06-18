# u06 Fullstack Recipe App
## About the project
This project was created as part of the JavaScript course at Chas Academy. The assigment was to build a recipe app using Angular and TypeScript in FE and PHP Laravel in BE. The recipe data should be retrieved from an external API.

## Assignment requirements
* The user should be presented with a list of recipes
* The user should be able to filter recipes on meal type and other preferences
* The user should be able to click on a recipe to see a detailed page
* The user should be able to save a recipe to a list
* The user should be able to see all saved recipes (in an own route)
* The user should be able to delete recipes from a list

## Things I would like to clearify/things I would have improved if I had more time

### API endpoints

` /api/register ` **POST** register. Body requires "username", "fullName", "email" and "password"

` /api/login ` **POST** login. Body requires "email" and "password"

` /api/recipe-lists ` **GET** all recipe lists of a user. Include bearer token in headers

` /api/recipe-list/:id ` **GET** specific recipe list of a user. Include bearer token in headers and list id in url

` /api/recipe-lists/create `  **POST** a recipe list. Include bearer token in headers

` /api/recipe-list/:id/rename ` **PATCH** a recipe list and update title. Include bearer token in headers, list id in url and new title as body with key "title"

` /api/recipe-list/:id/add-recipe ` **PATCH** a recipe list and add a recipe to recipes array. Include bearer token in headers, list id in url and recipe id as body with key "recipeId"

` /api/recipe-list/:id/remove-recipe ` **PATCH** a recipe list and remove a recipe. Include bearer token in headers, list id in url and recipe id as body with key "recipeId"

` /api/recipe-list/:id/delete ` **DELETE** a recipe list. Include bearer token in headers and list id in url 
