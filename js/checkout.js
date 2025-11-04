const SHIPPING_COST = 15.00;
const PIX_DISCOUNT = 0.10;

function loadCheckoutItems() {
    const cart = CartService.getCart();
    
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
}

function calculateTotal() {
    const subtotal = CartService.getTotal();
    const total = subtotal + SHIPPING_COST;
    
    return { subtotal, total };
}

function calculatePixDiscount() {
    const { total } = calculateTotal();
    return total * (1 - PIX_DISCOUNT);
}
