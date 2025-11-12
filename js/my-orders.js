(function initMyOrders() {
  const container = document.querySelector('.orders-list');
  const customerId = OrderService.getCurrentUserId();
  const orders = OrderService.getOrdersByCustomer(customerId);

  if (!orders.length) {
    container.innerHTML = '<p style="padding:24px; text-align:center; color:#536679;">Você ainda não tem pedidos.</p>';
    return;
  }

  orders.forEach(order => {
    const el = document.createElement('article');
    el.className = 'order-card';
    el.style.border = '1px solid #e6e9ef';
    el.style.borderRadius = '12px';
    el.style.padding = '16px';
    el.style.marginBottom = '12px';

    const itemsHtml = order.items.map(it => `
      <li>#${it.id} — ${it.name} <strong>x${it.quantity}</strong> (R$ ${(it.price * it.quantity).toFixed(2)})</li>
    `).join('');

    el.innerHTML = `
      <h3 style="margin-bottom:6px;">${order.orderCode}</h3>
      <p style="margin:4px 0;">Data: ${new Date(order.createdAt).toLocaleString()}</p>
      <ul style="margin:8px 0 4px 18px;">${itemsHtml}</ul>
      <p style="margin:4px 0;">Subtotal: R$ ${order.subtotal.toFixed(2)} | Frete: R$ ${order.shipping.toFixed(2)}</p>
      <p style="margin:4px 0;"><strong>Total: R$ ${order.finalAmount.toFixed(2)}</strong> — Pagamento: ${order.paymentMethod.toUpperCase()}</p>
    `;
    container.appendChild(el);
  });
})();