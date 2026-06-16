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

async function addWithData(button, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const item = getButtonCartItem(button);
    const sizeOptions = getButtonSizeOptions(button);

    if (await resolveItemSize(item, sizeOptions)) {
        addCartItem(item);
    }
}

function getButtonCartItem(button) {
    const id = button.getAttribute('data-id') || '';
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    const image = getProductImage(button);
    const size = button.getAttribute('data-size') || '';

    return { id, name, price, image, size, quantity: 1 };
}

function getButtonSizeOptions(button) {
    return parseSizeOptions(button.getAttribute('data-size-options') || '');
}

function initCatalogCartButtons() {
    document.querySelectorAll('.card-buttons button[data-name]').forEach(button => {
        button.addEventListener('click', async event => {
            if (button.classList.contains('btn-black')) {
                event.preventDefault();
                event.stopPropagation();

                const item = getButtonCartItem(button);
                if (await resolveItemSize(item, getButtonSizeOptions(button))) {
                    openBuyNowCheckout(item, event);
                }
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
        addButton.addEventListener('click', async (event) => {
            event.stopPropagation();
            const selectedSize = document.querySelector('.product-size-option.selected');
            const item = {
                id: addButton.getAttribute('data-id') || '',
                name: addButton.getAttribute('data-name'),
                price: parseFloat(addButton.getAttribute('data-price')),
                image: addButton.getAttribute('data-image') || mainImage?.getAttribute('src') || '',
                size: selectedSize?.getAttribute('data-size') || '',
                quantity: 1
            };

            if (!(await resolveItemSize(item, getProductSizeOptions(sizeButtons, addButton)))) {
                return;
            }

            selectVisibleSize(sizeButtons, item.size);
            addCartItem(item);

            addButton.textContent = getTranslatedText('product.added', 'ADDED');
            window.setTimeout(() => {
                addButton.textContent = getTranslatedText('product.addToCart', 'ADD TO CART');
            }, 900);
        });
    }

    if (buyButton) {
        buyButton.addEventListener('click', async (event) => {
            event.stopPropagation();
            const selectedSize = document.querySelector('.product-size-option.selected');
            const item = {
                id: buyButton.getAttribute('data-id') || '',
                name: buyButton.getAttribute('data-name'),
                price: parseFloat(buyButton.getAttribute('data-price')),
                image: buyButton.getAttribute('data-image') || mainImage?.getAttribute('src') || '',
                size: selectedSize?.getAttribute('data-size') || '',
                quantity: 1
            };

            if (await resolveItemSize(item, getProductSizeOptions(sizeButtons, buyButton))) {
                selectVisibleSize(sizeButtons, item.size);
                openBuyNowCheckout(item, event);
            }
        });
    }
}

function parseSizeOptions(rawSizeOptions) {
    if (!rawSizeOptions) return [];

    const seen = new Set();
    return String(rawSizeOptions)
        .split(/[,;/|\n]+/)
        .map(size => size.trim())
        .filter(size => {
            if (!size || seen.has(size.toLowerCase())) return false;
            seen.add(size.toLowerCase());
            return true;
        });
}

function getProductSizeOptions(sizeButtons, actionButton) {
    const declaredOptions = parseSizeOptions(actionButton?.getAttribute('data-size-options') || '');
    if (declaredOptions.length) return declaredOptions;

    const visibleOptions = Array.from(sizeButtons)
        .map(button => (button.getAttribute('data-size') || button.textContent || '').trim())
        .filter(Boolean);

    return visibleOptions.filter(size => size.toUpperCase() !== 'OS');
}

async function resolveItemSize(item, sizeOptions) {
    if (!item?.name) return false;
    if (!Array.isArray(sizeOptions) || sizeOptions.length === 0) return true;

    if (sizeOptions.length === 1) {
        item.size = item.size || sizeOptions[0];
        return true;
    }

    if (item.size && sizeOptions.some(size => size.toLowerCase() === item.size.toLowerCase())) {
        return true;
    }

    const chosenSize = await openSizeChoice(item.name, sizeOptions);
    if (!chosenSize) return false;

    item.size = chosenSize;
    return true;
}

function selectVisibleSize(sizeButtons, size) {
    if (!size) return;

    sizeButtons.forEach(button => {
        const buttonSize = button.getAttribute('data-size') || button.textContent || '';
        button.classList.toggle('selected', buttonSize.trim().toLowerCase() === size.toLowerCase());
    });
}

function openSizeChoice(productName, sizeOptions) {
    return new Promise(resolve => {
        document.querySelector('.size-choice-backdrop')?.remove();

        const backdrop = document.createElement('div');
        backdrop.className = 'size-choice-backdrop';
        backdrop.innerHTML = `
            <div class="size-choice-modal" role="dialog" aria-modal="true">
                <p class="size-choice-title">Choose size</p>
                <p class="size-choice-product"></p>
                <div class="size-choice-options"></div>
                <button type="button" class="size-choice-cancel">Cancel</button>
            </div>
        `;

        const product = backdrop.querySelector('.size-choice-product');
        const options = backdrop.querySelector('.size-choice-options');
        product.textContent = productName;

        sizeOptions.forEach(size => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'size-choice-option';
            button.textContent = size;
            button.addEventListener('click', () => close(size));
            options.appendChild(button);
        });

        backdrop.querySelector('.size-choice-cancel').addEventListener('click', () => close(''));
        backdrop.addEventListener('click', event => {
            if (event.target === backdrop) {
                close('');
            }
        });

        document.addEventListener('keydown', handleEscape);
        document.body.appendChild(backdrop);
        options.querySelector('button')?.focus();

        function handleEscape(event) {
            if (event.key === 'Escape') {
                close('');
            }
        }

        function close(size) {
            document.removeEventListener('keydown', handleEscape);
            backdrop.remove();
            resolve(size);
        }
    });
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
        image: window.Street19Images.normalizePath(product.image),
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

    return window.Street19Images.normalizePath(image);
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
        const image = window.Street19Images.normalizePath(item.image);
        const sizeLabel = item.size ? `<p class="cart-item-size">Size: ${item.size}</p>` : '';

        list.innerHTML += `
            <div class="cart-item">
                <img src="${image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <p class="cart-item-name">${item.name}</p>
                    ${sizeLabel}
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
