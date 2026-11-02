"use strict";

// Henter HTML-elementerne
const productsContainer = document.getElementById("products-container");

const productDialog = document.getElementById("product-dialog");
const dialogImage = document.getElementById("dialog-image");
const dialogTitle = document.getElementById("dialog-title");
const dialogDescription = document.getElementById("dialog-description");
const dialogPrice = document.getElementById("dialog-price");
const dialogCategory = document.getElementById("dialog-category");
const dialogRating = document.getElementById("dialog-rating");
const dialogClose = document.getElementById("dialog-close");


// Viser alle spil på siden
function displayProducts(productsToDisplay) {

    // Rydder containeren, før nye spil vises
    productsContainer.innerHTML = "";

    // Hvis der ikke findes spil
    if (productsToDisplay.length === 0) {
        productsContainer.innerHTML = "<p>Ingen spil fundet. Prøv at ændre din søgning eller dine filtre.</p>";
        return;
    }

    // Gennemgår hvert spil i arrayet
    productsToDisplay.forEach(product => {

        // Laver stjerner ud fra spillets sværhedsgrad
        const ratingStars =
            "★".repeat(product.rating) +
            "☆".repeat(5 - product.rating);

        // Viser antal spillere
        const players = product.maxPlayers === Infinity
            ? `${product.minPlayers}+ spillere`
            : `${product.minPlayers}-${product.maxPlayers} spillere`;

        // Opretter produktkortet
        const productCard = document.createElement("article");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description}</p>

            <p>${players}</p>
            <p>${product.category}</p>
            <p>Varighed: ${product.durationLabel}</p>
            <p class="rating">${ratingStars}</p>

            <button class="show-product" data-id="${product.id}">
                Læs mere
            </button>
        `;

        // Tilføjer produktkortet til siden
        productsContainer.appendChild(productCard);
    });
}


// Åbner dialogboksen med information om et spil
function showProductDialog(productId) {

    // Finder spillet i products-arrayet
    const product = products.find(game => game.id === productId);

    // Stopper funktionen, hvis spillet ikke findes
    if (!product) return;

    // Laver stjerner ud fra sværhedsgraden
    const ratingStars =
        "★".repeat(product.rating) +
        "☆".repeat(5 - product.rating);

    // Viser oplysningerne i dialogboksen
    dialogImage.src = product.image;
    dialogImage.alt = product.title;

    dialogTitle.textContent = product.title;
    dialogDescription.textContent = product.description;

    dialogPrice.textContent = product.maxPlayers === Infinity
        ? `${product.minPlayers}+ spillere · ${product.durationLabel}`
        : `${product.minPlayers}-${product.maxPlayers} spillere · ${product.durationLabel}`;

    dialogCategory.textContent = product.category;
    dialogRating.textContent = ratingStars;

    // Åbner dialogboksen
    productDialog.showModal();
}


// Lytter efter klik på knapperne "Læs mere"
productsContainer.addEventListener("click", function(event) {

    // Undersøger om der blev klikket på en Læs mere-knap
    if (event.target.classList.contains("show-product")) {

        // Henter spillets ID fra knappen
        const productId = Number(event.target.dataset.id);

        // Åbner dialogboksen
        showProductDialog(productId);
    }
});


// Lukker dialogboksen
dialogClose.addEventListener("click", function() {
    productDialog.close();
});


// Lukker dialogboksen, hvis man klikker på overlayet
productDialog.addEventListener("click", function(event) {

    if (event.target === productDialog) {
        productDialog.close();
    }
const filterPanel = document.getElementById("filter-panel");
const overlay = document.getElementById("overlay");
const closeFilter = document.getElementById("close-filter");

// Åbner filterpanelet
filterToggle.addEventListener("click", function() {
    filterPanel.classList.add("active");
    overlay.classList.add("active");
});

// Lukker filterpanelet
function closeFilterPanel() {
    filterPanel.classList.remove("active");
    overlay.classList.remove("active");
}

// Lukker med krydset
closeFilter.addEventListener("click", closeFilterPanel);

// Lukker ved klik på overlay
overlay.addEventListener("click", closeFilterPanel);
    
});



