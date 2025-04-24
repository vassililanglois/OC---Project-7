import FilterOption from "../templates/FilterOption.js";
import { recipes } from "../../data/recipes.js";
import { displayRecipes, setNumberOfRecipes } from "../pages/index.js";
import { capitalizeFirstLetter } from "../utils/formatData.js";
import { addTag } from "./FiltersTags.js";
import { searchRecipes } from "./GlobalSearch.js";

// Récupération des containers de chaque filtre
export function getFilterContainers() {
  const ingredients = document.querySelector(
    ".filtre-elements.filtre-ingredients"
  );
  const appliances = document.querySelector(
    ".filtre-elements.filtre-appliances"
  );
  const ustensils = document.querySelector(".filtre-elements.filtre-ustensils");

  if (!ingredients || !appliances || !ustensils) {
    console.warn("Un ou plusieurs containers de filtre sont introuvables.");
  }

  return { ingredients, appliances, ustensils };
}

function createFilterOption(el) {
  const filterOption = new FilterOption(el);
  const node = filterOption.getFilterOption();
  node.setAttribute("data-filter", el.trim().toLowerCase());
  return node;
}

function extractFilterLists(recipes) {
  const ingredientsSet = new Set();
  const appliancesSet = new Set();
  const ustensilsSet = new Set();

  recipes.forEach((recipe) => {
    // Ingrédients
    recipe.ingredients.forEach((obj) => {
      if (obj.ingredient) {
        ingredientsSet.add(obj.ingredient.trim().toLowerCase());
      }
    });
    // Appareil
    if (recipe.appliance) {
      appliancesSet.add(recipe.appliance.trim().toLowerCase());
    }
    // Ustensiles
    if (Array.isArray(recipe.ustensils)) {
      recipe.ustensils.forEach((u) => {
        if (u) {
          ustensilsSet.add(u.trim().toLowerCase());
        }
      });
    }
  });

  return {
    ingredients: Array.from(ingredientsSet),
    appliances: Array.from(appliancesSet),
    ustensils: Array.from(ustensilsSet),
  };
}

export function fillFilters(recipes) {
  const containers = getFilterContainers();
  const { ingredients, appliances, ustensils } = extractFilterLists(recipes);

  // Vider les conteneurs avant de les remplir
  containers.ingredients.innerHTML = "";
  containers.appliances.innerHTML = "";
  containers.ustensils.innerHTML = "";

  // Remplir les ingrédients
  ingredients.forEach((el) => {
    const filterItem = createFilterOption(el);
    handleFilterOptionClick(filterItem, el, "ingredients");
    handleUnselectSvgClick(filterItem, el, "ingredients");
    containers.ingredients.appendChild(filterItem);
  });

  // Remplir les appareils
  appliances.forEach((el) => {
    const filterItem = createFilterOption(el);
    handleFilterOptionClick(filterItem, el, "appliances");
    handleUnselectSvgClick(filterItem, el, "appliances");
    containers.appliances.appendChild(filterItem);
  });

  // Remplir les ustensiles
  ustensils.forEach((el) => {
    const filterItem = createFilterOption(el);
    handleFilterOptionClick(filterItem, el, "ustensils");
    handleUnselectSvgClick(filterItem, el, "ustensils");
    containers.ustensils.appendChild(filterItem);
  });
}

function handleFilterOptionClick(filterItem, el, type) {
  filterItem.addEventListener("click", (event) => {
    if (
      (event.target.classList.contains("unselect-filter-element") ||
        event.target.closest(".unselect-filter-element")) &&
      window.getComputedStyle(event.target).display !== "none"
    ) {
      return;
    }

    if (!filterItem.classList.contains("selected")) {
      filterItem.classList.add("selected");

      const tagContainer = document.querySelector(`.${type}-tags`);
      const tagExists = Array.from(tagContainer.children).some(
        (tag) =>
          tag.textContent.trim().toLowerCase() === el.trim().toLowerCase()
      );
      if (!tagExists) {
        addTag(el, type);
      }
    }
    searchRecipes();
  });
}

function handleUnselectSvgClick(filterItem, el, type) {
  const unselectSvg = filterItem.querySelector(".unselect-filter-element");
  if (!unselectSvg) return;
  unselectSvg.addEventListener("click", (event) => {
    event.stopPropagation();
    filterItem.classList.remove("selected");
    const tagContainer = document.querySelector(`.${type}-tags`);
    const tagToRemove = Array.from(tagContainer.children).find(
      (tag) => tag.textContent.trim().toLowerCase() === el.trim().toLowerCase()
    );
    if (tagToRemove) {
      tagContainer.removeChild(tagToRemove);
    }
    searchRecipes();
  });
}
