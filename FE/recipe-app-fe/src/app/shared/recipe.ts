export interface Recipe {
  label: string;
  image: string;
  cautions: string[];
  dietLabels: string[];
  ingredientLines: string[];
  totalTime: string;
  cuisineType: string[];
  dishType: string[];
}

export interface Hit {
  recipes: Recipe[];
}

export interface RecipesApiResponse {
  hits: Hit[];
}