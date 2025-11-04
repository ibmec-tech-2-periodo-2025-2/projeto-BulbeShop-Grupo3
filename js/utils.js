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
