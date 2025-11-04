async function loadProducts() {
    try {
        const products = await ProductService.fetchProducts();
        displayCategoryProducts(products);
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

function displayCategoryProducts(allProducts) {
    const category = getURLParam('category') || '';
    
    updateBreadcrumb(category);
    
    const filteredProducts = category 
        ? allProducts.filter(product => product.category === category)
        : allProducts;
    
    const productList = document.querySelector('.products-grid');
    if (!productList) return;
    productList.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productList.appendChild(productCard);
    });
}

function updateBreadcrumb(category) {
    const breadcrumbSpan = document.querySelector('.breadcrumbs span');
    if (breadcrumbSpan && category) {
        breadcrumbSpan.textContent = category;
    }
}

loadProducts();
