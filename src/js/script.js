import {
  sectionRecettes,
  createRecipeCard,
} from "/src/js/components/RecipeCard.js";
import { recipes } from "/src/data/recipes.js";
import {
  globalSearch,
  globalSearchInput,
  isKeywordValid,
} from "./components/GlobalSearch.js";
import {
  updateFilters,
  getSelectedFilters,
  searchByFilters,
  hasFilters,
} from "./components/Filters.js";
import {
  displayErrorMessage,
  eraseErrorMessage,
} from "./utils/noRecipeFound.js";

// Fonction pour afficher les cartes de recettes
export function displayRecipeCards(recipes) {
  sectionRecettes.innerHTML = ""; // Réinitialiser la section des recettes
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

// Fonction pour combiner les résultats de la recherche globale et des filtres
function combinedSearch(keyword) {
  const globalSearchResults = globalSearch(keyword); // Résultats de la recherche globale
  const filterSearchResults = searchByFilters(); // Résultats des filtres
  // Combiner les deux listes en prenant les recettes communes
  const combinedResults = globalSearchResults.filter((recipe) =>
    filterSearchResults.includes(recipe)
  );

  return combinedResults;
}

// Afficher toutes les recettes par défaut
displayRecipeCards(recipes);
setNumberOfRecipes(recipes);

if (hasFilters) {
  const filteredRecipes = searchByFilters();
  displayRecipeCards(filteredRecipes);
  setNumberOfRecipes(filteredRecipes);
  console.log(filteredRecipes);
}

// Écouteur d’événement pour la barre de recherche
globalSearchInput.addEventListener("input", () => {
  const keyword = globalSearchInput.value.trim().toLowerCase();

  if (keyword.length === 0) {
    if (!hasFilters()) {
      // Si la barre de recherche est vide et aucun filtre n'est sélectionné
      displayRecipeCards(recipes);
      setNumberOfRecipes(recipes);
      eraseErrorMessage(); // Effacer le message d'erreur
      updateFilters(recipes); // Mettre à jour les filtres avec toutes les recettes
    } else {
      // Si la barre de recherche est vide mais des filtres sont sélectionnés
      const filteredRecipes = searchByFilters();
      displayRecipeCards(filteredRecipes);
      setNumberOfRecipes(filteredRecipes);
      eraseErrorMessage(); // Effacer le message d'erreur
      updateFilters(filteredRecipes); // Mettre à jour les filtres avec les recettes filtrées
    }
  } else {
    // Si un mot-clé est saisi
    sectionRecettes.innerHTML = ""; // Vider la section des recettes
    if (isKeywordValid(keyword)) {
      if (hasFilters()) {
        // Si un mot-clé est saisi et des filtres sont sélectionnés
        const filteredRecipes = combinedSearch(keyword);
        displayRecipeCards(filteredRecipes);
        setNumberOfRecipes(filteredRecipes);
        updateFilters(filteredRecipes);

        if (filteredRecipes.length === 0) {
          displayErrorMessage(keyword); // Afficher le message d'erreur si aucune recette n'est trouvée
        } else {
          eraseErrorMessage(); // Effacer le message d'erreur si des recettes sont trouvées
        }
      } else {
        // Si un mot-clé est saisi mais aucun filtre n'est sélectionné
        const filteredRecipes = globalSearch(keyword);
        displayRecipeCards(filteredRecipes);
        setNumberOfRecipes(filteredRecipes);
        updateFilters(filteredRecipes);

        if (filteredRecipes.length === 0) {
          displayErrorMessage(keyword); // Afficher le message d'erreur si aucune recette n'est trouvée
        } else {
          eraseErrorMessage(); // Effacer le message d'erreur si des recettes sont trouvées
        }
      }
    } else {
      console.log("Mot-clé trop court (moins de 3 caractères)");
      setNumberOfRecipes([]); // Mettre à jour le nombre de recettes à 0
      updateFilters([]); // Vider les filtres
      eraseErrorMessage(); // Effacer le message d'erreur
    }
  }
});
