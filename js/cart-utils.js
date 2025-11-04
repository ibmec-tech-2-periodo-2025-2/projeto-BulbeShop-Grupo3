const CartService = {
    STORAGE_KEY: 'cart',
    
    getCart() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    },
    
    setCart(cart) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
    },
    
    addItem(product, quantity = 1) {
        const cart = this.getCart();
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                oldPrice: product.oldPrice,
                image: product.image,
                rating: product.rating,
                ratingCount: product.ratingCount,
                quantity: quantity
            });
        }
        
        this.setCart(cart);
    }
};
