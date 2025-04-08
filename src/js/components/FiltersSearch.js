import { getFiltersElements } from "./Filters.js";
import { fillFilters } from "./Filters.js"; // Importer la fonction fillFilters
import { recipes } from "/src/data/recipes.js";

// Sélectionner les barres de recherche et les containers correspondants
const searchbarIngredients = document.getElementById("searchbar-ingredients");
const searchbarAppliances = document.getElementById("searchbar-appliances");
const searchbarUstensils = document.getElementById("searchbar-ustensils");

const filterIngredientsContainer = document.querySelector(
  ".filtre-elements.filtre-ingredients"
);
const filterAppliancesContainer = document.querySelector(
  ".filtre-elements.filtre-appliances"
);
const filterUstensilsContainer = document.querySelector(
  ".filtre-elements.filtre-ustensils"
);

// Récupérer les listes des filtres
const { allIngredients, allAppliances, allUstensils } =
  getFiltersElements(recipes);

// Fonction pour rechercher dans les filtres
function filterSearch(input, originalList, container) {
  input.addEventListener("input", () => {
    const keyword = input.value.trim().toLowerCase(); // Récupérer la valeur de l'input

    // Conserver les éléments sélectionnés
    const selectedItems = Array.from(
      container.querySelectorAll(".filter-item.selected")
    ).map((item) => item.textContent.trim());

    // Filtrer la liste originale en fonction du mot-clé
    const filteredList = originalList.filter((item) =>
      item.toLowerCase().includes(keyword)
    );

    // Ajouter les éléments sélectionnés en haut de la liste filtrée
    const finalList = [...new Set([...selectedItems, ...filteredList])];

    fillFilters(finalList, container); // Mettre à jour les éléments affichés

    // Restaurer l'état sélectionné des éléments
    selectedItems.forEach((selected) => {
      const matchingItem = Array.from(
        container.querySelectorAll(".filter-item")
      ).find((item) => item.textContent.trim() === selected);
      if (matchingItem) {
        matchingItem.classList.add("selected");
      }
    });
  });
}

// Initialiser la recherche pour chaque filtre
filterSearch(searchbarIngredients, allIngredients, filterIngredientsContainer);
filterSearch(searchbarAppliances, allAppliances, filterAppliancesContainer);
filterSearch(searchbarUstensils, allUstensils, filterUstensilsContainer);
