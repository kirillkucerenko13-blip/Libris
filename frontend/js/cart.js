
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        function renderCart() {
            const cartItemsContainer = document.getElementById('cartItems');
            const cartBadge = document.getElementById('cartBadge');
            
            if (cartItems.length === 0) {
                document.getElementById('cartLayout').innerHTML = `
                    <div class="empty-cart" style="grid-column: 1 / -1;">
                        <svg class="empty-cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        <h2 class="empty-cart-title">Your cart is empty</h2>
                        <p class="empty-cart-text">Add some books to get started!</p>
                        <button class="checkout-btn" onclick="window.location.href='catalog.html'">
                            Browse Catalog
                        </button>
                    </div>
                `;
                cartBadge.textContent = '0';
                return;
            }

            cartItemsContainer.innerHTML = '';
            
            cartItems.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.title}" class="item-image">
                    <div class="item-details">
                        <h3 class="item-title">${item.title}</h3>
                        <p class="item-author">${item.author}</p>
                        <div class="item-actions">
                            <div class="quantity-control">
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                                <span class="quantity-value">${item.quantity}</span>
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                            </div>
                            <button class="remove-btn" onclick="removeItem(${item.id})">
                                <svg class="remove-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                                Remove
                            </button>
                        </div>
                    </div>
                    <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                `;
                cartItemsContainer.appendChild(itemElement);
            });

            updateSummary();
        }

        function updateQuantity(itemId, change) {
            const item = cartItems.find(i => i.id === itemId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeItem(itemId);
                } else {
                    saveCart();
                    renderCart();
                }
            }
        }

        function removeItem(itemId) {
            cartItems = cartItems.filter(i => i.id !== itemId);
            saveCart();
            renderCart();
        }

        function saveCart() {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartBadge();
        }

        function updateCartBadge() {
            const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
            const badge = document.getElementById('cartBadge');
            if (badge) {
                badge.textContent = totalItems;
            }
        }

        function updateSummary() {
            const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const tax = subtotal * 0.10;
            const total = subtotal + tax;
            
            const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
            
            document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
            document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
            document.getElementById('total').textContent = `$${total.toFixed(2)}`;
            document.getElementById('cartBadge').textContent = totalItems;
        }

        renderCart();