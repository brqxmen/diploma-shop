// --- Модальное окно события ---
function openEventModal(card) {
    const backdrop = document.getElementById('eventModalBackdrop');

    document.getElementById('modalImage').src       = card.dataset.image || '';
    document.getElementById('modalTitle').textContent       = card.dataset.title || '';
    const modalDate = document.getElementById('modalDate');
    modalDate.textContent = card.dataset.date || '';
    modalDate.dataset.dateIso = card.dataset.dateIso || '';
    document.getElementById('modalLocation').textContent    = card.dataset.location || '';
    document.getElementById('modalDescription').textContent = card.dataset.description || '';
    document.getElementById('modalDetails').textContent     = card.dataset.details || '';
    backdrop.dataset.eventKey = card.dataset.image || '';

    // Скрываем блок details если он пустой
    const detailsEl = document.getElementById('modalDetails');
    const divider = document.querySelector('.event-modal-divider');
    if (!card.dataset.details) {
        detailsEl.style.display = 'none';
        divider.style.display = 'none';
    } else {
        detailsEl.style.display = '';
        divider.style.display = '';
    }

    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    window.Street19Preferences?.applyLanguage?.();
}

function closeEventModal() {
    document.getElementById('eventModalBackdrop').classList.remove('open');
    document.body.style.overflow = '';
}

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeEventModal();
});
