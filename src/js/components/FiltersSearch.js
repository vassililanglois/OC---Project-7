import { getFiltersElements, fillFilters } from "./Filters.js";
import { recipes } from "/src/data/recipes.js";

// Sélectionner les barres de recherche et les containers correspondants
const searchbars = {
  ingredients: document.getElementById("searchbar-ingredients"),
  appliances: document.getElementById("searchbar-appliances"),
  ustensils: document.getElementById("searchbar-ustensils"),
};

const containers = {
  ingredients: document.querySelector(".filtre-elements.filtre-ingredients"),
  appliances: document.querySelector(".filtre-elements.filtre-appliances"),
  ustensils: document.querySelector(".filtre-elements.filtre-ustensils"),
};

// Récupérer les listes des filtres
const { allIngredients, allAppliances, allUstensils } =
  getFiltersElements(recipes);

const originalLists = {
  ingredients: allIngredients,
  appliances: allAppliances,
  ustensils: allUstensils,
};

// Fonction pour rechercher dans les filtres
function filterSearch(input, originalList, container) {
  input.addEventListener("input", () => {
    const keyword = input.value.trim().toLowerCase();
    const selectedItems = Array.from(
      container.querySelectorAll(".filter-item.selected")
    ).map((item) => item.textContent.trim());

    const filteredList = originalList.filter((item) =>
      item.toLowerCase().includes(keyword)
    );

    const finalList = [...new Set([...selectedItems, ...filteredList])];
    fillFilters(finalList, container);

    selectedItems.forEach((selected) => {
      const matchingItem = container.querySelector(
        `.filter-item:contains("${selected}")`
      );
      if (matchingItem) matchingItem.classList.add("selected");
    });
  });
}

// Initialiser la recherche pour chaque filtre
Object.keys(searchbars).forEach((key) => {
  filterSearch(searchbars[key], originalLists[key], containers[key]);
});
