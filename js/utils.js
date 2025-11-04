const ProductService = {
    cache: null,
    
    async fetchProducts() {
        if (this.cache) return this.cache;
        
        try {
            const response = await fetch('products.json');
            this.cache = await response.json();
            return this.cache;
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
            return [];
        }
    },
    
    clearCache() {
        this.cache = null;
    }
};

function createProductCard(product) {
    const article = document.createElement('article');
    article.className = 'product-card';
    article.dataset.id = product.id;
    
    article.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="discount-tag">-${product.discount}%</div>
        <h3 class="product-title">${product.name}</h3>
        <div class="product-rating">
            <img src="images/avaliacao.png" alt="5 estrelas">
            <span class="rating-count">(${product.ratingCount})</span>
        </div>
        <div class="price-initial">
            <span class="price-label-de">De</span>
            <span class="price-value-old">R$${product.oldPrice.toFixed(2)}</span>
            <span class="price-label-por">por</span>
        </div>
        <div class="price-final">
            <span class="price-currency">R$</span>
            <span class="price-value">${product.price.toFixed(2)}</span>
        </div>
    `;
    
    article.addEventListener('click', () => {
        window.location.href = `product-detail.html?id=${product.id}`;
    });
    
    return article;
}
