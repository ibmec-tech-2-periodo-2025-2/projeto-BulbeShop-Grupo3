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
