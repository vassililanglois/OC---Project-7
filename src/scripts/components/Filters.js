import FilterOption from "../templates/FilterOption.js";
import { addTag } from "./FiltersTags.js";
import { searchRecipes } from "./GlobalSearch.js";

// Récupération des containers de chaque filtre
export function getFilterContainers() {
  return {
    ingredients: document.querySelector(".filtre-elements.filtre-ingredients"),
    appliances: document.querySelector(".filtre-elements.filtre-appliances"),
    ustensils: document.querySelector(".filtre-elements.filtre-ustensils"),
  };
}

// Récupération des containers sélectionnés de chaque filtre
function getSelectedContainers() {
  return {
    ingredients: document.querySelector(
      ".selected-elements.filtre-ingredients"
    ),
    appliances: document.querySelector(".selected-elements.filtre-appliances"),
    ustensils: document.querySelector(".selected-elements.filtre-ustensils"),
  };
}

function createFilterOption(el) {
  const node = new FilterOption(el).getFilterOption();
  node.setAttribute("data-filter", el.trim().toLowerCase());
  return node;
}

function extractFilterLists(recipes) {
  const ingredientsSet = new Set();
  const appliancesSet = new Set();
  const ustensilsSet = new Set();

  recipes.forEach(({ ingredients, appliance, ustensils }) => {
    ingredients?.forEach(
      (obj) =>
        obj.ingredient &&
        ingredientsSet.add(obj.ingredient.trim().toLowerCase())
    );
    appliance && appliancesSet.add(appliance.trim().toLowerCase());
    ustensils?.forEach((u) => u && ustensilsSet.add(u.trim().toLowerCase()));
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
  Object.values(containers).forEach((container) => (container.innerHTML = ""));

  // Vérifie si un item est déjà sélectionné
  const isAlreadySelected = (el, type) =>
    Array.from(selectedContainers[type].children).some(
      (child) => child.getAttribute("data-filter") === el.trim().toLowerCase()
    );

  // Génère les options pour chaque type de filtre
  [
    ["ingredients", ingredients],
    ["appliances", appliances],
    ["ustensils", ustensils],
  ].forEach(([type, list]) => {
    list.forEach((el) => {
      if (isAlreadySelected(el, type)) return;
      const filterItem = createFilterOption(el);
      handleFilterOptionClick(filterItem, el, type);
      handleUnselectSvgClick(filterItem, el, type);
      containers[type].appendChild(filterItem);
    });
  });
}

function handleFilterOptionClick(filterItem, el, type) {
  filterItem.addEventListener("click", (event) => {
    if (
      (event.target.classList.contains("unselect-filter-element") ||
        event.target.closest(".unselect-filter-element")) &&
      window.getComputedStyle(event.target).display !== "none"
    )
      return;

    if (!filterItem.classList.contains("selected")) {
      filterItem.classList.add("selected");
      getSelectedContainers()[type].appendChild(filterItem);

      const tagContainer = document.querySelector(`.${type}-tags`);
      const tagExists = Array.from(tagContainer.children).some(
        (tag) =>
          tag.textContent.trim().toLowerCase() === el.trim().toLowerCase()
      );
      if (!tagExists) addTag(el, type);
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
  // Retire la classe selected du filterItem correspondant et replace dans le conteneur d'origine
  const selectedContainer = document.querySelector(
    `.selected-elements.filtre-${type}`
  );
  const filterItem = Array.from(selectedContainer.children).find(
    (child) => child.getAttribute("data-filter") === el.trim().toLowerCase()
  );
  if (filterItem) {
    filterItem.classList.remove("selected");
    getFilterContainers()[type].appendChild(filterItem);
  }

  // Supprime le tag associé
  const tagContainer = document.querySelector(`.${type}-tags`);
  const tagToRemove = Array.from(tagContainer.children).find(
    (tag) => tag.textContent.trim().toLowerCase() === el.trim().toLowerCase()
  );
  if (tagToRemove) tagContainer.removeChild(tagToRemove);

  searchRecipes();
}
