(function () {
    let modalState = {
        items: [],
        onSuccess: null,
        submitLabel: 'PAY NOW',
        title: 'Checkout'
    };

    function normalizeImagePath(image) {
        if (!image) return '';

        image = String(image).trim();
        if (image.startsWith('http')) return image;
        if (image.includes('static/images/')) return `/images/${image.split('static/images/').pop()}`;
        if (image.includes('/images/')) return `/images/${image.split('/images/').pop()}`;
        if (image.startsWith('images/')) return `/${image}`;
        if (image.startsWith('/')) return image;

        return `/images/${image}`;
    }

    function formatMoney(price) {
        if (window.Street19Preferences?.formatMoney) {
            return window.Street19Preferences.formatMoney(price);
        }

        return `$${Number(price || 0).toFixed(2)}`;
    }

    function escapeHtml(value) {
        return String(value || '').replace(/[&<>"']/g, character => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[character]));
    }

    function normalizeItems(items) {
        return (items || [])
            .filter(item => item && item.name)
            .map(item => ({
                id: item.id || '',
                name: item.name,
                price: Number(item.price || 0),
                image: normalizeImagePath(item.image),
                size: item.size || '',
                quantity: Math.max(1, Number(item.quantity || 1))
            }));
    }

    function getTotal(items) {
        return items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1), 0);
    }

    function getStoredProfile() {
        try {
            return JSON.parse(localStorage.getItem('street19_profile')) || {};
        } catch (err) {
            return {};
        }
    }

    function getProfileName(profile) {
        return `${profile.firstName || ''} ${profile.lastName || ''}`.trim();
    }

    function normalizeCustomer(customer = {}) {
        const profile = getStoredProfile();
        const name = (customer.name || customer.customerName || getProfileName(profile) || 'Demo customer').trim();
        const email = (customer.email || customer.contact || profile.email || 'demo@street19.local').trim();

        return {
            name,
            email,
            contact: email
        };
    }

    function createOrder(items, customer = {}) {
        const orderItems = normalizeItems(items);
        const orders = JSON.parse(localStorage.getItem('street19_orders')) || [];
        const checkoutCustomer = normalizeCustomer(customer);
        const order = {
            id: Date.now(),
            date: new Date().toISOString(),
            status: 'Confirmed',
            adminStatus: 'new',
            customerName: checkoutCustomer.name,
            contact: checkoutCustomer.contact,
            email: checkoutCustomer.email,
            total: getTotal(orderItems),
            items: orderItems
        };

        orders.unshift(order);
        localStorage.setItem('street19_orders', JSON.stringify(orders));

        return order;
    }

    function ensureModal() {
        let backdrop = document.getElementById('checkoutModalBackdrop');
        if (backdrop) return backdrop;

        backdrop = document.createElement('div');
        backdrop.id = 'checkoutModalBackdrop';
        backdrop.className = 'checkout-modal-backdrop';
        backdrop.setAttribute('aria-hidden', 'true');
        backdrop.innerHTML = `
            <section class="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkoutModalTitle">
                <button class="checkout-modal-close" type="button" aria-label="Close checkout">&times;</button>
                <div class="checkout-modal-content">
                    <div class="checkout-modal-summary">
                        <span class="checkout-modal-kicker">Street 19</span>
                        <h2 id="checkoutModalTitle">Checkout</h2>
                        <div class="checkout-modal-items" id="checkoutModalItems"></div>
                        <div class="checkout-modal-total">
                            <span>Total</span>
                            <strong id="checkoutModalTotal">$0.00</strong>
                        </div>
                    </div>

                    <form class="checkout-card-form" id="checkoutCardForm">
                        <div class="checkout-card-preview" aria-hidden="true">
                            <span>STREET 19</span>
                            <strong id="checkoutCardPreviewNumber">4242 4242 4242 4242</strong>
                            <div>
                                <span id="checkoutCardPreviewName">SKATER NAME</span>
                                <span id="checkoutCardPreviewExpiry">MM/YY</span>
                            </div>
                        </div>

                        <p class="checkout-demo-note">Demo payment. No real card will be charged.</p>

                        <label class="checkout-field">
                            <span>Email for receipt</span>
                            <input type="email" id="checkoutEmail" placeholder="you@example.com" required>
                        </label>

                        <label class="checkout-field">
                            <span>Name on card</span>
                            <input type="text" id="checkoutCardName" placeholder="Skater Name" autocomplete="cc-name" required>
                        </label>

                        <label class="checkout-field">
                            <span>Card number</span>
                            <input type="text" id="checkoutCardNumber" inputmode="numeric" placeholder="4242 4242 4242 4242" autocomplete="cc-number" maxlength="19" required>
                        </label>

                        <div class="checkout-field-grid">
                            <label class="checkout-field">
                                <span>Expiry</span>
                                <input type="text" id="checkoutCardExpiry" inputmode="numeric" placeholder="MM/YY" autocomplete="cc-exp" maxlength="5" required>
                            </label>
                            <label class="checkout-field">
                                <span>CVC</span>
                                <input type="text" id="checkoutCardCvc" inputmode="numeric" placeholder="123" autocomplete="cc-csc" maxlength="4" required>
                            </label>
                        </div>

                        <p class="checkout-form-error" id="checkoutFormError" role="alert"></p>
                        <button type="submit" class="checkout-pay-button" id="checkoutPayButton">PAY NOW</button>
                    </form>
                </div>

                <div class="checkout-success" id="checkoutSuccess" hidden>
                    <span class="checkout-success-mark">OK</span>
                    <h2>Purchase successful</h2>
                    <p id="checkoutSuccessText">Your demo order has been confirmed.</p>
                    <div class="checkout-success-actions">
                        <button type="button" class="checkout-success-secondary" id="checkoutContinueButton">CONTINUE SHOPPING</button>
                        <button type="button" class="checkout-success-primary" id="checkoutOrdersButton">VIEW ORDERS</button>
                    </div>
                </div>
            </section>
        `;

        document.body.appendChild(backdrop);
        bindModal(backdrop);

        return backdrop;
    }

    function bindModal(backdrop) {
        const closeButton = backdrop.querySelector('.checkout-modal-close');
        const continueButton = backdrop.querySelector('#checkoutContinueButton');
        const ordersButton = backdrop.querySelector('#checkoutOrdersButton');
        const form = backdrop.querySelector('#checkoutCardForm');
        const cardNumber = backdrop.querySelector('#checkoutCardNumber');
        const cardName = backdrop.querySelector('#checkoutCardName');
        const expiry = backdrop.querySelector('#checkoutCardExpiry');
        const cvc = backdrop.querySelector('#checkoutCardCvc');

        closeButton.addEventListener('click', close);
        continueButton.addEventListener('click', close);
        ordersButton.addEventListener('click', () => {
            window.location.href = '/profile/orders';
        });

        backdrop.addEventListener('click', event => {
            if (event.target === backdrop) close();
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && backdrop.classList.contains('open')) {
                close();
            }
        });

        cardNumber.addEventListener('input', () => {
            const digits = cardNumber.value.replace(/\D/g, '').slice(0, 16);
            cardNumber.value = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
            document.getElementById('checkoutCardPreviewNumber').textContent = cardNumber.value || '4242 4242 4242 4242';
        });

        cardName.addEventListener('input', () => {
            document.getElementById('checkoutCardPreviewName').textContent = cardName.value.trim().toUpperCase() || 'SKATER NAME';
        });

        expiry.addEventListener('input', () => {
            const digits = expiry.value.replace(/\D/g, '').slice(0, 4);
            expiry.value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
            document.getElementById('checkoutCardPreviewExpiry').textContent = expiry.value || 'MM/YY';
        });

        cvc.addEventListener('input', () => {
            cvc.value = cvc.value.replace(/\D/g, '').slice(0, 4);
        });

        form.addEventListener('submit', event => {
            event.preventDefault();
            submitPayment(backdrop);
        });
    }

    function renderModal(backdrop) {
        const itemsContainer = backdrop.querySelector('#checkoutModalItems');
        const totalElement = backdrop.querySelector('#checkoutModalTotal');
        const title = backdrop.querySelector('#checkoutModalTitle');
        const payButton = backdrop.querySelector('#checkoutPayButton');

        title.textContent = modalState.title;
        payButton.textContent = modalState.submitLabel;
        totalElement.dataset.priceUsd = String(getTotal(modalState.items));
        totalElement.textContent = formatMoney(getTotal(modalState.items));

        itemsContainer.innerHTML = modalState.items.map(item => `
            <div class="checkout-modal-item">
                <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}">
                <div>
                    <strong>${escapeHtml(item.name)}</strong>
                    <span>${item.size ? `Size: ${escapeHtml(item.size)} / ` : ''}Qty: ${item.quantity}</span>
                </div>
                <b data-price-usd="${Number(item.price || 0) * Number(item.quantity || 1)}">${formatMoney(Number(item.price || 0) * Number(item.quantity || 1))}</b>
            </div>
        `).join('');
    }

    function resetForm(backdrop) {
        const form = backdrop.querySelector('#checkoutCardForm');
        const error = backdrop.querySelector('#checkoutFormError');

        form.reset();
        error.textContent = '';
        document.getElementById('checkoutCardPreviewNumber').textContent = '4242 4242 4242 4242';
        document.getElementById('checkoutCardPreviewName').textContent = 'SKATER NAME';
        document.getElementById('checkoutCardPreviewExpiry').textContent = 'MM/YY';
        backdrop.querySelector('.checkout-modal-content').hidden = false;
        backdrop.querySelector('#checkoutSuccess').hidden = true;
    }

    function validateForm(backdrop) {
        const cardNumber = backdrop.querySelector('#checkoutCardNumber').value.replace(/\D/g, '');
        const expiry = backdrop.querySelector('#checkoutCardExpiry').value.replace(/\D/g, '');
        const cvc = backdrop.querySelector('#checkoutCardCvc').value.replace(/\D/g, '');
        const error = backdrop.querySelector('#checkoutFormError');

        if (cardNumber.length < 12) {
            error.textContent = 'Enter a test card number.';
            return false;
        }

        if (expiry.length !== 4) {
            error.textContent = 'Enter expiry as MM/YY.';
            return false;
        }

        if (cvc.length < 3) {
            error.textContent = 'Enter CVC.';
            return false;
        }

        error.textContent = '';
        return true;
    }

    function getCheckoutCustomer(backdrop) {
        return normalizeCustomer({
            email: backdrop.querySelector('#checkoutEmail')?.value.trim(),
            name: backdrop.querySelector('#checkoutCardName')?.value.trim()
        });
    }

    function submitPayment(backdrop) {
        if (!validateForm(backdrop)) return;

        const payButton = backdrop.querySelector('#checkoutPayButton');
        payButton.disabled = true;
        payButton.textContent = 'PROCESSING...';

        window.setTimeout(() => {
            let result = {};
            if (typeof modalState.onSuccess === 'function') {
                result = modalState.onSuccess({
                    items: normalizeItems(modalState.items),
                    total: getTotal(modalState.items),
                    customer: getCheckoutCustomer(backdrop)
                }) || {};
            }

            showSuccess(backdrop, result.orderId);
            payButton.disabled = false;
            payButton.textContent = modalState.submitLabel;
        }, 500);
    }

    function showSuccess(backdrop, orderId) {
        const successText = backdrop.querySelector('#checkoutSuccessText');
        successText.textContent = orderId
            ? `Your demo order #${orderId} has been confirmed.`
            : 'Your demo order has been confirmed.';

        backdrop.querySelector('.checkout-modal-content').hidden = true;
        backdrop.querySelector('#checkoutSuccess').hidden = false;
    }

    function open(options) {
        const items = normalizeItems(options?.items);
        if (items.length === 0) return;

        const backdrop = ensureModal();
        modalState = {
            items,
            onSuccess: options?.onSuccess || null,
            submitLabel: options?.submitLabel || 'PAY NOW',
            title: options?.title || 'Checkout'
        };

        resetForm(backdrop);
        renderModal(backdrop);
        backdrop.classList.add('open');
        backdrop.setAttribute('aria-hidden', 'false');
        document.body.classList.add('checkout-modal-open');
        backdrop.querySelector('#checkoutEmail').focus();
    }

    function close() {
        const backdrop = document.getElementById('checkoutModalBackdrop');
        if (!backdrop) return;

        backdrop.classList.remove('open');
        backdrop.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('checkout-modal-open');
    }

    window.Street19Checkout = {
        createOrder,
        open
    };
})();
