import FilterTag from "../templates/FilterTag.js";
import { searchRecipes } from "./GlobalSearch.js";

// Ajouter un tag au container
export function addTag(tagName, type) {
  const tagContainer = document.querySelector(`.${type}-tags`);
  const filterTag = new FilterTag(tagName);
  const tag = filterTag.getFilterTag();

  // Ajouter un gestionnaire d'événements pour le clic sur le SVG
  const svg = tag.querySelector("svg");
  svg.addEventListener("click", () => {
    deleteTag(tag, tagContainer, tagName, type);
  });

  tagContainer.appendChild(tag); // Ajouter le tag au container
}

// Supprimer un tag
function deleteTag(tag, tagContainer, tagName, type) {
  // Retirer la tag de son container
  tagContainer.removeChild(tag);

  // Retirer la classe "selected" de l'élément correspondant dans les filtres de la bonne catégorie
  const filterItems = document.querySelectorAll(
    `.filter-item[data-type="${type}"]`
  );
  filterItems.forEach((item) => {
    if (
      item.textContent.trim().toLowerCase() === tagName.trim().toLowerCase()
    ) {
      item.classList.remove("selected");
    }
  });

  // Render les recettes à la suppression du tag
  searchRecipes();
}

// Filtre les recettes affichées avec des tags
export function filterRecipesWithTags(recipesToFilter) {
  const ingredientsTags = document.querySelectorAll(
    ".ingredients-tags .filtre-element-tag"
  );
  const appliancesTags = document.querySelectorAll(
    ".appliances-tags .filtre-element-tag"
  );
  const ustensilsTags = document.querySelectorAll(
    ".ustensils-tags .filtre-element-tag"
  );

  const ingredients = Array.from(ingredientsTags).map((tag) =>
    tag.textContent.trim().toLowerCase()
  );
  const appliances = Array.from(appliancesTags).map((tag) =>
    tag.textContent.trim().toLowerCase()
  );
  const ustensils = Array.from(ustensilsTags).map((tag) =>
    tag.textContent.trim().toLowerCase()
  );

  if (
    ingredients.length === 0 &&
    appliances.length === 0 &&
    ustensils.length === 0
  )
    return recipesToFilter;

  return recipesToFilter.filter((recipe) => {
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
