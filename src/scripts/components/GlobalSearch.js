import { getSelectedFilters, updateFilters } from "./Filters.js";
import { recipes as allRecipes } from "../../data/recipes.js";
import {
  displayErrorMessage,
  eraseErrorMessage,
} from "../utils/noRecipeFound.js";
import { clearRecipes } from "../utils/clearRecipes.js";
import { displayRecipeCards, setNumberOfRecipes } from "../pages/index.js";

export const globalSearchInput = document.querySelector("#global-search");

globalSearchInput.addEventListener("keyup", () => {
  searchRecipes();
});

// Vérifie si la recherche contient au moins 3 caractères
export function isKeywordValid(keyword) {
  return keyword.length >= 3;
}

// Fonciton qui gère la recherhce globale
export function searchRecipes() {
  const keyword = globalSearchInput.value.trim().toLowerCase();

  // Récupérer les listes d'éléments sélectionnés
  const { selectedIngredients, selectedAppliances, selectedUstensils } =
    getSelectedFilters();

  // ------ FILTRE RECETTES VIA INPUT DE LA RECHERCHE GLOBALE ------
  let recipesListToDisplay = allRecipes.filter((recipe) => {
    // Si aucun mot-clé, toutes les recettes sont valides
    if (!keyword || keyword.length < 3) {
      return true;
    }

    // Vérifie si le mot-clé correspond au titre, à la description ou aux ingrédients
    const matchesTitleOrDescription =
      recipe.name.toLowerCase().includes(keyword) ||
      recipe.description.toLowerCase().includes(keyword);

    const matchesIngredients = recipe.ingredients.some(({ ingredient }) =>
      ingredient.toLowerCase().includes(keyword)
    );

    return matchesTitleOrDescription || matchesIngredients;
  });

  // ------ GESTION DES MESSAGES D'ERREUR ------
  if (recipesListToDisplay.length === 0) {
    clearRecipes(); // Effacer toutes les recettes affichées
    displayErrorMessage(keyword); // Afficher le message d'erreur
  } else {
    eraseErrorMessage(); // Effacer le message d'erreur
    clearRecipes(); // Effacer les recettes précédentes
    displayRecipeCards(recipesListToDisplay); // Afficher les nouvelles recettes
    setNumberOfRecipes(recipesListToDisplay); // Mettre à jour le nombre de recettes affichées
    updateFilters(recipesListToDisplay); // Mettre à jour les filtres
  }
}
