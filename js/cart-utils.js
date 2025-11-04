const CartService = {
    STORAGE_KEY: 'cart',
    
    getCart() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    },
    
    setCart(cart) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
    }
};
