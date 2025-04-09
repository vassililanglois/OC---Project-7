import { capitalizeFirstLetter } from "/src/js/utils/formatData.js";
import { recipes } from "/src/data/recipes.js";
import { createTag } from "./FiltersTags.js";
import { displayRecipeCards } from "../script.js"; // Importer la fonction pour afficher les recettes
import { setNumberOfRecipes } from "../script.js"; // Importer la fonction pour mettre à jour le nombre de recettes

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
fillFilters(allIngredients, filterIngredients, "ingredients");
fillFilters(allAppliances, filterAppliances, "appliances");
fillFilters(allUstensils, filterUstensils, "ustensils");

export function fillFilters(
  filterElements,
  filterElementsContainer,
  filterName
) {
  // Réinitialiser le container
  filterElementsContainer.innerHTML = "";

  // Trouver le conteneur pour chaque filtre dans le DOM grâce à "filterName"
  const selectedElementsContainer = document.querySelector(
    `.selected-elements.filtre-${filterName}`
  );

  filterElements.forEach((el) => {
    const filterItem = document.createElement("div");
    filterItem.innerHTML = `
    <p>${el}</p>
    <svg class="unselect-filter-element" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
    `;
    filterItem.classList.add("filter-item");

    // Ajouter un gestionnaire de clic pour l'élément principal
    filterItem.addEventListener("click", () => {
      // Ajouter ou retire la classe "selected" à un élément d'un filtre
      if (!filterItem.classList.contains("selected")) {
        filterItem.classList.add("selected");
        searchByFilters();
      } else {
        filterItem.classList.remove("selected");
      }

      const tagContainer = document.querySelector(".filter-tags");

      // Vérifier si le tag existe déjà
      const tagExists = Array.from(tagContainer.children).some(
        (tag) => tag.textContent.trim() === el
      );

      if (!tagExists) {
        createTag(el); // Appeler la fonction createTag avec l'élément
      }

      // Actualiser la liste des recettes filtrées
      const filteredRecipes = searchByFilters();
      displayRecipeCards(filteredRecipes); // Afficher les recettes filtrées
      setNumberOfRecipes(filteredRecipes); // Mettre à jour le nombre de recettes affichées
    });

    // Ajouter un gestionnaire de clic pour le SVG
    const unselectSvg = filterItem.querySelector(".unselect-filter-element");
    unselectSvg.addEventListener("click", (event) => {
      event.stopPropagation(); // Empêcher le clic de se propager au parent
      filterItem.classList.remove("selected"); // Retirer la classe "selected"

      // Supprimer le tag lié à l'élément
      const tagContainer = document.querySelector(".filter-tags");
      const tagToRemove = Array.from(tagContainer.children).find(
        (tag) => tag.textContent.trim() === el
      );
      if (tagToRemove) {
        tagContainer.removeChild(tagToRemove); // Supprimer le tag du container
      }

      // Actualiser la liste des recettes filtrées
      const filteredRecipes = searchByFilters();
      displayRecipeCards(filteredRecipes); // Afficher les recettes filtrées
      setNumberOfRecipes(filteredRecipes); // Mettre à jour le nombre de recettes affichées
    });

    filterElementsContainer.appendChild(filterItem);
  });
}

// Fonction pour actualiser les filtres en fonction des recettes filtrées
export function updateFilters(filteredRecipes) {
  const { allIngredients, allAppliances, allUstensils } =
    getFiltersElements(filteredRecipes);

  // Mettre à jour les filtres affichés
  fillFilters(allIngredients, filterIngredients, "ingredients");
  fillFilters(allAppliances, filterAppliances, "appliances");
  fillFilters(allUstensils, filterUstensils, "ustensils");
}

export function getSelectedFilters() {
  const selectedIngredients = Array.from(
    filterIngredients.querySelectorAll(".filter-item.selected")
  ).map((item) => item.textContent.trim());

  const selectedAppliances = Array.from(
    filterAppliances.querySelectorAll(".filter-item.selected")
  ).map((item) => item.textContent.trim());

  const selectedUstensils = Array.from(
    filterUstensils.querySelectorAll(".filter-item.selected")
  ).map((item) => item.textContent.trim());

  return { selectedIngredients, selectedAppliances, selectedUstensils };
}

export function searchByFilters() {
  const { selectedIngredients, selectedAppliances, selectedUstensils } =
    getSelectedFilters();

  const filteredRecipesByFilters = [];

  for (const recipe of recipes) {
    const recipeIngredients = recipe.ingredients.map((ing) =>
      ing.ingredient.toLowerCase()
    );

    const recipeAppliance = recipe.appliance.toLowerCase();
    const recipeUstensils = recipe.ustensils.map((u) => u.toLowerCase());

    const hasAllIngredients = selectedIngredients.every((selectedIng) =>
      recipeIngredients.includes(selectedIng.toLowerCase())
    );

    const hasAppliance =
      selectedAppliances.length === 0 ||
      selectedAppliances.includes(recipeAppliance);

    const hasAllUstensils = selectedUstensils.every((selectedUst) =>
      recipeUstensils.includes(selectedUst.toLowerCase())
    );

    if (hasAllIngredients && hasAppliance && hasAllUstensils) {
      // On vérifie s'il n'est pas déjà ajouté (par ID)
      if (!filteredRecipesByFilters.some((r) => r.id === recipe.id)) {
        filteredRecipesByFilters.push(recipe);
      }
    }
  }

  return filteredRecipesByFilters;
}

export function hasFilters() {
  const { selectedIngredients, selectedAppliances, selectedUstensils } =
    getSelectedFilters();

  return (
    selectedIngredients.length > 0 ||
    selectedAppliances.length > 0 ||
    selectedUstensils.length > 0
  );
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
