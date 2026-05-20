document.addEventListener('DOMContentLoaded', function () {

    // --- Поиск ---
    const searchBox = document.getElementById('searchBox');
    const searchInput = document.getElementById('searchInput');

    if (searchBox) {
        searchBox.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!searchBox.classList.contains('open')) {
                searchBox.classList.add('open');
                searchInput.focus();
            }
        });

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) searchBox.submit();
            }
        });
    }

    // --- Корзина ---
    const cartBtn = document.getElementById('cartBtn');
    const cartDropdown = document.getElementById('cartDropdown');

    if (cartBtn && cartDropdown) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            cartDropdown.classList.toggle('show');
        });
    }

    // Закрываем всё при клике вне
    document.addEventListener('click', (e) => {
        if (searchBox && !searchBox.contains(e.target)) {
            searchBox.classList.remove('open');
            if (searchInput) searchInput.value = '';
        }
        if (cartDropdown && cartBtn &&
            !cartDropdown.contains(e.target) &&
            !cartBtn.contains(e.target)) {
            cartDropdown.classList.remove('show');
        }
    });

    updateCartUI();
    initProductBackButton();
    initProductDetailPage();
    initCatalogCartButtons();
});

// --- Корзина: данные ---
let cart = JSON.parse(localStorage.getItem('street19_cart')) || [];

function initProductBackButton() {
    const backButton = document.getElementById('productBackButton');
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
            // Fall back to the shop link when the browser does not expose a safe referrer.
        }

        window.location.href = backButton.getAttribute('href') || '/shop';
    });
}

function addWithData(button, event) {
    if (event) {
        event.stopPropagation();
    }

    addCartItem(getButtonCartItem(button));
}

function getButtonCartItem(button) {
    const id = button.getAttribute('data-id') || '';
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    const image = getProductImage(button);
    const size = button.getAttribute('data-size') || '';

    return { id, name, price, image, size, quantity: 1 };
}

function initCatalogCartButtons() {
    document.querySelectorAll('.card-buttons button[data-name]').forEach(button => {
        button.addEventListener('click', event => {
            if (button.classList.contains('btn-black')) {
                openBuyNowCheckout(getButtonCartItem(button), event);
                return;
            }

            addWithData(button, event);
        });
    });
}

function initProductDetailPage() {
    const productPage = document.querySelector('.product-page');
    if (!productPage) return;

    const mainImage = document.getElementById('productMainImage');
    const thumbnails = document.querySelectorAll('.product-thumb');
    const sizeButtons = document.querySelectorAll('.product-size-option');
    const addButton = document.getElementById('productAddToCart');
    const buyButton = document.getElementById('productBuyNow');
    const sizeChart = document.getElementById('productSizeChart');

    if (sizeChart) {
        const sizes = Array.from(sizeButtons).map(button => (
            button.getAttribute('data-size') || button.textContent || ''
        ).trim());
        const hasNumericSize = sizes.some(size => /^\d+([.,]\d+)?$/.test(size));

        sizeChart.dataset.chartType = hasNumericSize ? 'shoes' : 'clothes';
    }

    thumbnails.forEach(button => {
        button.addEventListener('click', () => {
            const image = button.getAttribute('data-image');
            if (mainImage && image) {
                mainImage.src = image;
            }
            thumbnails.forEach(item => item.classList.remove('active'));
            button.classList.add('active');
        });
    });

    sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            sizeButtons.forEach(item => item.classList.remove('selected'));
            button.classList.add('selected');
        });
    });

    if (addButton) {
        addButton.addEventListener('click', (event) => {
            event.stopPropagation();
            const selectedSize = document.querySelector('.product-size-option.selected');

            addCartItem({
                id: addButton.getAttribute('data-id') || '',
                name: addButton.getAttribute('data-name'),
                price: parseFloat(addButton.getAttribute('data-price')),
                image: addButton.getAttribute('data-image') || mainImage?.getAttribute('src') || '',
                size: selectedSize?.getAttribute('data-size') || ''
            });

            addButton.textContent = getTranslatedText('product.added', 'ADDED');
            window.setTimeout(() => {
                addButton.textContent = getTranslatedText('product.addToCart', 'ADD TO CART');
            }, 900);
        });
    }

    if (buyButton) {
        buyButton.addEventListener('click', (event) => {
            event.stopPropagation();
            const selectedSize = document.querySelector('.product-size-option.selected');

            openBuyNowCheckout({
                id: buyButton.getAttribute('data-id') || '',
                name: buyButton.getAttribute('data-name'),
                price: parseFloat(buyButton.getAttribute('data-price')),
                image: buyButton.getAttribute('data-image') || mainImage?.getAttribute('src') || '',
                size: selectedSize?.getAttribute('data-size') || '',
                quantity: 1
            }, event);
        });
    }
}

function openBuyNowCheckout(item, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    if (!item?.name) return;

    if (!window.Street19Checkout) {
        addCartItem(item);
        return;
    }

    window.Street19Checkout.open({
        title: 'Buy now',
        submitLabel: 'PAY NOW',
        items: [item],
        onSuccess: ({ items, customer }) => {
            const order = window.Street19Checkout.createOrder(items, customer);
            return { orderId: order.id };
        }
    });
}

function addCartItem(product) {
    if (!product.name) return;

    const item = {
        id: product.id || '',
        name: product.name,
        price: Number(product.price || 0),
        image: normalizeImagePath(product.image),
        size: product.size || '',
        quantity: 1
    };

    const existing = cart.find(cartItem => isSameCartItem(cartItem, item));
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push(item);
    }

    updateCartUI();
    document.getElementById('cartDropdown')?.classList.add('show');
}

function isSameCartItem(cartItem, item) {
    const sameSize = (cartItem.size || '') === (item.size || '');

    if (cartItem.id && item.id) {
        return String(cartItem.id) === String(item.id) && sameSize;
    }

    return cartItem.name === item.name && sameSize;
}

function getProductImage(button) {
    let image = button.getAttribute('data-image') || '';

    if (!image) {
        const cardImage = button.closest('.product-card')?.querySelector('.product-image img');
        image = cardImage?.getAttribute('src') || '';
    }

    return normalizeImagePath(image);
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

function getTranslatedText(key, fallback) {
    return window.Street19Preferences?.t?.(key, fallback) || fallback;
}

function formatDisplayPrice(price) {
    if (window.Street19Preferences?.formatMoney) {
        return window.Street19Preferences.formatMoney(price);
    }

    return `$${Number(price || 0).toFixed(2)}`;
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartUI();
}

function changeCartQuantity(event, index, value) {
    event.stopPropagation();

    const item = cart[index];
    if (!item) return;

    if (value < 0 && item.quantity <= 1) {
        cart.splice(index, 1);
    } else {
        item.quantity += value;
    }

    updateCartUI();
    document.getElementById('cartDropdown').classList.add('show');
}

function clearCart() {
    cart = [];
    updateCartUI();
}

function updateCartUI() {
    const list = document.getElementById('cartItemsList');
    const totalDisplay = document.getElementById('cartTotalPrice');

    localStorage.setItem('street19_cart', JSON.stringify(cart));
    if (!list) return;

    list.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        list.innerHTML = `<p style="text-align:center; padding:20px; color:#EFE8D8;">${getTranslatedText('cart.dropdownEmpty', 'Empty')}</p>`;
        if (totalDisplay) {
            totalDisplay.dataset.priceUsd = '0';
            totalDisplay.innerText = formatDisplayPrice(0);
        }
        return;
    }

    cart.forEach((item, index) => {
        const price = Number(item.price || 0);
        const quantity = Number(item.quantity || 1);
        total += price * quantity;
        const image = normalizeImagePath(item.image);

        list.innerHTML += `
            <div class="cart-item">
                <img src="${image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-price" data-price-usd="${price}">${formatDisplayPrice(price)}</p>
                </div>
                <div class="cart-quantity">
                    <button type="button" onclick="changeCartQuantity(event, ${index}, -1)">-</button>
                    <span>${quantity}</span>
                    <button type="button" onclick="changeCartQuantity(event, ${index}, 1)">+</button>
                </div>
            </div>
        `;
    });

    if (totalDisplay) {
        totalDisplay.dataset.priceUsd = String(total);
        totalDisplay.innerText = formatDisplayPrice(total);
    }
    return;

    cart.forEach(item => {
        total += item.price * item.quantity;
        list.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" style="width:60px; background:white;">
                <div style="flex:1">
                    <p style="font-size:12px; margin:0;">${item.name}</p>
                    <p style="font-size:14px; margin:5px 0;">$${item.price}</p>
                </div>
                <div style="display:flex; align-items:center; gap:10px;">
                    <span>${item.quantity}</span>
                    <button onclick="removeFromCart('${item.name}')" style="background:none; border:none; cursor:pointer; color:white;">✕</button>
                </div>
            </div>
        `;
    });

    if (totalDisplay) totalDisplay.innerText = `$${total.toFixed(2)}`;
}
