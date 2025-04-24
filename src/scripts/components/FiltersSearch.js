// Sélection des inputs de recherche de chaque filtre
const inputIngredients = document.querySelector("#searchbar-ingredients");
const inputAppliances = document.querySelector("#searchbar-appliances");
const inputUstensils = document.querySelector("#searchbar-ustensils");

// Affiche ou cache les élements correspondant à la recherche
function getSearchResultsForFilter(inputId, filterItemsSelector) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const searchTextQuery = input.value.trim().toLowerCase();
  const filterItems = document.querySelectorAll(filterItemsSelector);

  filterItems.forEach((item) => {
    const itemName = item.textContent.trim().toLowerCase();
    item.style.display = itemName.includes(searchTextQuery) ? "block" : "none";
  });
}

// Ajout des écouteurs d'événements sur chaque input
if (inputIngredients) {
  inputIngredients.addEventListener("input", () => {
    getSearchResultsForFilter(
      "searchbar-ingredients",
      ".filtre-elements.filtre-ingredients .filter-item"
    );
  });
}
if (inputAppliances) {
  inputAppliances.addEventListener("input", () => {
    getSearchResultsForFilter(
      "searchbar-appliances",
      ".filtre-elements.filtre-appliances .filter-item"
    );
  });
}
if (inputUstensils) {
  inputUstensils.addEventListener("input", () => {
    getSearchResultsForFilter(
      "searchbar-ustensils",
      ".filtre-elements.filtre-ustensils .filter-item"
    );
  });
}
