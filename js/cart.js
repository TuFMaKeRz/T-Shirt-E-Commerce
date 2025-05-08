document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('.cart-page')) return;
    
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // Load cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        checkoutBtn.disabled = true;
        return;
    }
    
    // Display cart items
    let total = 0;
    cartItemsContainer.innerHTML = '';
    
    cart.forEach((item, index) => {
        total += item.price;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
                <div class="cart-item-actions">
                    <select class="quantity-selector">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <button class="remove-item" data-index="${index}">Remove</button>
                </div>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Update total
    cartTotal.textContent = `$${total.toFixed(2)}`;
    
    // Remove item functionality
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            location.reload(); // Refresh to show updated cart
        });
    });
    
    // Quantity selector functionality
    document.querySelectorAll('.quantity-selector').forEach(select => {
        select.addEventListener('change', function() {
            // Implement quantity update logic here
            // Would need to update cart in localStorage and recalculate total
        });
    });
    
    // Checkout button
    checkoutBtn.addEventListener('click', function() {
        // Implement checkout logic here
        alert('Proceeding to checkout!');
    });
});