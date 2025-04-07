import { recipes } from "../../data/recipes.js";

export const globalSearchInput = document.querySelector("#global-search");

// Vérifie si la recherche contient au moins 3 caractères
export function isKeywordValid(keyword) {
  return keyword.length >= 3;
}

// Recherche dans le titre, la description et les ingrédients
export function globalSearch(keyword) {
  const filteredRecipes = [];

  recipes.forEach((recipe) => {
    const title = recipe.name.toLowerCase();
    const description = recipe.description.toLowerCase();
    const ingredients = recipe.ingredients
      .map((ing) => ing.ingredient.toLowerCase())
      .join(" ");

    if (
      title.includes(keyword) ||
      description.includes(keyword) ||
      ingredients.includes(keyword)
    ) {
      filteredRecipes.push(recipe);
    }
  });

  return filteredRecipes;
}
