const defaultProfile = {
    firstName: '',
    lastName: '',
    email: '',
    emailOffers: false
};

let profile = JSON.parse(localStorage.getItem('street19_profile')) || defaultProfile;
let orders = JSON.parse(localStorage.getItem('street19_orders')) || [];

document.addEventListener('DOMContentLoaded', async function () {
    initTabs();
    await loadProfile();
    renderProfile();
    renderOrders();
    initProfileModal();
});

function saveProfile() {
    localStorage.setItem('street19_profile', JSON.stringify(profile));
    localStorage.setItem('street19_profile_id', profile.id);
    localStorage.setItem('street19_profile_email', profile.email);
}

async function loadProfile() {
    const profileId = localStorage.getItem('street19_profile_id');
    const profileEmail = localStorage.getItem('street19_profile_email') || profile.email;

    if (!profileId && !profileEmail) {
        window.location.href = '/register';
        return;
    }

    try {
        let response;

        if (profileId) {
            response = await fetch(`/api/profile/${profileId}`);
        } else if (profileEmail) {
            response = await fetch(`/api/profile?email=${encodeURIComponent(profileEmail)}`);
        }

        if (!response || !response.ok) {
            return;
        }

        profile = await response.json();
        saveProfile();
    } catch (err) {
        console.log('Profile was loaded from localStorage');
    }
}

function escapeHtml(value) {
    return String(value || '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
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
    return Number(price || 0).toFixed(2);
}

function initTabs() {
    const isOrdersPage = window.location.pathname.includes('/orders');
    const ordersSection = document.getElementById('ordersSection');
    const profileSection = document.getElementById('profileSection');
    const ordersTab = document.getElementById('ordersTab');
    const profileTab = document.getElementById('profileTab');

    ordersSection.hidden = !isOrdersPage;
    profileSection.hidden = isOrdersPage;
    ordersTab.classList.toggle('active', isOrdersPage);
    profileTab.classList.toggle('active', !isOrdersPage);
}

function renderProfile() {
    const fullName = `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || '-';
    document.getElementById('profileName').textContent = fullName;
    document.getElementById('profileEmail').textContent = profile.email || '-';
    document.getElementById('profileAddress').textContent = profile.address || '-';

    const addressPlaceholder = document.querySelector('.address-placeholder');
    if (addressPlaceholder) {
        addressPlaceholder.textContent = profile.address || 'No addresses yet';
    }
}

function renderOrders() {
    const ordersList = document.getElementById('ordersList');
    if (!ordersList) return;

    ordersList.innerHTML = '';

    if (orders.length === 0) {
        ordersList.innerHTML = `
            <div class="orders-empty">
                <strong>No orders yet</strong>
                <span>Go to the store and place an order.</span>
            </div>
        `;
        return;
    }

    orders.forEach(order => {
        const orderDate = new Date(order.date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });

        const items = (order.items || []).map(item => `
            <div class="order-product">
                <img src="${normalizeImagePath(item.image)}" alt="${escapeHtml(item.name)}">
                <div class="order-product-info">
                    <h3>${escapeHtml(item.name)}</h3>
                    ${item.size ? `<p>Size: ${escapeHtml(item.size)}</p>` : ''}
                    <p>Quantity: ${Number(item.quantity || 1)}</p>
                </div>
                <strong>$${formatPrice(Number(item.price || 0) * Number(item.quantity || 1))}</strong>
            </div>
        `).join('');

        ordersList.innerHTML += `
            <article class="order-card">
                <div class="order-card-head">
                    <span>${orderDate}</span>
                    <strong>${escapeHtml(order.status || 'Confirmed')}</strong>
                </div>
                <div class="order-products">${items}</div>
                <div class="order-card-bottom">
                    <span>Order #${order.id}</span>
                    <strong>$${formatPrice(order.total)}</strong>
                </div>
            </article>
        `;
    });
}

function initProfileModal() {
    const modal = document.getElementById('profileModal');
    const editButton = document.getElementById('editProfileBtn');
    const addAddressButton = document.getElementById('addAddressBtn');
    const cancelButton = document.getElementById('cancelProfileBtn');
    const form = document.getElementById('profileForm');

    const openModal = () => {
        document.getElementById('firstNameInput').value = profile.firstName || '';
        document.getElementById('lastNameInput').value = profile.lastName || '';
        document.getElementById('emailInput').value = profile.email || '';
        document.getElementById('emailOffersInput').checked = Boolean(profile.emailOffers);
        document.getElementById('addressInput').value = profile.address || '';
        modal.classList.add('show');
    };

    editButton.addEventListener('click', openModal);
    addAddressButton.addEventListener('click', openModal);

    cancelButton.addEventListener('click', () => modal.classList.remove('show'));

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const profileData = {
            firstName: document.getElementById('firstNameInput').value.trim(),
            lastName: document.getElementById('lastNameInput').value.trim(),
            email: document.getElementById('emailInput').value.trim(),
            emailOffers: document.getElementById('emailOffersInput').checked,
            address: document.getElementById('addressInput').value.trim()
        };

        if (!profile.id) {
            const registerResponse = await fetch('/api/profile/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profileData)
            });

            if (!registerResponse.ok) return;
            profile = await registerResponse.json();
        } else {
            const response = await fetch(`/api/profile/${profile.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profileData)
            });

            if (!response.ok) return;
            profile = await response.json();
        }

        saveProfile();
        renderProfile();
        modal.classList.remove('show');
    });
}
