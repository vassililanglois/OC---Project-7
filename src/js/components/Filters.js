import { capitalizeFirstLetter } from "/src/js/utils/formatData.js";
import { recipes } from "/src/data/recipes.js";

// Récuperer les containers qui accueillent les options de chaque filtre
const filterIngredients = document.querySelector(
  ".filtre-elements.filtre-ingredients"
);
const filterAppliances = document.querySelector(
  ".filtre-elements.filtre-appliances"
);
const filterUstensils = document.querySelector(
  ".filtre-elements.filtre-ustensils"
);

// Récupérer les listes des filtres
let { allIngredients, allAppliances, allUstensils } =
  getFiltersElements(recipes);

// Remplir les filtres avec les listes correspondantes
fillFilters(allIngredients, filterIngredients);
fillFilters(allAppliances, filterAppliances);
fillFilters(allUstensils, filterUstensils);

// Fonction pour remplir les filtres
export function fillFilters(filterElements, filterElementsContainer) {
  filterElementsContainer.innerHTML = ""; // Réinitialiser le container
  filterElements.forEach((el) => {
    const filterItem = document.createElement("div");
    filterItem.textContent = el;
    filterElementsContainer.appendChild(filterItem);
  });
}

// Fonction pour récupérer les éléments des filtres
export function getFiltersElements(recipes) {
  // Set uniques pour éviter les doublons
  const allIngredients = [
    ...new Set(
      recipes.flatMap((recipe) =>
        recipe.ingredients.map((ing) => capitalizeFirstLetter(ing.ingredient))
      )
    ),
  ];

  const allAppliances = [
    ...new Set(
      recipes.map((recipe) => capitalizeFirstLetter(recipe.appliance))
    ),
  ];

  const allUstensils = [
    ...new Set(
      recipes.flatMap((recipe) =>
        recipe.ustensils.map((ust) => capitalizeFirstLetter(ust))
      )
    ),
  ];

  return { allIngredients, allAppliances, allUstensils };
}

// Fonction pour actualiser les filtres en fonction des recettes filtrées
export function updateFilters(filteredRecipes) {
  const { allIngredients, allAppliances, allUstensils } =
    getFiltersElements(filteredRecipes);

  // Mettre à jour les filtres affichés
  fillFilters(allIngredients, filterIngredients);
  fillFilters(allAppliances, filterAppliances);
  fillFilters(allUstensils, filterUstensils);
}
