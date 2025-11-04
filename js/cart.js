function loadCart() {
    const cart = CartService.getCart();
    const cartItemsContainer = document.querySelector('.cart-items');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; padding: 40px;">Seu carrinho está vazio</p>';
        updateSubtotal();
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = createCartItem(item);
        cartItemsContainer.appendChild(cartItem);
    });
    
    updateSubtotal();
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
