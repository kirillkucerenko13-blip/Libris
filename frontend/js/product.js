        let product = JSON.parse(localStorage.getItem('currentProduct')) || {
            title: "Whispers of Time",
            author: "Marcus Chen",
            price: 19.99,
            rating: 4.8,
            reviews: 521,
            category: "Historical Fiction",
            isbn: "978-1-234567-89-1",
            description: "An epic journey through different eras, exploring how the choices we make ripple through time. A beautifully crafted narrative that spans centuries.",
            image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&h=800&fit=crop"
        };

        function populateProduct() {
            document.getElementById('productImage').src = product.image;
            document.getElementById('productImage').alt = product.title;
            document.getElementById('productCategory').textContent = product.category || 'General';
            document.getElementById('productTitle').textContent = product.title;
            document.getElementById('productAuthor').textContent = `by ${product.author}`;
            document.getElementById('productRating').textContent = `${product.rating} (${product.reviews} reviews)`;
            document.getElementById('productPrice').textContent = `$${product.price}`;
            document.getElementById('productDescription').textContent = product.description || 'No description available.';
            document.getElementById('productISBN').textContent = product.isbn || 'N/A';
            document.getElementById('productCategoryDetail').textContent = product.category || 'General';
            const stars = document.querySelectorAll('.star');
            const fullStars = Math.floor(product.rating);
            stars.forEach((star, index) => {
                if (index < fullStars) {
                    star.style.color = 'var(--primary-brown)';
                } else {
                    star.style.color = '#E0E0E0';
                }
            });
        }

        let quantity = 1;

        function updateQuantity(change) {
            quantity = Math.max(1, quantity + change);
            document.getElementById('quantity').textContent = quantity;
        }

        function addToCart() {
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const existingItem = cartItems.find(item => item.title === product.title);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cartItems.push({
                    id: Date.now(),
                    title: product.title,
                    author: product.author,
                    price: product.price,
                    quantity: quantity,
                    image: product.image
                });
            }
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartBadge();
            window.location.href = 'cart.html';
        }

        function updateCartBadge() {
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
            const badge = document.getElementById('cartBadge');
            if (badge) {
                badge.textContent = totalItems;
            }
        }

        populateProduct();
        updateCartBadge();