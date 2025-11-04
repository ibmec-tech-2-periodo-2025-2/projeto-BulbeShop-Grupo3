let currentProduct = null;

async function loadProductDetail() {
    const productId = parseInt(getURLParam('id'));
    
    try {
        const products = await ProductService.fetchProducts();
        currentProduct = products.find(p => p.id === productId);
        
        if (currentProduct) {
            displayProduct(currentProduct);
        }
    } catch (error) {
        console.error('Erro ao carregar produto:', error);
    }
}

function displayProduct(product) {
    document.querySelector('.product-title').textContent = product.name;
    document.querySelector('.main-image').src = product.image;
    document.querySelector('.main-image').alt = product.name;
    document.querySelector('.rating-count').textContent = `(${product.ratingCount})`;
    document.querySelector('.price-value-old').textContent = `R$${product.oldPrice.toFixed(2)}`;
    document.querySelector('.price-value').textContent = product.price.toFixed(2);
    document.querySelector('.product-description').textContent = product.description;
    document.querySelector('.discount-tag').textContent = `-${product.discount}% OFF`;
    
    document.querySelectorAll('.thumbnail img').forEach(img => {
        img.src = product.image;
        img.alt = product.name;
    });
}
