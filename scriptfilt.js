// Her skal vi skrive vores søge-, sortering- og filtreringskoder
function filtrerProdukter(list) {
    let filteredProducts =[...products];
    
    const searchText = document.getElementById("search-input") .value.toLowerCase(). trim();

    if (searchText) {
        filteredProducts =filteredProducts.filter(product =>
    product.title.toLowerCase(). includes(searchText)||
    product.description.toLowerCase().includes(searchText)||
    product.category.toLowerCase().includes(searchText)
);
}

const
categories = Array.from(document.querySelectorAll(`input[name="category"]:checked`)) .map(cb => cb.value);
const
colors = Array.from(document.querySelectorAll(`input[name="color"]:checked`)) .map(cb => cb.value);
const minPrice = parseFloat(document.getElementById ('min-price') .value);
const maxPrice = parseFloat(document.getElementById ('max-price').value);
const
rating = document.querySelector('input[name="rating"]:checked')?.value|| null;

if(categories.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
    categories.includes(product.category)
);
}
if (colors.length > 0){
    filteredProducts = filteredProducts.filter(product => 
    colors.includes(product.color)
    );
}
if(!isNaN(minPrice)){
    filteredProducts = filteredProducts.filter(product => 
    product.price >= minPrice
    );
}
if(!isNaN(maxPrice)){
    filteredProducts = filteredProducts.filter(product => 
    product.price <= maxPrice
    );
}
if(rating !== null) {
    filteredProducts =filteredProducts.filter(product =>
        product.rating >= Number(rating)
    );
}

const sorterEfter = document.getElementById ("predefined-search") .value;
if(sorterEfter && sorterEfter === "populaere") {
    filteredProducts.sort((a,b)=> b.rating - a.rating);
}

if(sorterEfter && sorterEfter === "pris-stigende") {
    filteredProducts.sort((a,b)=> b.price - a.price);
}
if(sorterEfter && sorterEfter === "pris-faldende") {
    filteredProducts.sort((a,b)=> a.price - b.price);
}

displayProducts(filteredProducts);
};

document.getElementById("search-input").addEventListener("input", 
    filtrerProdukter);
document.getElementById("predefined-search").addEventListener("change", 
    filtrerProdukter);
document.getElementById(`apply-filters`).addEventListener(`click`, function (){
    filtrerProdukter();
    closeFilterPanel();
});