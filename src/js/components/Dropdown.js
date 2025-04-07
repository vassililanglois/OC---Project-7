// Gestion du dropdown des filtres

const filters = document.querySelectorAll(".filtre-container");
const filterButtons = document.querySelectorAll(".filtre-title");
const arrows = document.querySelectorAll(".arrow");

// Ajoute un écouteur d'événement "click" à chaque bouton de filtre

filterButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    arrowRotate(arrows[index]);
    displayFilter(filters[index]);
  });
});

// Fonction qui ajoute la classe "rotate" à la flèche

function arrowRotate(arrow) {
  arrow.classList.toggle("rotate");
}

// Fonction qui ajoute la classe "open" à la flèche

function displayFilter(filter) {
  filter.classList.toggle("open");
}
