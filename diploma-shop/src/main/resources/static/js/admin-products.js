function openProductModal(data) {
    const backdrop = document.getElementById('productModalBackdrop');
    const title = document.getElementById('productModalTitle');

    if (data && data.id) {
        title.textContent = 'Edit product';
        document.getElementById('productId').value = data.id || '';
        document.getElementById('productName').value = data.name || '';
        document.getElementById('productPrice').value = data.price || '';
        document.getElementById('productBonusPrice').value = data.bonusPrice || '';
        document.getElementById('productCategory').value = data.category || 'Clothes';
        document.getElementById('productBrand').value = data.brand || '';
        document.getElementById('productType').value = data.productType || '';
        document.getElementById('productColor').value = data.color || '';
        document.getElementById('productSize').value = data.size || '';
        document.getElementById('productImage').value = data.image || '';
        document.getElementById('productGalleryImages').value = data.galleryImages || '';
        document.getElementById('productDescription').value = data.description || '';
    } else {
        title.textContent = 'Add product';
        document.getElementById('productForm').reset();
        document.getElementById('productId').value = '';
    }

    backdrop.classList.add('open');
}

function closeProductModal() {
    document.getElementById('productModalBackdrop').classList.remove('open');
}

document.getElementById('productModalBackdrop').addEventListener('click', function(e) {
    if (e.target === this) closeProductModal();
});

document.getElementById('productForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const id = document.getElementById('productId').value;
    const brand = document.getElementById('productBrand').value.trim();
    const productType = document.getElementById('productType').value.trim();
    const price = parseFloat(document.getElementById('productPrice').value);
    const bonusPriceValue = document.getElementById('productBonusPrice').value.trim();
    const bonusPrice = bonusPriceValue ? parseFloat(bonusPriceValue) : null;

    if (!productType) {
        alert('Product type is required');
        return;
    }

    if (!Number.isFinite(price) || price < 0) {
        alert('Price is required');
        return;
    }

    if (bonusPriceValue && (!Number.isFinite(bonusPrice) || bonusPrice < 0)) {
        alert('Bonus price must be a positive number');
        return;
    }

    const body = {
        name:      document.getElementById('productName').value.trim(),
        price,
        bonusPrice,
        category:  document.getElementById('productCategory').value,
        brand,
        productType,
        color:     document.getElementById('productColor').value.trim(),
        size:      document.getElementById('productSize').value.trim(),
        imageName: document.getElementById('productImage').value.trim(),
        galleryImages: document.getElementById('productGalleryImages').value.trim(),
        description: document.getElementById('productDescription').value.trim()
    };

    if (id) body.id = parseInt(id);

    const res = await fetch('/admin/products/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    if (res.ok) {
        closeProductModal();
        location.reload();
    } else {
        alert('Error saving product');
    }
});

async function deleteProduct(id) {
    if (!confirm('Delete this product?')) return;
    const res = await fetch(`/admin/products/${id}`, { method: 'DELETE' });
    if (res.ok) location.reload();
    else alert('Error deleting product');
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeProductModal();
});
