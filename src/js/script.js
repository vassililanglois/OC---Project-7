import {
  sectionRecettes,
  createRecipeCard,
  clearRecipes,
} from "/src/js/components/RecipeCard.js";
import { recipes } from "/src/data/recipes.js";
import { globalSearch, globalSearchInput } from "./components/GlobalSearch.js";
import { searchByFilters, updateFilters } from "./components/Filters.js";
import {
  displayErrorMessage,
  eraseErrorMessage,
} from "./utils/noRecipeFound.js";

// Fonction pour afficher les cartes de recettes
export function displayRecipeCards(recipes) {
  clearRecipes();
  recipes.forEach((recipe) => {
    const card = createRecipeCard(recipe);
    sectionRecettes.appendChild(card);
  });
}

// Fonction pour mettre à jour le nombre de recettes affichées
export function setNumberOfRecipes(list) {
  const numberOfRecipes = document.querySelector(".nombre-recettes");
  numberOfRecipes.textContent = `${list.length} recettes`;
}

function getFilteredRecipes(keyword) {
  // Obtenir les recettes filtrées par les filtres
  const recipesByFilters = searchByFilters();

  // Si aucun mot-clé n'est fourni, retourner uniquement les recettes filtrées par les filtres
  if (!keyword || keyword.trim().length === 0) {
    return recipesByFilters;
  }

  // Obtenir les recettes filtrées par la recherche globale
  const recipesBySearch = globalSearch(keyword);

  // Retourner l'intersection des deux listes (recettes correspondant aux deux critères)
  return recipesByFilters.filter((recipe) =>
    recipesBySearch.some((r) => r.id === recipe.id)
  );
}

// Fonction pour gérer l'affichage des recettes
function renderRecipes() {
  const keyword = globalSearchInput.value.trim().toLowerCase(); // Récupérer le mot-clé de la recherche globale
  const filteredRecipes = getFilteredRecipes(keyword); // Obtenir les recettes filtrées

  if (filteredRecipes.length === 0) {
    displayErrorMessage(keyword); // Afficher un message d'erreur si aucune recette n'est trouvée
  } else {
    eraseErrorMessage(); // Effacer le message d'erreur
    displayRecipeCards(filteredRecipes); // Afficher les recettes filtrées
    setNumberOfRecipes(filteredRecipes); // Mettre à jour le nombre de recettes affichées
    updateFilters(filteredRecipes); // Mettre à jour les filtres en fonction des recettes affichées
  }
}

// Initialiser l'affichage des recettes
function initializeRecipes() {
  displayRecipeCards(recipes); // Afficher toutes les recettes au chargement
  setNumberOfRecipes(recipes); // Mettre à jour le nombre de recettes affichées
  updateFilters(recipes); // Mettre à jour les filtres avec toutes les recettes

  // Ajouter un écouteur d'événement pour la recherche globale
  globalSearchInput.addEventListener("input", renderRecipes);
}

// Appeler la fonction d'initialisation
initializeRecipes();
