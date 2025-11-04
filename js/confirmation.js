function displayOrderConfirmation() {
    const orderCode = localStorage.getItem('orderCode');
    
    if (!orderCode) {
        window.location.href = 'index.html';
        return;
    }
    
    const confirmationContent = document.querySelector('.confirmation-content');
    
    const orderCodeElement = document.createElement('p');
    orderCodeElement.className = 'order-code';
    orderCodeElement.style.cssText = 'font-family: Poppins; font-weight: 600; font-size: 20px; color: #08068D;';
    orderCodeElement.textContent = `Código do pedido: ${orderCode}`;
    
    const deliveryInfo = confirmationContent.querySelector('.delivery-info');
    confirmationContent.insertBefore(orderCodeElement, deliveryInfo);
    
    localStorage.removeItem('orderCode');
    localStorage.removeItem('orderAmount');
    localStorage.removeItem('orderPayment');
}

displayOrderConfirmation();
