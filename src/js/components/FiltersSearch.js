// Fonction permettant de rechercher un tag dans un filtre

function searchingTag(input, listItems) {
  const searchbarTag = input;

  // Écoute les changements dans l'input
  searchbarTag.addEventListener("input", () => {
    const filterValue = searchbarTag.value.toLowerCase(); // Récupère la valeur de l'input en minuscule

    // Parcourt chaque élément de la liste
    listItems.forEach((item) => {
      const text = item.textContent.toLowerCase(); // Récupère le texte de l'élément en minuscule

      // Affiche ou masque l'élément en fonction de la correspondance avec la valeur de l'input
      item.style.display = text.includes(filterValue) ? "block" : "none";
    });
  });
}
