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

const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
const cardFields = document.getElementById('card-fields');
const pixFields = document.getElementById('pix-fields');
const boletoFields = document.getElementById('boleto-fields');

paymentMethods.forEach(method => {
    method.addEventListener('change', (e) => {
        cardFields.style.display = 'none';
        pixFields.style.display = 'none';
        boletoFields.style.display = 'none';
        
        if (e.target.value === 'credit-card') {
            cardFields.style.display = 'flex';
        } else if (e.target.value === 'pix') {
            pixFields.style.display = 'flex';
        } else if (e.target.value === 'boleto') {
            boletoFields.style.display = 'flex';
        }
    });
});

const checkoutForm = document.getElementById('checkout-form');

checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        const orderCode = generateOrderCode();
        localStorage.setItem('orderCode', orderCode);
        
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
        const { total } = calculateTotal();
        const finalAmount = paymentMethod === 'pix' ? calculatePixDiscount() : total;
        
        localStorage.setItem('orderAmount', finalAmount.toFixed(2));
        localStorage.setItem('orderPayment', paymentMethod);
        
        CartService.clearCart();
        
        window.location.href = 'confirmation.html';
    }
});

function generateOrderCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 10; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}
