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

// Récupération des containers sélectionnés de chaque filtre
function getSelectedContainers() {
  const ingredients = document.querySelector(
    ".selected-elements.filtre-ingredients"
  );
  const appliances = document.querySelector(
    ".selected-elements.filtre-appliances"
  );
  const ustensils = document.querySelector(
    ".selected-elements.filtre-ustensils"
  );

  if (!ingredients || !appliances || !ustensils) {
    console.warn("Un ou plusieurs containers sélectionnés sont introuvables.");
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
  const selectedContainers = getSelectedContainers();
  const { ingredients, appliances, ustensils } = extractFilterLists(recipes);

  // Vider les conteneurs avant de les remplir (sauf les sélectionnés)
  containers.ingredients.innerHTML = "";
  containers.appliances.innerHTML = "";
  containers.ustensils.innerHTML = "";

  // Fonction utilitaire pour vérifier si un item est déjà sélectionné
  function isAlreadySelected(el, type) {
    const selectedContainer = selectedContainers[type];
    return Array.from(selectedContainer.children).some(
      (child) => child.getAttribute("data-filter") === el.trim().toLowerCase()
    );
  }

  // Remplir les ingrédients
  ingredients.forEach((el) => {
    if (isAlreadySelected(el, "ingredients")) return;
    const filterItem = createFilterOption(el);
    handleFilterOptionClick(filterItem, el, "ingredients");
    handleUnselectSvgClick(filterItem, el, "ingredients");
    containers.ingredients.appendChild(filterItem);
  });

  // Remplir les appareils
  appliances.forEach((el) => {
    if (isAlreadySelected(el, "appliances")) return;
    const filterItem = createFilterOption(el);
    handleFilterOptionClick(filterItem, el, "appliances");
    handleUnselectSvgClick(filterItem, el, "appliances");
    containers.appliances.appendChild(filterItem);
  });

  // Remplir les ustensiles
  ustensils.forEach((el) => {
    if (isAlreadySelected(el, "ustensils")) return;
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

      // Déplacer le filterItem dans le conteneur sélectionné
      const selectedContainers = getSelectedContainers();
      selectedContainers[type].appendChild(filterItem);

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
    unselectFilter(el, type);
  });
}

export function unselectFilter(el, type) {
  // Retire la classe selected du filterItem correspondant
  const selectedContainer = document.querySelector(
    `.selected-elements.filtre-${type}`
  );
  const filterItem = Array.from(selectedContainer.children).find(
    (child) => child.getAttribute("data-filter") === el.trim().toLowerCase()
  );
  if (filterItem) {
    filterItem.classList.remove("selected");
    // Replace dans le conteneur d'origine
    const containers = getFilterContainers();
    containers[type].appendChild(filterItem);
  }

  // Supprime le tag associé
  const tagContainer = document.querySelector(`.${type}-tags`);
  const tagToRemove = Array.from(tagContainer.children).find(
    (tag) => tag.textContent.trim().toLowerCase() === el.trim().toLowerCase()
  );
  if (tagToRemove) {
    tagContainer.removeChild(tagToRemove);
  }

  searchRecipes();
}
