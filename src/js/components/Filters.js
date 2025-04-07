import { capitalizeFirstLetter } from "/src/js/utils/formatData.js";
import { recipes } from "/src/data/recipes.js";
import { createTag } from "./FiltersTags.js";

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

export function fillFilters(filterElements, filterElementsContainer) {
  console.log("Éléments à afficher :", filterElements); // Vérifiez le contenu de la liste
  filterElementsContainer.innerHTML = ""; // Réinitialiser le container

  filterElements.forEach((el) => {
    const filterItem = document.createElement("div");
    filterItem.textContent = el;
    filterItem.classList.add("filter-item"); // Ajouter une classe pour styliser si nécessaire

    // Ajouter un gestionnaire de clic pour créer un tag
    filterItem.addEventListener("click", () => {
      const tagContainer = document.querySelector(".filter-tags");

      // Vérifier si le tag existe déjà
      const tagExists = Array.from(tagContainer.children).some(
        (tag) => tag.textContent.trim() === el
      );

      if (!tagExists) {
        createTag(el); // Appeler la fonction createTag avec l'élément
      }
    });

    filterElementsContainer.appendChild(filterItem); // Ajouter l'élément au container
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

const filterItems = document.querySelectorAll(".filter-elements div");

filterItems.forEach((item) => {});
