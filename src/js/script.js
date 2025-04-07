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

// Fonction pour afficher les cartes de recettes
function displayRecipeCards(recipes) {
  sectionRecettes.innerHTML = ""; // Réinitialiser la section des recettes
  recipes.forEach((recipe) => {
    const card = createRecipeCard(recipe);
    sectionRecettes.appendChild(card);
  });
}

// Fonction pour mettre à jour le nombre de recettes affichées
function setNumberOfRecipes(list) {
  const numberOfRecipes = document.querySelector(".nombre-recettes");
  numberOfRecipes.textContent = `${list.length} recettes`;
}

// Afficher toutes les recettes par défaut
displayRecipeCards(recipes);
setNumberOfRecipes(recipes);

// Écouteur d’événement pour la barre de recherche
globalSearchInput.addEventListener("input", (event) => {
  const keyword = globalSearchInput.value.trim().toLowerCase();

  if (keyword.length === 0) {
    // Si la barre de recherche est vide, afficher toutes les recettes
    displayRecipeCards(recipes);
    setNumberOfRecipes(recipes);
  } else {
    // Si un mot-clé est saisi, vider la section des recettes et afficher les résultats filtrés
    sectionRecettes.innerHTML = ""; // Vider la section des recettes
    if (isKeywordValid(keyword)) {
      const filteredRecipes = globalSearch(keyword); // Récupérer les recettes filtrées
      displayRecipeCards(filteredRecipes); // Afficher les recettes filtrées
      setNumberOfRecipes(filteredRecipes); // Mettre à jour le nombre de recettes affichées
    } else {
      console.log("Mot-clé trop court (moins de 3 caractères)");
      setNumberOfRecipes([]); // Mettre à jour le nombre de recettes à 0
    }
  }
});
