export default class RecipeCard {
  constructor(recipe) {
    this._recipe = recipe;
  }

  getRecipeCard() {
    const recette = document.createElement("article");
    recette.classList.add("recette");

    // Génération dynamique des ingrédients
    const ingredient = this._recipe.ingredients
      .map((item) => {
        const name = item.ingredient;
        const quantity = item.quantity ? `${item.quantity}` : "";
        const unit = item.unit ? ` ${item.unit}` : "";
        return `
              <div>
              <p class="ingredient-name">${name}</p>
              <p class="ingredient-quantity">${quantity}${unit}</p>
              </div>
               `;
      })
      .join("");

    // Construction de la carte HTML
    recette.innerHTML = `
              <div class="recette-time">${this._recipe.time}min</div>
              <img
                src="${this._recipe.image}"
                alt="${this._recipe.name}"
              />
              <div class="recette-info-container">
                <h2 class="recette-title">${this._recipe.name}</h2>
                <div class="recette-preparation">
                  <h3 class="recette-info-title">RECETTE</h3>
                  <p>
                  ${this._recipe.description}
                  </p>
                </div>
                <div class="recette-ingredients">
                  <h3 class="recette-info-title">INGRÉDIENTS</h3>
                  <div class="info-ingredients">
                    ${ingredient}
                  </div>
                </div>
              </div>
    `;

    return recette;
  }
}
