const filters = document.querySelectorAll(".filtre-container");
const filterButtons = document.querySelectorAll(".filtre-title");
const arrows = document.querySelectorAll(".arrow");

// Gestion de la flèche des filtres

filterButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    arrowRotate(arrows[index]);
    displayFilter(filters[index]);
  });
});

function arrowRotate(arrow) {
  arrow.classList.toggle("rotate");
}

function displayFilter(filter) {
  filter.classList.toggle("open");
}

//

export function getFilterElements(recipes) {
  const filterIngredientsSection = document.querySelector(
    ".filtre-ingredients"
  );
  const filterAppliancesSection = document.querySelector(".filtre-appliances");
  const filterUstensilsSection = document.querySelector(".filtre-ustensils");

  // Fonction pour capitaliser seulement la première lettre
  const capitalizeFirstLetter = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  // Récupérer tous les ingrédients uniques avec la bonne mise en forme
  const allIngredients = [
    ...new Set(
      recipes.flatMap((recipe) =>
        recipe.ingredients.map((ing) => capitalizeFirstLetter(ing.ingredient))
      )
    ),
  ];

  // Récupérer toutes les appliances uniques avec la bonne mise en forme
  const allAppliances = [
    ...new Set(
      recipes.map((recipe) => capitalizeFirstLetter(recipe.appliance))
    ),
  ];

  // Récupérer tous les ustensiles uniques avec la bonne mise en forme
  const allUstensils = [
    ...new Set(
      recipes.flatMap((recipe) =>
        recipe.ustensils.map((ust) => capitalizeFirstLetter(ust))
      )
    ),
  ];

  console.log(allIngredients);
  console.log(allAppliances);
  console.log(allUstensils);

  // Retourner les variables
  return { allIngredients, allAppliances, allUstensils };
}
