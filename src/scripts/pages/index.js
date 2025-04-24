import { recipes } from "../../data/recipes.js";
import { fillFilters } from "../components/Filters.js";
import { recipeFactory } from "../factories/recipeFactory.js";
import RecipeCard from "../templates/RecipeCard.js";
import { clearRecipes } from "../utils/clearRecipes.js";

class Index {
  constructor() {
    this.recipesSection = document.querySelector(".section-recettes");
  }

  // Initialisation de la page principale
  init() {
    this.displayRecipes(recipes); // Afficher toutes les recettes au chargement
    fillFilters(recipes); // Remplir tous les filtres au chargement
  }

  // Fonction pour afficher les recettes
  displayRecipes(recipeList) {
    clearRecipes();

    // Parcourir les recettes et les afficher
    recipeList.forEach((recipe) => {
      const recipeModel = recipeFactory(recipe);
      const recipeCardItem = new RecipeCard(recipeModel);
      const recipeCard = recipeCardItem.getRecipeCard();
      this.recipesSection.appendChild(recipeCard);
    });

    // Mettre à jour le nombre de recettes affichées
    setNumberOfRecipes(recipeList);
  }
}

// Fonction pour mettre à jour le nombre de recettes affichées
export function setNumberOfRecipes(list) {
  const numberOfRecipes = document.querySelector(".nombre-recettes");
  if (numberOfRecipes) {
    numberOfRecipes.textContent = `${list.length} recettes`;
  }
}

// Exporter la fonction d'affichage pour l'utiliser ailleurs
export function displayRecipes(recipeList) {
  index.displayRecipes(recipeList);
}

// Initialiser la page
const index = new Index();
index.init();
