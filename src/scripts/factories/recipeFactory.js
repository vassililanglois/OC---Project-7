import RecipeModel from "../models/recipeModel.js";

export function recipeFactory(recipeData) {
  return new RecipeModel(recipeData);
}
