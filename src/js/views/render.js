import { recipes } from "../../data/recipes.js";
import { createRecipeCard } from "../components/RecipeCard.js";

const sectionRecettes = document.querySelector(".section-recettes");

export function displayRecipeCards(recipes) {
  recipes.forEach((recipe) => {
    const card = createRecipeCard(recipe);

    sectionRecettes.appendChild(card);
  });
}

export function displayFilterElements(elements, container) {
  elements.forEach((element) => {
    // Créer un div pour chaque élément
    const filterElement = document.createElement("div");

    // Définir le texte de l'élément
    filterElement.textContent = element;

    // Ajouter le nouvel élément au conteneur
    container.appendChild(filterElement);
  });
}
