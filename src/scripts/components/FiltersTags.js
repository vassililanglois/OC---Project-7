import { displayRecipeCards, setNumberOfRecipes } from "../pages/index.js";
import { searchByFilters } from "./Filters.js";
import FilterTag from "../templates/FilterTag.js";

// Gérer l'animation d'entrée
function handleTagEnterAnimation(tag) {
  tag.addEventListener("animationend", () => {
    tag.classList.remove("tag-enter");
  });
}

// Gérer l'animation de sortie
function handleTagExitAnimation(tag, tagContainer, tagName) {
  tag.classList.add("tag-exit");
  tag.addEventListener("animationend", () => {
    if (tag.classList.contains("tag-exit")) {
      tagContainer.removeChild(tag);

      // Retirer la classe "selected" de l'élément correspondant dans les filtres
      const filterItems = document.querySelectorAll(".filter-item");
      filterItems.forEach((item) => {
        if (item.textContent.trim() === tagName) {
          item.classList.remove("selected");
        }
      });

      // Re-render les recettes après suppression du tag
      const filteredRecipes = searchByFilters();
      displayRecipeCards(filteredRecipes);
      setNumberOfRecipes(filteredRecipes);
    }
  });
}

// Ajouter un tag au container
export function addTag(tagName) {
  const tagContainer = document.querySelector(".filter-tags");
  const filterTag = new FilterTag(tagName);
  const tag = filterTag.getFilterTag();

  // Ajouter un gestionnaire d'événements pour le clic sur le SVG
  const svg = tag.querySelector("svg");
  svg.addEventListener("click", () => {
    handleTagExitAnimation(tag, tagContainer, tagName);
  });

  handleTagEnterAnimation(tag); // Gérer l'animation d'entrée
  tagContainer.appendChild(tag); // Ajouter le tag au container
}
