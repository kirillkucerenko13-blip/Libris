const featuredBooks = [
            {
                title: "The Midnight Garden",
                author: "Emily Harper",
                price: 24.99,
                rating: 4.5,
                reviews: 342,
                image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=560&fit=crop"
            },
            {
                title: "Whispers of Time",
                author: "Marcus Chen",
                price: 19.99,
                rating: 4.8,
                reviews: 521,
                image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=560&fit=crop"
            },
            {
                title: "Modern Horizons",
                author: "Sarah Mitchell",
                price: 29.99,
                rating: 4.3,
                reviews: 187,
                image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=560&fit=crop"
            },
            {
                title: "The Art of Living",
                author: "David Richardson",
                price: 22.99,
                rating: 4.6,
                reviews: 892,
                image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=560&fit=crop"
            }
        ];

        const bestsellers = [
            {
                title: "Ocean's Echo",
                author: "Jennifer Blake",
                price: 26.99,
                rating: 4.7,
                reviews: 1203,
                image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=560&fit=crop"
            },
            {
                title: "The Silent Crown",
                author: "Alexander Stone",
                price: 21.99,
                rating: 4.9,
                reviews: 2156,
                image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=560&fit=crop"
            },
            {
                title: "Fragments of Light",
                author: "Maya Rodriguez",
                price: 18.99,
                rating: 4.4,
                reviews: 987,
                image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=560&fit=crop"
            },
            {
                title: "Beyond the Veil",
                author: "Thomas Wright",
                price: 23.99,
                rating: 4.6,
                reviews: 1534,
                image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=560&fit=crop"
            }
        ];

        function addToCart(book) {
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
            const existingItem = cartItems.find(item => item.title === book.title);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cartItems.push({
                    id: Date.now(), 
                    title: book.title,
                    author: book.author,
                    price: book.price,
                    quantity: 1,
                    image: book.image
                });
            }
            
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            updateCartBadge();
        }

        function renderBooks(containerId, booksArray) {
            const grid = document.getElementById(containerId);
            grid.innerHTML = '';
            
            booksArray.forEach((book, index) => {
                const bookCard = document.createElement('div');
                bookCard.className = 'book-card';
                bookCard.style.cursor = 'pointer';
                
                bookCard.innerHTML = `
                    <div class="book-image-container" onclick="viewProduct(${JSON.stringify(book).replace(/"/g, '&quot;')})">
                        <img src="${book.image}" alt="${book.title}" class="book-image">
                    </div>
                    <div class="book-info">
                        <div class="book-rating">
                            <svg class="star-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <span class="rating-text">${book.rating} (${book.reviews})</span>
                        </div>
                        <h3 class="book-title" onclick="viewProduct(${JSON.stringify(book).replace(/"/g, '&quot;')})">${book.title}</h3>
                        <p class="book-author">${book.author}</p>
                        <div class="book-footer">
                            <span class="book-price">$${book.price}</span>
                            <button class="add-to-cart-btn" onclick='event.stopPropagation(); addToCart(${JSON.stringify(book)})' aria-label="Add to cart">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                `;
                
                grid.appendChild(bookCard);
            });
        }

        function viewProduct(book) {
            localStorage.setItem('currentProduct', JSON.stringify(book));

            window.location.href = 'product.html';
        }

        renderBooks('featured-books', featuredBooks);
        renderBooks('bestsellers-books', bestsellers);
        function updateCartBadge() {
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
            const badge = document.getElementById('cartBadge');
            if (badge) {
                badge.textContent = totalItems;
            }
        }
        updateCartBadge();