const OrderService = {
  ORDERS_KEY: 'orders',
  LAST_ORDER_ID_KEY: 'lastOrderId',
  USER_KEY: 'userId',

  getCurrentUserId() {
    let id = localStorage.getItem(this.USER_KEY);
    if (!id) {
      // Gera um identificador simples e persistente
      id = 'guest-' + Math.random().toString(36).slice(2, 8);
      localStorage.setItem(this.USER_KEY, id);
    }
    return id;
  },

  _readAll() {
    return JSON.parse(localStorage.getItem(this.ORDERS_KEY)) || [];
  },

  _writeAll(list) {
    localStorage.setItem(this.ORDERS_KEY, JSON.stringify(list));
  },

};