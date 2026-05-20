let cart = JSON.parse(localStorage.getItem('street19_cart')) || [];

document.addEventListener('DOMContentLoaded', function () {
    initCartBackButton();
    renderCartPage();
    initCheckout();
    checkLoginStatus();
});

function checkLoginStatus() {
    const profileId = localStorage.getItem('street19_profile_id');
    const loginHint = document.querySelector('.checkout-login');
    if (loginHint && profileId) {
        loginHint.style.display = 'none';
    }
}

function saveCart() {
    localStorage.setItem('street19_cart', JSON.stringify(cart));
}

function normalizeImagePath(image) {
    if (!image) return '';

    image = image.trim();
    if (image.startsWith('http')) return image;
    if (image.includes('static/images/')) return `/images/${image.split('static/images/').pop()}`;
    if (image.includes('/images/')) return `/images/${image.split('/images/').pop()}`;
    if (image.startsWith('images/')) return `/${image}`;
    if (image.startsWith('/')) return image;

    return `/images/${image}`;
}

function formatPrice(price) {
    if (window.Street19Preferences?.formatMoney) {
        return window.Street19Preferences.formatMoney(price);
    }

    return `$${Number(price || 0).toFixed(2)}`;
}

function getTranslatedText(key, fallback) {
    return window.Street19Preferences?.t?.(key, fallback) || fallback;
}

function initCartBackButton() {
    const backButton = document.getElementById('cartBackButton');
    if (!backButton) return;

    backButton.addEventListener('click', event => {
        event.preventDefault();

        try {
            const referrer = document.referrer ? new URL(document.referrer) : null;
            if (referrer?.origin === window.location.origin && referrer.pathname !== window.location.pathname) {
                window.history.back();
                return;
            }
        } catch (err) {
            // Use the fallback link below when the browser does not expose a safe referrer.
        }

        window.location.href = backButton.getAttribute('href') || '/shop';
    });
}

function changePageQuantity(index, value) {
    const item = cart[index];
    if (!item) return;

    if (value < 0 && item.quantity <= 1) {
        cart.splice(index, 1);
    } else {
        item.quantity += value;
    }

    saveCart();
    renderCartPage();
}

function removePageItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCartPage();
}

function initCheckout() {
    const checkoutButton = document.getElementById('checkoutButton');
    if (!checkoutButton) return;

    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) return;

        if (!window.Street19Checkout) {
            completeCheckout(cart);
            window.location.href = '/profile/orders';
            return;
        }

        window.Street19Checkout.open({
            title: 'Checkout',
            submitLabel: 'PAY ORDER',
            items: cart,
            onSuccess: ({ items, customer }) => {
                const order = completeCheckout(items, customer);
                return { orderId: order.id };
            }
        });
    });
}

function completeCheckout(items, customer) {
    const order = window.Street19Checkout
        ? window.Street19Checkout.createOrder(items, customer)
        : createFallbackOrder(items, customer);

    cart = [];
    saveCart();
    renderCartPage();

    return order;
}

function createFallbackOrder(items, customer = {}) {
    const orders = JSON.parse(localStorage.getItem('street19_orders')) || [];
    const orderItems = items.map(item => ({
        ...item,
        quantity: Math.max(1, Number(item.quantity || 1))
    }));
    const total = orderItems.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1), 0);
    const name = (customer.name || customer.customerName || 'Demo customer').trim();
    const contact = (customer.email || customer.contact || 'demo@street19.local').trim();
    const order = {
        id: Date.now(),
        date: new Date().toISOString(),
        status: 'Confirmed',
        adminStatus: 'new',
        customerName: name,
        contact,
        email: contact,
        total,
        items: orderItems
    };

    orders.unshift(order);
    localStorage.setItem('street19_orders', JSON.stringify(orders));

    return order;
}

function renderCartPage() {
    const itemsContainer = document.getElementById('cartPageItems');
    const subtotalElement = document.getElementById('cartPageSubtotal');
    if (!itemsContainer || !subtotalElement) return;

    itemsContainer.innerHTML = '';

    if (cart.length === 0) {
        itemsContainer.innerHTML = `<p class="cart-empty">${getTranslatedText('cart.empty', 'Your cart is empty')}</p>`;
        subtotalElement.dataset.priceUsd = '0';
        subtotalElement.textContent = formatPrice(0);
        return;
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
        const price = Number(item.price || 0);
        const quantity = Number(item.quantity || 1);
        const itemTotal = price * quantity;
        subtotal += itemTotal;

        const row = document.createElement('div');
        row.className = 'cart-page-item';

        row.innerHTML = `
            <div class="cart-page-image">
                <img src="${normalizeImagePath(item.image)}" alt="${item.name}">
            </div>
            <div class="cart-page-info">
                <div class="cart-page-head">
                    <div>
                        <h2>${item.name}</h2>
                        ${item.size ? `<p>SIZE: ${item.size}</p>` : ''}
                    </div>
                    <button class="cart-remove-btn" type="button" onclick="removePageItem(${index})" aria-label="Remove item">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M14.2792,2 C15.1401,2 15.9044,2.55086 16.1766,3.36754 L16.7208,5 L20,5 C20.5523,5 21,5.44772 21,6 C21,6.55227 20.5523,6.99998 20,7 L19.9975,7.07125 L19.9975,7.07125 L19.1301,19.2137 C19.018,20.7837 17.7117,22 16.1378,22 L7.86224,22 C6.28832,22 4.982,20.7837 4.86986,19.2137 L4.00254,7.07125 C4.00083,7.04735 3.99998,7.02359 3.99996,7 C3.44769,6.99998 3,6.55227 3,6 C3,5.44772 3.44772,5 4,5 L7.27924,5 L7.82339,3.36754 C8.09562,2.55086 8.8599,2 9.72076,2 L14.2792,2 Z M17.9975,7 L6.00255,7 L6.86478,19.0712 C6.90216,19.5946 7.3376,20 7.86224,20 L16.1378,20 C16.6624,20 17.0978,19.5946 17.1352,19.0712 L17.9975,7 Z M10,10 C10.51285,10 10.9355092,10.386027 10.9932725,10.8833761 L11,11 L11,16 C11,16.5523 10.5523,17 10,17 C9.48715929,17 9.06449214,16.613973 9.00672766,16.1166239 L9,16 L9,11 C9,10.4477 9.44771,10 10,10 Z M14,10 C14.5523,10 15,10.4477 15,11 L15,16 C15,16.5523 14.5523,17 14,17 C13.4477,17 13,16.5523 13,16 L13,11 C13,10.4477 13.4477,10 14,10 Z M14.2792,4 L9.72076,4 L9.38743,5 L14.6126,5 L14.2792,4 Z"></path>
                        </svg>
                    </button>
                </div>
                <div class="cart-page-bottom">
                    <div class="cart-page-quantity">
                        <button type="button" onclick="changePageQuantity(${index}, 1)">+</button>
                        <span>${quantity}</span>
                        <button type="button" onclick="changePageQuantity(${index}, -1)">-</button>
                    </div>
                    <strong data-price-usd="${itemTotal}">${formatPrice(itemTotal)}</strong>
                </div>
            </div>
        `;

        itemsContainer.appendChild(row);
    });

    subtotalElement.dataset.priceUsd = String(subtotal);
    subtotalElement.textContent = formatPrice(subtotal);
}
