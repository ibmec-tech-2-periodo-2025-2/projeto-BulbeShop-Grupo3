async function loadFeaturedProducts() {
    try {
        const products = await ProductService.fetchProducts();
        
        const productGrid = document.querySelector('.product-grid-horizontal');
        productGrid.innerHTML = '';
        
        products.slice(0, 12).forEach(product => {
            const productCard = createProductCard(product);
            productGrid.appendChild(productCard);
        });
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

loadFeaturedProducts();
