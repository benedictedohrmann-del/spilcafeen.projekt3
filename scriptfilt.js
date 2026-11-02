"use strict";
function filtrerProdukter() {

    // Kopierer alle spil fra data.js
    let filteredProducts = [...products];


    // 1. SØGNING
    const searchText = document.getElementById("search-input").value.toLowerCase().trim();

    if (searchText) {
        filteredProducts = filteredProducts.filter(product =>
            product.title.toLowerCase().includes(searchText) ||
            product.description.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText) ||
            product.gameType.toLowerCase().includes(searchText) ||
            product.language.toLowerCase().includes(searchText)
        );
    }


    // 2. KATEGORI / STEMNING
    const categories = Array.from(
        document.querySelectorAll('input[name="category"]:checked')
    ).map(cb => cb.value);

    if (categories.length > 0 && !categories.includes("Alle")) {
        filteredProducts = filteredProducts.filter(product =>
            categories.includes(product.category)
        );
    }


    // 3. ANTAL SPILLERE
    const minPlayersInput = document.getElementById("min-price").value;
    const maxPlayersInput = document.getElementById("max-price").value;

    const minPlayers = minPlayersInput !== "" ? Number(minPlayersInput) : null;
    const maxPlayers = maxPlayersInput !== "" ? Number(maxPlayersInput) : null;

    if (minPlayers !== null) {
        filteredProducts = filteredProducts.filter(product =>
            product.maxPlayers >= minPlayers
        );
    }

    if (maxPlayers !== null) {
        filteredProducts = filteredProducts.filter(product =>
            product.minPlayers <= maxPlayers
        );
    }


    // 4. SVÆRHEDSGRAD
    const rating = document.querySelector(
        'input[name="rating"]:checked'
    )?.value;

    if (rating !== undefined) {
        filteredProducts = filteredProducts.filter(product =>
            product.rating === Number(rating)
        );
    }


    // 5. VARIGHED
    const durations = Array.from(
        document.querySelectorAll('input[name="duration"]:checked')
    ).map(cb => cb.value);

    if (durations.length > 0) {

        filteredProducts = filteredProducts.filter(product =>
            durations.some(duration => {

                // 60 minutter eller mere
                if (duration === "60+ min") {
                    return product.duration >= 60;
                }

                // Opdel tidsintervallet
                const [min, max] = duration
                    .replace(" min", "")
                    .replace(" Min", "")
                    .split("-")
                    .map(Number);

                return product.duration >= min &&
                    product.duration <= max;
            })
        );
    }


    // 6. FORUDDEFINEREDE VALG
    const sorterEfter = document.getElementById("predefined-search").value;

    if (sorterEfter === "2-3 personer") {

        filteredProducts = filteredProducts.filter(product =>
            product.maxPlayers >= 2 &&
            product.minPlayers <= 3
        );
    }

    if (sorterEfter === "3+ personer") {

        filteredProducts = filteredProducts.filter(product =>
            product.maxPlayers >= 3
        );
    }


    // 7. MEST POPULÆRE
    if (sorterEfter === "populaere") {
        filteredProducts.sort((a, b) =>
            b.popularity - a.popularity
        );
    }


    // VIS RESULTATER
    displayProducts(filteredProducts);

}


// EVENT LISTENERS

// Søg efter spil
document.getElementById("search-input").addEventListener("input", filtrerProdukter);

// Vælg foruddefineret søgning
document.getElementById("predefined-search").addEventListener("change", filtrerProdukter);

// Anvend filtre
document.getElementById("apply-filters").addEventListener("click", function() {
    filtrerProdukter();
    closeFilterPanel();
});

