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
function filterSearch(input, list, container) {
  input.addEventListener("input", () => {
    const keyword = input.value.trim().toLowerCase(); // Récupérer la valeur de l'input
    const filteredList = list.filter((item) =>
      item.toLowerCase().includes(keyword)
    ); // Filtrer la liste en fonction du mot-clé
    fillFilters(filteredList, container); // Mettre à jour les éléments affichés
  });
}

// Initialiser la recherche pour chaque filtre
filterSearch(searchbarIngredients, allIngredients, filterIngredientsContainer);
filterSearch(searchbarAppliances, allAppliances, filterAppliancesContainer);
filterSearch(searchbarUstensils, allUstensils, filterUstensilsContainer);
