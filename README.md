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

## Things I would like to clearify
I started this project in April and worked a bit with it, I pretty much finished the backend. But when I started writing the frontend with Angular and TypeScript I got stuck all the time and when the project was due I wasn't even near finished. I revisited this project in June after we had worked on our team project u08 using React and TypeScript in the frontend. Writing TypeScript together with React, a framework which I'm much more comfortabel with, this really helped me proceed with my Angular project. Things went much more smoothly this time and I only encountered smaller obstacles and I eventually got the hang of how things are linked together. 

There are some places in the code where I am using type any. Mainly I had some issues with creating an interface for the api response when making calls to lists endpoints. I've used a seperate api response interface when sending requests for user, this works fine, but I couldn't make it work with the one for lists. So after some time I decided to type the response as any. On the subject, TypeScript is very new to me and I feel like the actual usage of TypeScript in my project varies much. At some places I type parameters properly and at some other they are typed as any.

There are some things about observables and subscriptions to those that I'm not completely certain of, like when should I unsubsribe to an observable and what does the unsubscription actually do?

The recipe data is fetched from Edamam api

## Things I would have improved if I had more time
- Use TypeScript and type things more strictly and stick to a pattern for this across the whole project
- Use interfaces more
- Improve the error handling and how it's shown to the user
- Show confirmations visually to the user (when a form was submitted with success etc.)
- Look into how the nav bar can update real time when localStorage updates. Right now sometimes you have to reload the site to generate the right links in the nav.


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
