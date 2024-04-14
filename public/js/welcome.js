let cartItems = [];

function updateCartCount() {
    const cartBtn = document.getElementById('cartBtn');
    cartBtn.textContent = `Cart (${cartItems.length})`;
}

function addToCart(productId) {
    cartItems.push(productId);
    updateCartCount();
    
    // Después de agregar el producto, redirige al usuario al carrito
    window.location.href = '/cart';
}

document.addEventListener('DOMContentLoaded', function() {
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = btn.dataset.productId;
            addToCart(productId);
        });
    });

    const logoutBtn = document.getElementById('logoutBtn');

    logoutBtn.addEventListener('click', async (e) => {
        try {
            const result = await fetch('http://localhost:8080/api/session/logout', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (result.ok) {
                alert('You have logged out successfully.');
                window.location.href = 'http://localhost:8080/login';
            } else {
                alert('There was a problem logging out. Please try again.');
            }
        } catch (error) {
            console.error('Logout error:', error);
            alert('There was a problem logging out. Please try again.');
        }
    });
});
