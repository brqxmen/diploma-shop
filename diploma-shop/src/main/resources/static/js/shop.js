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
        const currencySelector = document.getElementById('currencySelector');
        if (currencySelector && !currencySelector.contains(e.target)) {
            currencySelector.classList.remove('open');
        }
    });

    updateCartUI();

    // --- Валюта ---
    const currencySelector = document.getElementById('currencySelector');
    const currencyBtn = document.getElementById('currencyBtn');
    const currencyLabel = document.getElementById('currencyLabel');
    const currencyItems = document.querySelectorAll('.currency-dropdown li');

    if (currencyBtn) {
        currencyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currencySelector.classList.toggle('open');
        });

        currencyItems.forEach(item => {
            item.addEventListener('click', () => {
                currencyLabel.textContent = item.dataset.label;
                currencyItems.forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');
                currencySelector.classList.remove('open');
            });
        });
    }

    // --- Подписка ---
    const subscribeForm = document.getElementById('subscribeForm');
    const subscribeMsg = document.getElementById('subscribeMsg');

    if (subscribeForm) {
        subscribeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('userEmail').value;
            try {
                const response = await fetch('/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: 'email=' + encodeURIComponent(email)
                });
                const data = await response.json();
                if (subscribeMsg) subscribeMsg.textContent = data.message;
                if (response.ok) subscribeForm.reset();
            } catch (err) {
                if (subscribeMsg) subscribeMsg.textContent = 'Что-то пошло не так.';
            }
        });
    }
});

// --- Корзина: данные ---
let cart = JSON.parse(localStorage.getItem('street19_cart')) || [];

function addWithData(button) {
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    const image = getProductImage(button);
    const size = button.getAttribute('data-size') || '';

    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price, image, size, quantity: 1 });
    }

    updateCartUI();
    document.getElementById('cartDropdown').classList.add('show');
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
        list.innerHTML = '<p style="text-align:center; padding:20px; color:#EFE8D8;">Empty</p>';
        if (totalDisplay) totalDisplay.innerText = '$0';
        return;
    }

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const image = normalizeImagePath(item.image);

        list.innerHTML += `
            <div class="cart-item">
                <img src="${image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-price">$${item.price}</p>
                </div>
                <div class="cart-quantity">
                    <button type="button" onclick="changeCartQuantity(event, ${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button type="button" onclick="changeCartQuantity(event, ${index}, 1)">+</button>
                </div>
            </div>
        `;
    });

    if (totalDisplay) totalDisplay.innerText = `$${total.toFixed(2)}`;
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
