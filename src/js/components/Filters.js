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
    filterItem.innerHTML = `
    <p>${el}</p>
    <svg class="unselect-filter-element" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
    `;
    filterItem.classList.add("filter-item"); // Ajouter une classe pour styliser si nécessaire

    // Ajouter un gestionnaire de clic pour l'élément principal
    filterItem.addEventListener("click", () => {
      if (!filterItem.classList.contains("selected")) {
        filterItem.classList.add("selected"); // Ajouter la classe "selected"
      } else {
        filterItem.classList.remove("selected"); // Retirer la classe "selected" si déjà présente
      }

      const tagContainer = document.querySelector(".filter-tags");

      // Vérifier si le tag existe déjà
      const tagExists = Array.from(tagContainer.children).some(
        (tag) => tag.textContent.trim() === el
      );

      if (!tagExists) {
        createTag(el); // Appeler la fonction createTag avec l'élément
      }

      // Appeler getSelectedFilters pour mettre à jour les logs dynamiquement
      console.log(getSelectedFilters());
    });

    // Ajouter un gestionnaire de clic pour le SVG
    const unselectSvg = filterItem.querySelector(".unselect-filter-element");
    unselectSvg.addEventListener("click", (event) => {
      event.stopPropagation(); // Empêcher le clic de se propager au parent
      filterItem.classList.remove("selected"); // Retirer la classe "selected"

      // Supprimer le tag lié à l'élément avec animation
      const tagContainer = document.querySelector(".filter-tags");
      const tagToRemove = Array.from(tagContainer.children).find(
        (tag) => tag.textContent.trim() === el
      );
      if (tagToRemove) {
        tagToRemove.classList.add("tag-exit"); // Ajouter la classe pour l'animation de sortie

        // Supprimer le tag après la fin de l'animation
        tagToRemove.addEventListener("animationend", () => {
          if (tagToRemove.classList.contains("tag-exit")) {
            tagContainer.removeChild(tagToRemove); // Supprimer le tag du container
          }
        });
      }
    });

    filterElementsContainer.appendChild(filterItem); // Ajouter l'élément au container
  });
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

export function getSelectedFilters() {
  const selectedIngredients = Array.from(
    filterIngredients.querySelectorAll(".filter-item.selected")
  ).map((item) => item.textContent.trim());
  console.log(selectedIngredients);

  const selectedAppliances = Array.from(
    filterAppliances.querySelectorAll(".filter-item.selected")
  ).map((item) => item.textContent.trim());
  console.log(selectedAppliances);

  const selectedUstensils = Array.from(
    filterUstensils.querySelectorAll(".filter-item.selected")
  ).map((item) => item.textContent.trim());
  console.log(selectedUstensils);

  return { selectedIngredients, selectedAppliances, selectedUstensils };
}

getSelectedFilters();
