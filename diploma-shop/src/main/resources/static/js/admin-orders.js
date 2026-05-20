const CHECKOUT_ORDERS_KEY = 'street19_orders';

const ORDER_STATUSES = [
    { value: 'new', label: 'Новый заказ' },
    { value: 'processing', label: 'В обработке' },
    { value: 'preparing', label: 'Готовится к отправке' },
    { value: 'delivery', label: 'В доставке' },
    { value: 'delivered', label: 'Доставлен' },
    { value: 'cancelled', label: 'Отменён' }
];

const demoOrders = [
    {
        id: 'ORD-1001',
        user: 'Айдана С.',
        contact: '+7 701 214 88 10',
        product: 'Lakai Conrad - Elite Black Gum Suede',
        quantity: '1 пара',
        total: 84.95,
        date: '19.05.2026',
        status: 'new'
    },
    {
        id: 'ORD-1002',
        user: 'Нурлан К.',
        contact: 'nurlan.demo@example.com',
        product: 'Bones® REDS® Skateboard Bearings 8 pack',
        quantity: '2 набора',
        total: 49.90,
        date: '18.05.2026',
        status: 'processing'
    },
    {
        id: 'ORD-1003',
        user: 'Марина Т.',
        contact: '+7 777 091 45 20',
        product: 'HABITAT x PINK FLOYD Dark Side of the Moon Griptape',
        quantity: '1 лист',
        total: 20.61,
        date: '17.05.2026',
        status: 'preparing'
    },
    {
        id: 'ORD-1004',
        user: 'Данияр М.',
        contact: 'daniyar.demo@example.com',
        product: 'Aura Wrench - Red',
        quantity: '1 дека 8.25',
        total: 69.95,
        date: '16.05.2026',
        status: 'delivery'
    },
    {
        id: 'ORD-1005',
        user: 'Елена Р.',
        contact: '+7 705 339 72 65',
        product: 'Footwork Fleece Black Hat',
        quantity: '1 шт.',
        total: 10.29,
        date: '15.05.2026',
        status: 'delivered'
    },
    {
        id: 'ORD-1006',
        user: 'Арман Б.',
        contact: 'arman.demo@example.com',
        product: 'GIRL OG WHITE BAR WAX',
        quantity: '2 шт.',
        total: 32.80,
        date: '14.05.2026',
        status: 'cancelled'
    }
];

const statusLookup = ORDER_STATUSES.reduce((lookup, status) => {
    lookup[status.value] = status.label;
    return lookup;
}, {});

const statusAliases = {
    Confirmed: 'new',
    confirmed: 'new',
    New: 'new',
    new: 'new',
    processing: 'processing',
    preparing: 'preparing',
    delivery: 'delivery',
    delivered: 'delivered',
    Delivered: 'delivered',
    Cancelled: 'cancelled',
    Canceled: 'cancelled',
    cancelled: 'cancelled',
    canceled: 'cancelled',
    'Отменён': 'cancelled'
};

let visibleOrders = [];

function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, character => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[character]));
}

function readStoredOrders() {
    try {
        const storedOrders = JSON.parse(localStorage.getItem(CHECKOUT_ORDERS_KEY)) || [];
        return Array.isArray(storedOrders) ? storedOrders : [];
    } catch (err) {
        return [];
    }
}

function saveStoredOrders(orders) {
    try {
        localStorage.setItem(CHECKOUT_ORDERS_KEY, JSON.stringify(orders));
    } catch (err) {
        console.log('Demo orders were not saved to localStorage');
    }
}

function normalizeStatus(status) {
    return statusAliases[status] || (statusLookup[status] ? status : 'new');
}

function formatMoney(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(Number(value || 0));
}

function formatStoredOrderId(rawId, index) {
    const value = String(rawId || '').trim();

    if (value.startsWith('ORD-') || value.startsWith('S19-')) {
        return value;
    }

    const digits = value.replace(/\D/g, '') || String(index + 1);
    return `S19-${digits.slice(-6).padStart(6, '0')}`;
}

function formatStoredOrderDate(date) {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return '-';
    }

    return parsedDate.toLocaleDateString('ru-RU');
}

function getStoredOrderProducts(items) {
    if (!items.length) {
        return 'Street 19 order';
    }

    return items.map((item) => {
        const name = item.name || 'Street 19 product';
        return item.size ? `${name} (${item.size})` : name;
    }).join(', ');
}

function getStoredOrderQuantity(items) {
    const totalQuantity = items.reduce((sum, item) => sum + Math.max(1, Number(item.quantity || 1)), 0);

    if (items.length <= 1) {
        return `${totalQuantity || 1} шт.`;
    }

    return `${items.length} позиции / ${totalQuantity} шт.`;
}

function getStoredOrderTotal(order, items) {
    const savedTotal = Number(order.total || 0);

    if (savedTotal > 0) {
        return savedTotal;
    }

    return items.reduce((sum, item) => {
        const price = Number(item.price || 0);
        const quantity = Math.max(1, Number(item.quantity || 1));
        return sum + price * quantity;
    }, 0);
}

function normalizeStoredOrder(order, index) {
    const items = Array.isArray(order.items) ? order.items : [];
    const customer = order.customer || {};

    return {
        id: formatStoredOrderId(order.id, index),
        storageId: String(order.id || ''),
        source: 'checkout',
        user: order.customerName || customer.name || 'Demo customer',
        contact: order.contact || order.email || customer.email || '-',
        product: getStoredOrderProducts(items),
        quantity: getStoredOrderQuantity(items),
        total: getStoredOrderTotal(order, items),
        date: formatStoredOrderDate(order.date),
        status: normalizeStatus(order.adminStatus || order.status)
    };
}

function getOrders() {
    const checkoutOrders = readStoredOrders().map(normalizeStoredOrder);
    return [...checkoutOrders, ...demoOrders];
}

function renderStatusOptions(currentStatus) {
    return ORDER_STATUSES.map((status) => (
        `<option value="${status.value}" ${status.value === currentStatus ? 'selected' : ''}>${status.label}</option>`
    )).join('');
}

function renderOrders() {
    const tbody = document.getElementById('ordersTableBody');

    if (!tbody) {
        return;
    }

    visibleOrders = getOrders();

    tbody.innerHTML = visibleOrders.map((order) => `
        <tr>
            <td data-label="Order"><span class="order-id">${escapeHtml(order.id)}</span></td>
            <td data-label="User">${escapeHtml(order.user)}</td>
            <td data-label="Contact"><span class="order-contact">${escapeHtml(order.contact)}</span></td>
            <td data-label="Product">${escapeHtml(order.product)}</td>
            <td data-label="Qty">${escapeHtml(order.quantity)}</td>
            <td data-label="Total">${formatMoney(order.total)}</td>
            <td data-label="Date">${escapeHtml(order.date)}</td>
            <td data-label="Status">
                <span class="order-status-badge status-${order.status}" data-status-badge="${escapeHtml(order.id)}">
                    ${statusLookup[order.status]}
                </span>
            </td>
            <td data-label="Change status">
                <select class="order-status-select" data-order-id="${escapeHtml(order.id)}" data-status="${order.status}">
                    ${renderStatusOptions(order.status)}
                </select>
            </td>
        </tr>
    `).join('');

    updateSummary();
}

function persistStoredOrderStatus(order, nextStatus) {
    if (order.source !== 'checkout' || !order.storageId) {
        return;
    }

    const storedOrders = readStoredOrders();
    const storedOrder = storedOrders.find((item) => String(item.id || '') === order.storageId);

    if (!storedOrder) {
        return;
    }

    storedOrder.adminStatus = nextStatus;
    saveStoredOrders(storedOrders);
}

function updateOrderStatus(orderId, nextStatus) {
    const order = visibleOrders.find((item) => item.id === orderId);

    if (!order || !statusLookup[nextStatus]) {
        return;
    }

    order.status = nextStatus;
    persistStoredOrderStatus(order, nextStatus);

    const badge = document.querySelector(`[data-status-badge="${orderId}"]`);
    const select = document.querySelector(`[data-order-id="${orderId}"]`);

    if (badge) {
        badge.className = `order-status-badge status-${nextStatus}`;
        badge.textContent = statusLookup[nextStatus];
    }

    if (select) {
        select.dataset.status = nextStatus;
    }

    updateSummary();
}

function updateSummary() {
    const totalCount = document.getElementById('ordersTotalCount');
    const activeCount = document.getElementById('ordersActiveCount');
    const deliveredCount = document.getElementById('ordersDeliveredCount');
    const cancelledCount = document.getElementById('ordersCancelledCount');

    const delivered = visibleOrders.filter((order) => order.status === 'delivered').length;
    const cancelled = visibleOrders.filter((order) => order.status === 'cancelled').length;
    const active = visibleOrders.length - delivered - cancelled;

    if (totalCount) {
        totalCount.textContent = `${visibleOrders.length} demo orders`;
    }

    if (activeCount) {
        activeCount.textContent = active;
    }

    if (deliveredCount) {
        deliveredCount.textContent = delivered;
    }

    if (cancelledCount) {
        cancelledCount.textContent = cancelled;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderOrders();

    document.addEventListener('change', (event) => {
        const select = event.target.closest('.order-status-select');

        if (!select) {
            return;
        }

        updateOrderStatus(select.dataset.orderId, select.value);
    });
});
