import { recipes } from "../../data/recipes.js";
import { createRecipeCard } from "../components/RecipeCard.js";

const sectionRecettes = document.querySelector(".section-recettes");

export function displayRecipeCards(recipes) {
  recipes.forEach((recipe) => {
    const card = createRecipeCard(recipe);
    sectionRecettes.appendChild(card);
  });
}
