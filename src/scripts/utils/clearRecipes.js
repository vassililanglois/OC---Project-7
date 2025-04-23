// Function to delete all the recipes in the container

export function clearRecipes() {
  const recipesSection = document.querySelector(".section-recettes");
  recipesSection.textContent = "";
}
