import { getFilterElements } from "/src/js/components/Filters.js";
import { recipes } from "/src/data/recipes.js";
import {
  displayRecipeCards,
  displayFilterElements,
} from "/src/js/views/render.js";

// Récupérer les listes d'éléments
const { allIngredients, allAppliances, allUstensils } =
  getFilterElements(recipes);

// Afficher les recettes et les filtres
displayRecipeCards(recipes);
displayFilterElements(
  allIngredients,
  document.querySelector(".filtre-elements.filtre-ingredients"),
  document.querySelector(".selected-elements.filtre-ingredients"),
  document.querySelector(".filtre-area.ingredients")
);
displayFilterElements(
  allAppliances,
  document.querySelector(".filtre-elements.filtre-appliances"),
  document.querySelector(".selected-elements.filtre-appliances"),
  document.querySelector(".filtre-area.appliances")
);

displayFilterElements(
  allUstensils,
  document.querySelector(".filtre-elements.filtre-ustensils"),
  document.querySelector(".selected-elements.filtre-ustensils"),
  document.querySelector(".filtre-area.ustensils")
);
