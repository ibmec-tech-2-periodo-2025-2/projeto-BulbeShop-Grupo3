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

const quantityInput = document.getElementById('quantity-input');
const decreaseBtn = document.getElementById('decrease-btn');
const increaseBtn = document.getElementById('increase-btn');
const addToCartBtn = document.getElementById('add-to-cart-btn');
const buyNowBtn = document.getElementById('buy-now-btn');

decreaseBtn.addEventListener('click', () => {
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
});

increaseBtn.addEventListener('click', () => {
    const currentValue = parseInt(quantityInput.value);
    if (currentValue < 99) {
        quantityInput.value = currentValue + 1;
    }
});

addToCartBtn.addEventListener('click', () => {
    if (currentProduct) {
        CartService.addItem(currentProduct, parseInt(quantityInput.value));
        alert('Produto adicionado ao carrinho!');
    }
});

buyNowBtn.addEventListener('click', () => {
    if (currentProduct) {
        CartService.addItem(currentProduct, parseInt(quantityInput.value));
        window.location.href = 'cart.html';
    }
});
