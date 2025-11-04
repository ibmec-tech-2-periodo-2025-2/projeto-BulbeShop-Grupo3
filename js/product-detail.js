let currentProduct = null;

async function loadProductDetail() {
    const productId = parseInt(getURLParam('id'));
    
    try {
        const products = await ProductService.fetchProducts();
        currentProduct = products.find(p => p.id === productId);
        
        if (currentProduct) {
            displayProduct(currentProduct);
        }
    } catch (error) {
        console.error('Erro ao carregar produto:', error);
    }
}
