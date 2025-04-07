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
const { allIngredients, allAppliances, allUstensils } =
  getFiltersElements(recipes);

// Remplir les filtres avec les listes correspondantes
fillFilters(allIngredients, filterIngredients);
fillFilters(allAppliances, filterAppliances);
fillFilters(allUstensils, filterUstensils);

function fillFilters(filterElements, filterElementsContainer) {
  filterElements.forEach((el) => {
    const filterItem = document.createElement("div");
    filterItem.textContent = el;
    filterElementsContainer.appendChild(filterItem);
  });
}

function getFiltersElements(recipes) {
  // Set uniques pour éviter les doublons
  const allIngredients = [
    ...new Set(
      recipes.flatMap((recipe) =>
        recipe.ingredients.map((ing) => capitalizeFirstLetter(ing.ingredient))
      )
    ),
  ];

  console.log(allIngredients);

  const allAppliances = [
    ...new Set(
      recipes.map((recipe) => capitalizeFirstLetter(recipe.appliance))
    ),
  ];

  console.log(allAppliances);

  const allUstensils = [
    ...new Set(
      recipes.flatMap((recipe) =>
        recipe.ustensils.map((ust) => capitalizeFirstLetter(ust))
      )
    ),
  ];

  console.log(allUstensils);

  return { allIngredients, allAppliances, allUstensils };
}
