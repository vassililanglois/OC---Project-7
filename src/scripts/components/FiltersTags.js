import FilterTag from "../templates/FilterTag.js";
import { unselectFilter } from "./Filters.js";

// Ajoute un tag au container et gère le clic sur la croix
export function addTag(tagName, type) {
  const tagContainer = document.querySelector(`.${type}-tags`);
  const tag = new FilterTag(tagName).getFilterTag();
  tag
    .querySelector("svg")
    .addEventListener("click", () => unselectFilter(tagName, type));
  tagContainer.appendChild(tag);
}

// Récupère tous les tags d'un type donné (ingredients, appliances, ustensils)
function getTags(type) {
  return Array.from(
    document.querySelectorAll(`.${type}-tags .filtre-element-tag`)
  ).map((tag) => tag.textContent.trim().toLowerCase());
}

// Filtre les recettes selon les tags sélectionnés
export function filterRecipesWithTags(recipes) {
  const ingredients = getTags("ingredients");
  const appliances = getTags("appliances");
  const ustensils = getTags("ustensils");

  if (!ingredients.length && !appliances.length && !ustensils.length)
    return recipes;

  return recipes.filter((recipe) => {
    const hasAllIngredients = ingredients.every((tag) =>
      recipe.ingredients.some(({ ingredient }) =>
        ingredient.toLowerCase().includes(tag)
      )
    );
    const hasAllAppliances = appliances.every(
      (tag) => recipe.appliance && recipe.appliance.toLowerCase().includes(tag)
    );
    const hasAllUstensils = ustensils.every(
      (tag) =>
        Array.isArray(recipe.ustensils) &&
        recipe.ustensils.some((u) => u.toLowerCase().includes(tag))
    );
    return hasAllIngredients && hasAllAppliances && hasAllUstensils;
  });
}
