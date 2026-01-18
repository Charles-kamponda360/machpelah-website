// Shopping Cart Management
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartCount();
    }

    loadCart() {
        const stored = localStorage.getItem('cart');
        return stored ? JSON.parse(stored) : [];
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCartCount();
    }

    // FIXED: Now accepts product object directly instead of looking it up
    addItem(productId, product) {
        // If product object not provided, try to get it from window.allProducts
        if (!product) {
            if (window.allProducts && Array.isArray(window.allProducts)) {
                product = window.allProducts.find(p => p.id === productId);
            } else if (window.productsData) {
                product = window.productsData[productId];
            }
        }

        if (!product) {
            console.error('Product not found:', productId);
            alert('Product not found!');
            return;
        }

        if (product.stock === 0) {
            alert('Product is out of stock!');
            return;
        }

        const existingItem = this.items.find(item => item.id === productId);
        
        if (existingItem) {
            if (existingItem.quantity < product.stock) {
                existingItem.quantity++;
            } else {
                alert('Cannot add more. Stock limit reached!');
                return;
            }
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category || 'General',
                description: product.description || '',
                quantity: 1,
                maxStock: product.stock
            });
        }

        this.saveCart();
        this.showNotification('Product added to cart!');
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.displayCart();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else if (newQuantity <= item.maxStock) {
                item.quantity = newQuantity;
                this.saveCart();
                this.displayCart();
            } else {
                alert('Cannot exceed available stock!');
            }
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    updateCartCount() {
        const badge = document.getElementById('cart-count');
        if (badge) {
            const count = this.getItemCount();
            badge.textContent = count;
            badge.style.display = count > 0 ? 'inline-block' : 'none';
        }
    }

    formatPrice(price) {
        return 'MWK ' + price.toLocaleString();
    }

    toggleDescription(productId) {
        const descElement = document.getElementById(`desc-${productId}`);
        const nameElement = document.getElementById(`name-${productId}`);
        
        if (descElement && nameElement) {
            descElement.classList.toggle('active');
            nameElement.classList.toggle('active');
        }
    }

    displayCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartSummary = document.getElementById('cart-summary');
        
        if (!cartItemsContainer) return;

        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <h2>Your cart is empty</h2>
                    <p>Add some products to get started!</p>
                    <a href="index.html" class="btn btn-primary">Continue Shopping</a>
                </div>
            `;
            if (cartSummary) cartSummary.style.display = 'none';
            return;
        }

        cartItemsContainer.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image"
                     onerror="this.src='https://via.placeholder.com/120x120/f5f5f5/666?text=Product'">
                <div class="cart-item-details">
                    <h3 class="cart-item-name" id="name-${item.id}" onclick="cart.toggleDescription(${item.id})">
                        ${item.name}
                    </h3>
                    ${item.description ? `
                        <p class="cart-item-description" id="desc-${item.id}">
                            ${item.description}
                        </p>
                    ` : ''}
                    <p class="cart-item-price">${this.formatPrice(item.price)}</p>
                    ${item.category ? `<p style="font-size: 0.85rem; color: #6b7280;">Category: ${item.category}</p>` : ''}
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                        <button class="remove-btn" onclick="cart.removeItem(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');

        if (cartSummary) {
            cartSummary.style.display = 'block';
            document.getElementById('cart-total').textContent = this.formatPrice(this.getTotal());
            document.getElementById('cart-total-final').textContent = this.formatPrice(this.getTotal());
        }
    }

    generateEmailBody() {
        let body = 'New Order from Machpelah Electronics Website\n\n';
        body += 'ORDER DETAILS:\n';
        body += '=' .repeat(70) + '\n\n';
        
        this.items.forEach((item, index) => {
            body += `PRODUCT ${index + 1}:\n`;
            body += `Name: ${item.name}\n`;
            body += `Price: ${this.formatPrice(item.price)}\n`;
            body += `Quantity: ${item.quantity}\n`;
            body += `Subtotal: ${this.formatPrice(item.price * item.quantity)}\n`;
            if (item.description) {
                body += `Description: ${item.description}\n`;
            }
            if (item.category) {
                body += `Category: ${item.category}\n`;
            }
            body += `Product Image: ${item.image}\n`;
            body += '-'.repeat(70) + '\n';
        });
        
        body += `\nTOTAL AMOUNT: ${this.formatPrice(this.getTotal())}\n`;
        body += `TOTAL ITEMS: ${this.getItemCount()}\n\n`;
        body += 'Please contact the customer to confirm the order and arrange delivery.\n';
        
        return encodeURIComponent(body);
    }

    generateWhatsAppMessage() {
        let message = '*🛒 NEW ORDER - MACHPELAH ELECTRONICS*\n\n';
        message += '📋 *ORDER DETAILS:*\n';
        message += '━━━━━━━━━━━━━━━━━━━━━━\n\n';
        
        this.items.forEach((item, index) => {
            message += `*${index + 1}. ${item.name}*\n`;
            message += `💰 Price: ${this.formatPrice(item.price)}\n`;
            message += `📦 Quantity: ${item.quantity}\n`;
            message += `💵 Subtotal: ${this.formatPrice(item.price * item.quantity)}\n`;
            if (item.description) {
                message += `📝 Description: ${item.description}\n`;
            }
            if (item.category) {
                message += `🏷️ Category: ${item.category}\n`;
            }
            message += `🖼️ Image: ${item.image}\n`;
            message += '\n';
        });
        
        message += '━━━━━━━━━━━━━━━━━━━━━━\n';
        message += `*💰 TOTAL: ${this.formatPrice(this.getTotal())}*\n`;
        message += `*📦 Total Items: ${this.getItemCount()}*\n\n`;
        message += '✅ _I would like to place this order. Please confirm availability and delivery details._';
        
        return encodeURIComponent(message);
    }

    sendToEmail() {
        if (this.items.length === 0) {
            alert('Your cart is empty! Add some items first.');
            return;
        }
        
        const email = 'machpelahelectronics@gmail.com';
        const subject = encodeURIComponent('New Order from Website - ' + new Date().toLocaleDateString());
        const body = this.generateEmailBody();
        
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    }

    sendToWhatsApp() {
        if (this.items.length === 0) {
            alert('Your cart is empty! Add some items first.');
            return;
        }
        
        const phone = '265991765645'; // Your WhatsApp number
        const message = this.generateWhatsAppMessage();
        
        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    clearCart() {
        if (this.items.length === 0) {
            alert('Your cart is already empty!');
            return;
        }
        
        if (confirm('Are you sure you want to clear your cart?')) {
            this.items = [];
            this.saveCart();
            this.displayCart();
        }
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Add to cart function (called from product cards)
function addToCart(productId, product) {
    cart.addItem(productId, product);
}

// Initialize cart page if on cart.html
if (document.getElementById('cart-items')) {
    cart.displayCart();
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);