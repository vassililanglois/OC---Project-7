import { fillFilters } from "./Filters.js";
import { recipes as allRecipes } from "../../data/recipes.js";
import {
  displayErrorMessage,
  eraseErrorMessage,
} from "../utils/noRecipeFound.js";
import { clearRecipes } from "../utils/clearRecipes.js";
import { displayRecipes, setNumberOfRecipes } from "../pages/index.js";
import { filterRecipesWithTags } from "./FiltersTags.js";

export const globalSearchInput = document.querySelector("#global-search");

function filterRecipesWithGlobalInput(recipesTofilter, inputValue) {
  const inputValueFormatted = inputValue.trim().toLowerCase();
  const recipesListToDisplay = [];

  for (const recipe of recipesTofilter) {
    let recipeIsMatching = false;

    // Vérifie le nom et la description
    if (
      recipe.name.toLowerCase().includes(inputValueFormatted) ||
      recipe.description.toLowerCase().includes(inputValueFormatted)
    ) {
      recipeIsMatching = true;
    }

    // Vérifie les ingrédients
    for (const ingredientObj of recipe.ingredients) {
      const ingredientNameFormatted = ingredientObj.ingredient.toLowerCase();
      if (ingredientNameFormatted.includes(inputValueFormatted)) {
        recipeIsMatching = true;
        break; // On peut sortir dès qu'un ingrédient correspond
      }
    }

    if (recipeIsMatching) {
      recipesListToDisplay.push(recipe);
    }
  }

  return recipesListToDisplay;
}

export function searchRecipes() {
  // Réinitialisation de la liste de recettes
  let recipesListToDisplay = [];
  let globalInputValue;

  // Pour chaque filtre, lister les tags sélectionnés
  const tagsList = Array.from(
    document.querySelectorAll(".filter-tags .filtre-element-tag")
  );

  // ------ FILTRE RECETTES VIA INPUT DE LA RECHERCHE GLOBALE ------
  // Si une recherche dans input global
  if (globalSearchInput.value.length >= 3) {
    globalInputValue = globalSearchInput.value;

    recipesListToDisplay = filterRecipesWithGlobalInput(
      allRecipes,
      globalInputValue
    );
  } else {
    recipesListToDisplay = allRecipes;
  }

  recipesListToDisplay.length === 0
    ? displayErrorMessage(globalInputValue)
    : eraseErrorMessage();

  // ------ FILTRE RECETTES VIA LES TAGS ------
  // Si un tag est utilisé dans l'un des filtre
  if (tagsList.length > 0) {
    recipesListToDisplay = filterRecipesWithTags(recipesListToDisplay);
  }

  // Si aucun tag et aucune recherche globale => tout afficher
  if (globalSearchInput.value.length === 0 && tagsList.length === 0) {
    clearRecipes();
    fillFilters(allRecipes);
    displayRecipes(allRecipes);
  } else {
    clearRecipes();
    fillFilters(recipesListToDisplay);
    displayRecipes(recipesListToDisplay);
  }
}

globalSearchInput.addEventListener("input", () => {
  searchRecipes();
});
