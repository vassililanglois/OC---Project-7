/*
 * *********************
 * Module qui gère la partie affichage des cartes de recette
 * *********************
 */

export function createRecipeCard(recipe) {
  const recette = document.createElement("article");
  recette.classList.add("recette");

  // Construction de la carte HTML
  recette.innerHTML = `
            <div class="recette-time">${recipe.time}min</div>
            <img
              src="/src/assets/images/recettes/Recette${recipe.id}.webp"
              alt="${recipe.name}"
            />
            <div class="recette-info-container">
              <h2 class="recette-title">${recipe.name}</h2>
              <div class="recette-preparation">
                <h3 class="recette-info-title">RECETTE</h3>
                <p>
                ${recipe.description}
                </p>
              </div>
              <div class="recette-ingredients">
                <h3 class="recette-info-title">INGRÉDIENTS</h3>
                <div class="info-ingredient">
                  <p class="ingredient-name">Lait de coco</p>
                  <p class="ingredient-quantity">400mL</p>
                </div>
              </div>
            </div>
  `;

  return recette;
}
