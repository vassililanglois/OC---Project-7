import { recipes } from "../../data/recipes.js";
import { displayRecipeCards, setNumberOfRecipes } from "../script.js";
import {
  displayErrorMessage,
  eraseErrorMessage,
} from "../utils/noRecipeFound.js";
import { updateFilters } from "./Filters.js";
import { clearRecipes } from "./RecipeCard.js";

export const globalSearchInput = document.querySelector("#global-search");

// Vérifie si la recherche contient au moins 3 caractères
export function isKeywordValid(keyword) {
  return keyword.length >= 3;
}

export function globalSearch(keyword) {
  // Si aucun mot-clé, retourner toutes les recettes
  if (!keyword || keyword.trim().length === 0) {
    return recipes;
  }

  // Recherche dans le titre, la description et les ingrédients
  return recipes.filter((recipe) => {
    const title = recipe.name.toLowerCase();
    const description = recipe.description.toLowerCase();
    const ingredients = recipe.ingredients
      .map((ing) => ing.ingredient.toLowerCase())
      .join(" ");

    return (
      title.includes(keyword.toLowerCase()) ||
      description.includes(keyword.toLowerCase()) ||
      ingredients.includes(keyword.toLowerCase())
    );
  });
}

// Gérer la recherche globale
function handleGlobalSearch() {
  const keyword = globalSearchInput.value.trim().toLowerCase();

  if (keyword.length === 0) {
    displayRecipeCards(recipes);
    setNumberOfRecipes(recipes);
    eraseErrorMessage();
    updateFilters(recipes);
  } else if (isKeywordValid(keyword)) {
    const filteredRecipes = globalSearch(keyword);
    displayRecipeCards(filteredRecipes);
    setNumberOfRecipes(filteredRecipes);
    updateFilters(filteredRecipes);

    if (filteredRecipes.length === 0) {
      displayErrorMessage(keyword);
    } else {
      eraseErrorMessage();
    }
  } else {
    setNumberOfRecipes([]);
    updateFilters([]);
    eraseErrorMessage();
  }
}

// Ajouter un écouteur d'événement pour la barre de recherche
globalSearchInput.addEventListener("input", handleGlobalSearch);
