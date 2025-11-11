function loadCart() {
    const cart = CartService.getCart();
    const cartItemsContainer = document.querySelector('.cart-items');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; padding: 40px;">Seu carrinho está vazio</p>';
        updateSubtotal();
        renderRecommendations();
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = createCartItem(item);
        cartItemsContainer.appendChild(cartItem);
    });
    
    updateSubtotal();
    renderRecommendations();
}

function createCartItem(item) {
    const article = document.createElement('article');
    article.className = 'cart-item';
    article.dataset.id = item.id;
    
    article.innerHTML = `
        <div>
            <div class="item-image-container">
                <img src="${item.image}" alt="${item.name}" class="item-image">
            </div>
            
            <div class="item-details">
                <h3 class="item-title">${item.name}</h3>
                
                <div class="item-rating">
                    <img src="images/avaliacao.png" alt="5 estrelas">
                    <span class="rating-count">(${item.ratingCount})</span>
                </div>
                
                <div class="item-price-initial">
                    <span class="price-label-de">De</span>
                    <span class="price-value-old" data-old-price-id="${item.id}">R$${(item.oldPrice * item.quantity).toFixed(2)}</span>
                    <span class="price-label-por">por</span>
                </div>
                
                <div class="item-price-final">
                    <span class="price-currency">R$</span>
                    <span class="price-value" data-item-id="${item.id}">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            </div>
        </div>

        <label for="quantity-${item.id}" class="quantity-label">Quantidade:</label>
        <div class="item-quantity-selector">
            <button class="quantity-btn decrease" data-id="${item.id}" aria-label="Diminuir quantidade">-</button>
            <input type="number" id="quantity-${item.id}" class="quantity-input" value="${item.quantity}" min="1" max="99" data-id="${item.id}">
            <button class="quantity-btn increase" data-id="${item.id}" aria-label="Aumentar quantidade">+</button>
        </div>
    `;
    
    article.querySelector('.decrease').addEventListener('click', () => decreaseQuantity(item.id));
    article.querySelector('.increase').addEventListener('click', () => increaseQuantity(item.id));
    article.querySelector('.quantity-input').addEventListener('change', (e) => updateQuantity(item.id, parseInt(e.target.value)));
    
    return article;
}

function decreaseQuantity(itemId) {
    const cart = CartService.getCart();
    const item = cart.find(i => i.id === itemId);
    
    if (item) {
        if (item.quantity === 1) {
            removeItem(itemId);
        } else {
            CartService.updateItemQuantity(itemId, item.quantity - 1);
            updateItemPrice(itemId, item.price, item.quantity - 1);
            updateSubtotal();
            renderRecommendations();
        }
    }
}

function increaseQuantity(itemId) {
    const cart = CartService.getCart();
    const item = cart.find(i => i.id === itemId);
    
    if (item && item.quantity < 99) {
        CartService.updateItemQuantity(itemId, item.quantity + 1);
        updateItemPrice(itemId, item.price, item.quantity + 1);
        updateSubtotal();
        renderRecommendations();
    }
}

function updateQuantity(itemId, newQuantity) {
    if (CartService.updateItemQuantity(itemId, newQuantity)) {
        const cart = CartService.getCart();
        const item = cart.find(i => i.id === itemId);
        if (item) {
            updateItemPrice(itemId, item.price, item.quantity);
            updateSubtotal();
            renderRecommendations();
        }
    }
}

function removeItem(itemId) {
    CartService.removeItem(itemId);
    loadCart();
}

function updateItemPrice(itemId, unitPrice, quantity) {
    const cart = CartService.getCart();
    const item = cart.find(i => i.id === itemId);
    
    if (!item) return;
    
    const priceElement = document.querySelector(`[data-item-id="${itemId}"]`);
    if (priceElement) {
        priceElement.textContent = (unitPrice * quantity).toFixed(2);
    }
    
    const oldPriceElement = document.querySelector(`[data-old-price-id="${itemId}"]`);
    if (oldPriceElement) {
        oldPriceElement.textContent = `R$${(item.oldPrice * quantity).toFixed(2)}`;
    }
    
    const quantityInput = document.getElementById(`quantity-${itemId}`);
    if (quantityInput) {
        quantityInput.value = quantity;
    }
}

function updateSubtotal() {
    const subtotal = CartService.getTotal();
    
    const subtotalBtn = document.getElementById('subtotal-btn');
    if (subtotalBtn) {
        subtotalBtn.textContent = `Subtotal R$: ${subtotal.toFixed(2)}`;
    }
}

document.getElementById('checkout-btn').addEventListener('click', () => {
    const cart = CartService.getCart();
    if (cart.length > 0) {
        window.location.href = 'checkout.html';
    } else {
        alert('Seu carrinho está vazio!');
    }
});

loadCart();

/* Helpers de recomendações */
function getCartProductIds() {
    return CartService.getCart().map(item => item.id);
}

function getCartCategories(allProducts) {
    const ids = new Set(getCartProductIds());
    const categoriesSet = new Set();
    
    allProducts.forEach(product => {
        if (ids.has(product.id) && product.category) {
            categoriesSet.add(product.category);
        }
    });
    
    return Array.from(categoriesSet);
}

async function fetchAllProducts() {
    try {
        const products = await ProductService.fetchProducts();
        return Array.isArray(products) ? products : [];
    } catch (error) {
        console.error('Erro ao buscar produtos para recomendações:', error);
        return [];
    }
}

function getRecommendedCandidates(allProducts) {
    const cartIds = new Set(getCartProductIds());
    const categories = new Set(getCartCategories(allProducts));
    
    if (categories.size === 0) return [];
    
    return allProducts.filter(product => {
        const inSameCategory = product.category && categories.has(product.category);
        const notInCart = !cartIds.has(product.id);
        return inSameCategory && notInCart;
    });
}

function limitRecommendationsByCategory(candidates, limitPerCategory = 10) {
    const uniqueIds = new Set();
    const categoryCount = new Map();
    const limited = [];
    
    for (const product of candidates) {
        if (!product || !product.id || !product.category) continue;
        if (uniqueIds.has(product.id)) continue;
        
        const count = categoryCount.get(product.category) || 0;
        if (count >= limitPerCategory) continue;
        
        uniqueIds.add(product.id);
        categoryCount.set(product.category, count + 1);
        limited.push(product);
    }
    
    return limited;
}

function buildRecommendationCards(products) {
    if (!Array.isArray(products) || products.length === 0) return [];
    return products.map(product => createProductCard(product));
}

async function renderRecommendations() {
    const section = document.getElementById('cart-recommendations');
    const track = document.getElementById('recommendations-track');
    if (!section || !track) return;
    
    const allProducts = await fetchAllProducts();
    const candidates = getRecommendedCandidates(allProducts);
    const limited = limitRecommendationsByCategory(candidates);
    const cards = buildRecommendationCards(limited);
    
    track.innerHTML = '';
    cards.forEach(card => track.appendChild(card));
    
    if (cards.length > 0) {
        section.hidden = false;
    } else {
        section.hidden = true;
    }
}