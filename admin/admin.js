let products = [];
let editingId = null;

const form = document.getElementById('product-form');
const cancelBtn = document.getElementById('cancel-btn');
const productsList = document.getElementById('products-list');
const imageInput = document.getElementById('product-image');
const imagePreview = document.getElementById('image-preview');
const previewImg = document.getElementById('preview-img');

async function loadProducts() {
    try {
        const response = await fetch('/api/products');
        products = await response.json();
        displayProducts();
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        alert('Erro ao carregar produtos. Certifique-se de que o servidor está rodando.');
    }
}

function displayProducts() {
    productsList.innerHTML = '';
    
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>R$ ${product.price.toFixed(2)}</td>
            <td>${product.discount}%</td>
            <td>
                <div class="action-btns">
                    <button class="btn-small btn-edit" onclick="editProduct(${product.id})">Editar</button>
                    <button class="btn-small btn-delete" onclick="deleteProduct(${product.id})">Excluir</button>
                </div>
            </td>
        `;
        productsList.appendChild(row);
    });
}

let currentImagePath = '';

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    editingId = id;
    currentImagePath = product.image;
    
    document.getElementById('product-id').value = product.id;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-description').value = product.description;
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-old-price').value = product.oldPrice;
    document.getElementById('product-discount').value = product.discount;
    document.getElementById('product-rating').value = product.rating;
    document.getElementById('product-rating-count').value = product.ratingCount;
    
    const currentImageEl = document.getElementById('current-image');
    currentImageEl.textContent = `Imagem atual: ${product.image}`;
    currentImageEl.style.display = 'block';
    
    previewImg.src = '../' + product.image;
    imagePreview.style.display = 'block';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function deleteProduct(id) {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;
    
    products = products.filter(p => p.id !== id);
    await saveProducts();
    displayProducts();
}

function clearForm() {
    form.reset();
    editingId = null;
    currentImagePath = '';
    document.getElementById('product-id').value = '';
    document.getElementById('current-image').style.display = 'none';
    imagePreview.style.display = 'none';
    previewImg.src = '';
}
