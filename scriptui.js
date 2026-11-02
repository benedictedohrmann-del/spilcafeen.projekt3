"use strict";

// Henter elementer fra HTML
const productsContainer = document.getElementById("products-container");
const productDialog = document.getElementById("product-dialog");
const dialogImage = document.getElementById("dialog-image");
const dialogTitle = document.getElementById("dialog-title");
const dialogDescription = document.getElementById("dialog-description");
const dialogPrice = document.getElementById("dialog-price");
const dialogCategory = document.getElementById("dialog-category");
const dialogRating = document.getElementById("dialog-rating");
const dialogClose = document.getElementById("dialog-close");

// Henter filterelementer fra HTML
const filterToggle = document.getElementById("filter-toggle");
const filterPanel = document.getElementById("filter-panel");
const overlay = document.getElementById("overlay");
const closeFilter = document.getElementById("close-filter");

// Viser produkterne
function displayProducts(productsToDisplay) {
    productsContainer.innerHTML = "";

    if (productsToDisplay.length === 0) {
        productsContainer.innerHTML =
            "<p>Ingen produkter fundet. Prøv at justere dine filtre.</p>";
        return;
    }

    productsToDisplay.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">

            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>

                <div class="product-meta">
                    <span class="product-category">${product.category}</span>
                    <span class="product-rating">⭐ ${product.rating}/5</span>
                </div>

                <button class="product-button show-product" data-id="${product.id}">
                    Se mere
                </button>
            </div>
        `;

        productsContainer.appendChild(productCard);
    });
}

// Viser dialog med produktinformation
function showProductDialog(productId) {
    const product = products.find(p => p.id === productId);

    if (!product) return;

    dialogImage.src = product.image;
    dialogImage.alt = product.title;
    dialogTitle.textContent = product.title;
    dialogDescription.textContent = product.description;
    dialogPrice.textContent = product.durationLabel;
    dialogCategory.textContent = product.category;
    dialogRating.textContent = product.rating + "/5";

    productDialog.showModal();
}

// Klik på produktknap
productsContainer.addEventListener("click", function(event) {
    if (event.target.classList.contains("show-product")) {
        const productId = Number(event.target.dataset.id);
        showProductDialog(productId);
    }
});

// Lukker dialog med kryds
dialogClose.addEventListener("click", function() {
    productDialog.close();
});

// Lukker dialog ved klik udenfor
productDialog.addEventListener("click", function(event) {
    if (event.target === productDialog) {
        productDialog.close();
    }
});


// ---------------------------------
// FILTERPANEL
// ---------------------------------

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


// Viser alle produkter ved opstart
displayProducts(products);


