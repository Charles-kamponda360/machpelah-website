// Products Management
class ProductManager {
    constructor() {
        this.products = this.loadProducts();
        this.announcements = this.loadAnnouncements();
    }

    loadProducts() {
        const stored = localStorage.getItem('products');
        if (stored) {
            return JSON.parse(stored);
        }
        // Default products with real images
        const defaultProducts = [
            {
                id: 1,
                name: 'Gaming PC - Intel Core i7',
                category: 'PC',
                price: 850000,
                stock: 5,
                image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=400&fit=crop',
                description: 'High-performance gaming PC'
            },
            {
                id: 2,
                name: 'Office PC - Intel Core i5',
                category: 'PC',
                price: 550000,
                stock: 8,
                image: 'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=400&h=400&fit=crop',
                description: 'Perfect for office work'
            },
            {
                id: 3,
                name: 'Smart Watch Pro',
                category: 'Smart Watch',
                price: 45000,
                stock: 15,
                image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop',
                description: 'Advanced fitness tracking'
            },
            {
                id: 4,
                name: 'Smart Watch Basic',
                category: 'Smart Watch',
                price: 25000,
                stock: 20,
                image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&h=400&fit=crop',
                description: 'Essential smart features'
            },
            {
                id: 5,
                name: 'Electric Kettle 1.8L',
                category: 'Kettle',
                price: 12000,
                stock: 30,
                image: 'https://images.unsplash.com/photo-1563299796-17596ed6b017?w=400&h=400&fit=crop',
                description: 'Fast boiling kettle'
            },
            {
                id: 6,
                name: 'Glass Kettle 2L',
                category: 'Kettle',
                price: 15000,
                stock: 25,
                image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop',
                description: 'Elegant glass design'
            },
            {
                id: 7,
                name: 'Double Hotplate',
                category: 'Hotplate',
                price: 18000,
                stock: 12,
                image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&h=400&fit=crop',
                description: 'Two cooking zones'
            },
            {
                id: 8,
                name: 'Single Hotplate',
                category: 'Hotplate',
                price: 10000,
                stock: 18,
                image: 'https://images.unsplash.com/photo-1565373679880-3a1a9ad2d41d?w=400&h=400&fit=crop',
                description: 'Portable and efficient'
            },
            {
                id: 9,
                name: 'Rice Cooker 1.8L',
                category: 'Rice Cooker',
                price: 22000,
                stock: 15,
                image: 'https://images.unsplash.com/photo-1612837017391-4e5d76c0d93f?w=400&h=400&fit=crop',
                description: 'Perfect rice every time'
            },
            {
                id: 10,
                name: 'Multi-function Rice Cooker',
                category: 'Rice Cooker',
                price: 35000,
                stock: 10,
                image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&h=400&fit=crop',
                description: 'Steam, cook, and more'
            },
            {
                id: 11,
                name: 'Gaming Laptop RGB',
                category: 'PC',
                price: 1200000,
                stock: 3,
                image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop',
                description: 'Portable gaming powerhouse'
            },
            {
                id: 12,
                name: 'Fitness Smart Watch',
                category: 'Smart Watch',
                price: 35000,
                stock: 12,
                image: 'https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=400&h=400&fit=crop',
                description: 'Track your health goals'
            },
            {
                id: 13,
                name: 'Stainless Steel Kettle',
                category: 'Kettle',
                price: 14000,
                stock: 22,
                image: 'https://images.unsplash.com/photo-1629305988065-a1ce6ba8b21e?w=400&h=400&fit=crop',
                description: 'Durable and stylish'
            },
            {
                id: 14,
                name: 'Induction Hotplate',
                category: 'Hotplate',
                price: 25000,
                stock: 8,
                image: 'https://images.unsplash.com/photo-1584990347449-39b3de6f0b5d?w=400&h=400&fit=crop',
                description: 'Energy efficient cooking'
            },
            {
                id: 15,
                name: 'Premium Rice Cooker 3L',
                category: 'Rice Cooker',
                price: 45000,
                stock: 6,
                image: 'https://images.unsplash.com/photo-1585515320310-21ccbdeacdac?w=400&h=400&fit=crop',
                description: 'Large capacity for families'
            }
        ];
        this.saveProducts(defaultProducts);
        return defaultProducts;
    }

    loadAnnouncements() {
        const stored = localStorage.getItem('announcements');
        if (stored) {
            return JSON.parse(stored);
        }
        const defaultAnnouncements = [
            {
                id: 1,
                message: '🎉 New Stock Alert! Check out our latest Smart Watches - Limited Time Offer!',
                active: true,
                date: new Date().toISOString()
            }
        ];
        this.saveAnnouncements(defaultAnnouncements);
        return defaultAnnouncements;
    }

    saveProducts(products) {
        localStorage.setItem('products', JSON.stringify(products));
        this.products = products;
    }

    saveAnnouncements(announcements) {
        localStorage.setItem('announcements', JSON.stringify(announcements));
        this.announcements = announcements;
    }

    getAllProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.find(p => p.id === parseInt(id));
    }

    getProductsByCategory(category) {
        if (category === 'all') return this.products;
        return this.products.filter(p => p.category === category);
    }

    getActiveAnnouncement() {
        return this.announcements.find(a => a.active);
    }

    updateStock(productId, newStock) {
        const product = this.getProductById(productId);
        if (product) {
            product.stock = newStock;
            this.saveProducts(this.products);
        }
    }

    formatPrice(price) {
        return 'MWK ' + price.toLocaleString();
    }
}

// Initialize product manager
const productManager = new ProductManager();

// Display products on page
function displayProducts(products) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    if (products.length === 0) {
        grid.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No products found.</p>';
        return;
    }

    grid.innerHTML = products.map(product => `
        <div class="product-card" data-category="${product.category}">
            <img src="${product.image}" alt="${product.name}" class="product-image" 
                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'200\\' height=\\'200\\'%3E%3Crect fill=\\'%23e5e7eb\\' width=\\'200\\' height=\\'200\\'/%3E%3Ctext x=\\'50%25\\' y=\\'50%25\\' dominant-baseline=\\'middle\\' text-anchor=\\'middle\\' fill=\\'%239ca3af\\' font-size=\\'14\\'%3ENo Image%3C/text%3E%3C/svg%3E'"
                 loading="lazy">
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${productManager.formatPrice(product.price)}</p>
                <p class="product-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
                    ${product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </p>
                <button class="add-to-cart-btn" 
                        onclick="addToCart(${product.id})" 
                        ${product.stock === 0 ? 'disabled' : ''}>
                    ${product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>
        </div>
    `).join('');
}

// Filter products
function filterProducts(category) {
    const products = productManager.getProductsByCategory(category);
    displayProducts(products);
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
}

// Display announcement
function displayAnnouncement() {
    const banner = document.getElementById('announcement-banner');
    if (!banner) return;

    const announcement = productManager.getActiveAnnouncement();
    if (announcement) {
        banner.textContent = announcement.message;
        banner.style.display = 'block';
    } else {
        banner.style.display = 'none';
    }
}

// Initialize page
if (document.getElementById('products-grid')) {
    displayProducts(productManager.getAllProducts());
    displayAnnouncement();

    // Add filter event listeners
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filterProducts(btn.dataset.category);
        });
    });
}