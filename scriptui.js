// -------------- Javascript til håndtering af filtreringspanel -----------------
// -------------- og visning af produkt-kort og dialogboks.     -----------------
// DOM elementer
const filterPanel = document.getElementById('filter-panel');
const overlay = document.getElementById('overlay');
const filterToggle = document.getElementById('filter-toggle');
const closeFilter = document.getElementById('close-filter');
const productsContainer = document.getElementById('products-container');


function displayProducts(productsToDisplay) {
    productsContainer.innerHTML = '';

    if (productsToDisplay.length === 0) {
        productsContainer.innerHTML = '<p class="no-products">Ingen produkter fundet. Prøv at justere dine filtre.</p>';
        return;
    }

    // Vis produkter
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        const ratingStars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-meta">
                    <span class="product-price">${product.price.toLocaleString('da-DK')} DKK</span>
                    <span class="product-category">${product.category}</span>
                </div>
                <div class="product-rating">${ratingStars}</div>
                <button class="product-button" onclick="showProductDialog(${product.id})">Vis</button>
            </div>
        `;

        productsContainer.appendChild(productCard);
    });
}

const dialog = document.getElementById('product-dialog');

// Åbner dialogen og udfylder felterne med det valgte produkt
function showProductDialog(productId) {
    const product = products.find(p => p.id === productId);
    document.getElementById('dialog-image').src = product.image;
    document.getElementById('dialog-image').alt = product.title;
    document.getElementById('dialog-title').textContent = product.title;
    document.getElementById('dialog-description').textContent = product.description;
    document.getElementById('dialog-price').textContent = product.price.toLocaleString('da-DK') + ' DKK';
    document.getElementById('dialog-category').textContent = product.category;

    const ratingStars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
    document.getElementById('dialog-rating').textContent = ratingStars;

    dialog.showModal(); // åbner som modal med baggrundsdæmpning
}


// Event listeners til håndtering af brugergrænseflade
filterToggle.addEventListener('click', toggleFilterPanel);
closeFilter.addEventListener('click', closeFilterPanel);
overlay.addEventListener('click', closeFilterPanel);
// Luk-knappen i dialogboksen
document.getElementById('dialog-close').addEventListener('click', () => dialog.close());

// Luk filter panel
function closeFilterPanel() {
    filterPanel.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Åbn/luk filter panel
function toggleFilterPanel() {
    filterPanel.classList.toggle('active');
    overlay.classList.toggle('active');

    if (filterPanel.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Luk med filter panel med Escape tast
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && filterPanel.classList.contains('active')) {
        closeFilterPanel();
    }
});

// Initial visning
window.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
});