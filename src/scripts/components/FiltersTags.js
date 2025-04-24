import FilterTag from "../templates/FilterTag.js";
import { searchRecipes } from "./GlobalSearch.js";

// Ajouter un tag au container
export function addTag(tagName) {
  const tagContainer = document.querySelector(".filter-tags");
  const filterTag = new FilterTag(tagName);
  const tag = filterTag.getFilterTag();

  // Ajouter un gestionnaire d'événements pour le clic sur le SVG
  const svg = tag.querySelector("svg");
  svg.addEventListener("click", () => {
    deleteTag(tag, tagContainer, tagName);
  });

  tagContainer.appendChild(tag); // Ajouter le tag au container
}

// Gérer l'animation de sortie
function deleteTag(tag, tagContainer, tagName) {
  // Retirer la tag de son container
  tagContainer.removeChild(tag);

  // Retirer la classe "selected" de l'élément correspondant dans les filtres
  const filterItems = document.querySelectorAll(".filter-item");
  filterItems.forEach((item) => {
    if (item.textContent.trim() === tagName) {
      item.classList.remove("selected");
    }
  });

  // Render les recettes à la suppression du tag
  searchRecipes();
}

export function filterRecipesWithTags(recipesToFilter) {
  const tagElements = document.querySelectorAll(
    ".filter-tags .filtre-element-tag"
  );
  const tags = Array.from(tagElements).map((tag) =>
    tag.textContent.trim().toLowerCase()
  );

  if (tags.length === 0) return recipesToFilter;

  return recipesToFilter.filter((recipe) => {
    // Pour chaque tag, il faut que la recette le contienne dans au moins un champ
    return tags.every((tag) => {
      // Vérifie dans les ingrédients
      const inIngredients = recipe.ingredients.some(({ ingredient }) =>
        ingredient.toLowerCase().includes(tag)
      );
      // Vérifie dans les ustensiles
      const inUstensils = Array.isArray(recipe.ustensils)
        ? recipe.ustensils.some((u) => u.toLowerCase().includes(tag))
        : false;
      // Vérifie dans l'appliance
      const inAppliance = recipe.appliance
        ? recipe.appliance.toLowerCase().includes(tag)
        : false;

      return inIngredients || inUstensils || inAppliance;
    });
  });
}
