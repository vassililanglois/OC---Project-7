// Gestion du dropdown des filtres

const filters = document.querySelectorAll(".filtre-container");
const filterButtons = document.querySelectorAll(".filtre-title");
const arrows = document.querySelectorAll(".arrow");

// Ajouter un écouteur d'événement "click" à chaque bouton de filtre
filterButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    arrows[index].classList.toggle("rotate");
    filters[index].classList.toggle("open");
  });
});
