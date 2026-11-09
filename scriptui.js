
"use strict";

// ---------------------------------
// HENTER ELEMENTER FRA HTML
// ---------------------------------

const productsContainer = document.getElementById("products-container");
const productDialog = document.getElementById("product-dialog");
const dialogImage = document.getElementById("dialog-image");
const dialogTitle = document.getElementById("dialog-title");
const dialogDescription = document.getElementById("dialog-description");
const dialogPrice = document.getElementById("dialog-price");
const dialogCategory = document.getElementById("dialog-category");
const dialogRating = document.getElementById("dialog-rating");
const dialogClose = document.getElementById("dialog-close");

// Filterelementer
const filterToggle = document.getElementById("filter-toggle");
const filterPanel = document.getElementById("filter-panel");
const overlay = document.getElementById("overlay");
const closeFilter = document.getElementById("close-filter");


// ---------------------------------
// IKONER TIL SPILTYPER
// ---------------------------------

const gameTypeIcons = {
    "Strategi": "img/strategi.png",
    "Kortspil": "img/kortspil.png",
    "Selskabsspil": "img/selskabsspil.png",
    "Quizspil": "img/quizspil.png"
};


// ---------------------------------
// IKONER TIL KATEGORIER
// ---------------------------------

const categoryIcons = {
    "Fordybelse": "img/dartskiven.png",
    "Hjernekraft": "img/hjerne.png",
    "Legende": "img/tryllestav.png",
    "Spænding": "img/taarn.png",
    "Kold sved": "img/hoved.png"
};


// ---------------------------------
// VISER SPILLENE
// ---------------------------------

function displayProducts(productsToDisplay) {

    productsContainer.innerHTML = "";

    if (productsToDisplay.length === 0) {
        productsContainer.innerHTML =
            "<p>Ingen spil fundet. Prøv at ændre dine filtre.</p>";
        return;
    }

    productsToDisplay.forEach(product => {

        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        // Finder det rigtige ikon til spiltypen
        const gameIcon = gameTypeIcons[product.gameType] || "";

        // Finder det rigtige ikon til kategorien
        const categoryIcon = categoryIcons[product.category] || "";

        productCard.innerHTML = `

            <!-- BILLEDOMRÅDE -->
            <div class="product-image-container">

                <!-- Spillets billede -->
                <img
                    src="${product.image}"
                    alt="${product.title}"
                    class="product-image"
                >

                <!-- Spiltype ikon øverst til venstre -->
                ${gameIcon ? `
                    <img
                        src="${gameIcon}"
                        class="game-type-icon icon-top"
                        alt="${product.gameType}"
                    >
                ` : ""}

        </div>


            <!-- INFORMATION OM SPILLET -->
            <div class="product-info">

            <!-- FLAG I HØJRE SIDE -->
    
            <div class="language-buttons">

            <button type="button" class="language-button" aria-label="English">
            <img src="img/eng-flag.png" alt="English">
        
        </button>

            <button type="button" class="language-button" aria-label="Dansk">
            <img src="img/dansk-flag.png" alt="Dansk">

        </button>

                <h3 class="product-title">
                    ${product.title}
                </h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <!-- KATEGORI OG BEDØMMELSE -->
                <div class="product-meta">

                    <span class="product-category">

                        ${categoryIcon ? `
                            <img
                                src="${categoryIcon}"
                                alt=""
                                class="category-icon"
                            >
                        ` : ""}

                        ${product.category}

                    </span>

                    <span class="product-rating">
                        ⭐ ${product.rating}/5
                    </span>

                </div>

                <!-- SE MERE KNAP -->
                <button
                    class="product-button show-product"
                    data-id="${product.id}"
                >
                    Se mere
                </button>

            </div>

            <!-- Spiltype ikon nederst til højre -->
            ${gameIcon ? `
                <img
                    src="${gameIcon}"
                    class="game-type-icon icon-bottom"
                    alt="${product.gameType}"
                >
            ` : ""}

        `;

        productsContainer.appendChild(productCard);

    });
}




// ---------------------------------
// VISER DIALOG MED SPILINFORMATION
// ---------------------------------

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


// ---------------------------------
// KLIK PÅ SE MERE
// ---------------------------------

productsContainer.addEventListener("click", function(event) {

    if (event.target.closest(".show-product")) {

        const button = event.target.closest(".show-product");
        const productId = Number(button.dataset.id);

        showProductDialog(productId);

    }

});


// ---------------------------------
// LUK DIALOGBOKS
// ---------------------------------

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


// ---------------------------------
// VISER ALLE SPIL VED OPSTART
// ---------------------------------

displayProducts(products);
