import { recipes } from "../../data/recipes.js";
import { createRecipeCard } from "../components/RecipeCard.js";

const sectionRecettes = document.querySelector(".section-recettes");

export function displayRecipeCards(recipes) {
  recipes.forEach((recipe) => {
    const card = createRecipeCard(recipe);

    sectionRecettes.appendChild(card);
  });
}

export function displayFilterElements(
  elements,
  container,
  selectedContainer,
  tagContainer
) {
  elements.forEach((element) => {
    // Créer un div pour chaque élément du filtre
    const filterElement = document.createElement("div");
    filterElement.classList.add("filter-element"); // Ajoute une classe
    filterElement.innerHTML = `
      <span>${element}</span>
      <svg class="unselect-filter-element" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 
        6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 
        17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 
        9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 
        13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 
        9.17157L14.8284 7.75736L12 10.5858Z"></path>
      </svg>
    `;

    // Ajouter l'élément au container par défaut
    container.appendChild(filterElement);

    // Récupérer le bouton de suppression de l'élément
    const deleteFilterElement = filterElement.querySelector(
      ".unselect-filter-element"
    );

    // Fonction pour retirer l'élément et le tag
    const removeElement = () => {
      filterElement.classList.remove("selected");
      container.appendChild(filterElement); // Replacer dans le container d'origine
      if (filterElement.tagElement) {
        filterElement.tagElement.remove(); // Supprimer le tag lié
        filterElement.tagElement = null;
      }
    };

    // Ajouter un écouteur pour désélectionner en cliquant sur le SVG
    deleteFilterElement.addEventListener("click", (event) => {
      event.stopPropagation(); // Empêcher le clic de déclencher celui du parent
      removeElement();
    });

    // Ajouter un event listener pour gérer l'ajout de la classe et le déplacement
    filterElement.addEventListener("click", () => {
      if (!filterElement.classList.contains("selected")) {
        filterElement.classList.add("selected");
        selectedContainer.appendChild(filterElement); // Déplacer dans le container sélectionné

        // Créer le tag correspondant
        const filterElementTag = document.createElement("div");
        filterElementTag.classList.add("filtre-element-tag");
        filterElementTag.innerHTML = `
          <span>${element}</span>
          <svg class="delete-filter-tag" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 
            86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 
            361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 
            12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
          </svg>
        `;

        // Ajouter le tag sous le filtre
        tagContainer.appendChild(filterElementTag);
        filterElement.tagElement = filterElementTag; // Stocker la référence du tag

        // Récupérer le bouton de suppression du tag
        const deleteFilterElementTag =
          filterElementTag.querySelector(".delete-filter-tag");

        // Ajouter un écouteur pour désélectionner en cliquant sur le SVG du tag
        deleteFilterElementTag.addEventListener("click", (event) => {
          event.stopPropagation();
          removeElement();
        });
      }
    });
  });
}
