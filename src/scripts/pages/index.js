import { recipes } from "../../data/recipes.js";
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
  }

  // Fonction pour afficher les recettes
  displayRecipes(recipeList) {
    clearRecipes();

    // Vérifier si des recettes sont disponibles
    if (recipeList.length === 0) {
      this.recipesSection.innerHTML = `<p>Aucune recette trouvée.</p>`;
      return;
    }

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
export function displayRecipeCards(recipeList) {
  index.displayRecipes(recipeList);
}

// Initialiser la page
const index = new Index();
index.init();
