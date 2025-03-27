const filters = document.querySelectorAll(".filtre-container");
const filterButtons = document.querySelectorAll(".filtre-title");
const arrows = document.querySelectorAll(".arrow");

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
