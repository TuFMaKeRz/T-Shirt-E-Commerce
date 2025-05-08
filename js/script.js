document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const productsGrid = document.getElementById('products-grid');
    const quickViewModal = document.getElementById('quick-view-modal');
    const modalProductDetails = document.getElementById('modal-product-details');
    const closeModal = document.querySelector('.close-modal');
    const cartCount = document.querySelector('.cart-count');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const closeMobileMenu = document.querySelector('.close-mobile-menu');
    
    // Cart state
    let cart = [];
    
    // Fetch products from JSON file
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            displayProducts(data.products);
        })
        .catch(error => console.error('Error loading products:', error));
    
    // Display products on the page
    function displayProducts(products) {
        productsGrid.innerHTML = '';
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <div class="product-actions">
                        <button class="quick-view-btn" data-id="${product.id}">Quick View</button>
                        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
        });
        
        // Add event listeners to quick view buttons
        document.querySelectorAll('.quick-view-btn').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                openQuickView(productId);
            });
        });
        
        // Add event listeners to add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                addToCart(productId);
            });
        });
    }
    
    // Open quick view modal
    function openQuickView(productId) {
        fetch('products.json')
            .then(response => response.json())
            .then(data => {
                const product = data.products.find(p => p.id === productId);
                if (product) {
                    displayProductDetails(product);
                    quickViewModal.style.display = 'block';
                }
            });
    }
    
    // Display product details in modal
    function displayProductDetails(product) {
        modalProductDetails.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="modal-product-image">
            <div class="modal-product-info">
                <h2 class="modal-product-name">${product.name}</h2>
                <p class="modal-product-price">$${product.price.toFixed(2)}</p>
                <p class="modal-product-description">${product.description}</p>
                <ul class="modal-product-details-list">
                    <li><strong>Details:</strong> ${product.details}</li>
                    <li><strong>Available Sizes:</strong> ${product.sizes.join(', ')}</li>
                    <li><strong>Colors:</strong> ${product.colors.join(', ')}</li>
                </ul>
                <div class="size-selector">
                    <label>Select Size:</label>
                    <div class="size-options">
                        ${product.sizes.map(size => 
                            `<div class="size-option" data-size="${size}">${size}</div>`
                        ).join('')}
                    </div>
                </div>
                <button class="modal-add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        // Add event listeners to size options
        document.querySelectorAll('.size-option').forEach(option => {
            option.addEventListener('click', function() {
                document.querySelectorAll('.size-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                this.classList.add('selected');
            });
        });
        
        // Add event listener to modal add to cart button
        document.querySelector('.modal-add-to-cart').addEventListener('click', function() {
            addToCart(product.id);
        });
    }
    
    // Add product to cart
    function addToCart(productId) {
        fetch('products.json')
            .then(response => response.json())
            .then(data => {
                const product = data.products.find(p => p.id === productId);
                if (product) {
                    cart.push(product);
                    updateCartCount();
                    alert(`${product.name} added to cart!`);
                }
            });
    }
    
   // Update cart count
   function updateCartCount() {
    cartCount.textContent = cart.length;
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Close modal when clicking X
closeModal.addEventListener('click', function() {
    quickViewModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === quickViewModal) {
        quickViewModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Mobile menu functionality
mobileMenuBtn.addEventListener('click', function() {
    mobileMenuOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

closeMobileMenu.addEventListener('click', function() {
    mobileMenuOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close mobile menu when clicking outside
mobileMenuOverlay.addEventListener('click', function(e) {
    if (e.target === mobileMenuOverlay) {
        mobileMenuOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Add notification styles dynamically
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--accent-color);
        color: white;
        padding: 15px 30px;
        border-radius: 5px;
        font-weight: 600;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 10000;
    }
    
    .notification.show {
        opacity: 1;
    }
`;
document.head.appendChild(style);
});