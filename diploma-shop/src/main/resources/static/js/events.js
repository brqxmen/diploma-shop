// --- Модальное окно события ---
function openEventModal(card) {
    const backdrop = document.getElementById('eventModalBackdrop');

    document.getElementById('modalImage').src       = card.dataset.image || '';
    document.getElementById('modalTitle').textContent       = card.dataset.title || '';
    const modalDate = document.getElementById('modalDate');
    modalDate.textContent = card.dataset.date || '';
    modalDate.dataset.dateIso = card.dataset.dateIso || '';
    document.getElementById('modalLocation').textContent    = card.dataset.location || '';
    renderTextWithLinks(document.getElementById('modalDescription'), card.dataset.description || '');
    renderTextWithLinks(document.getElementById('modalDetails'), card.dataset.details || '');
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

function renderTextWithLinks(element, text) {
    text = text || '';

    if (element.dataset.linkifiedText === text) {
        return;
    }

    element.textContent = '';
    element.dataset.linkifiedText = text;

    if (!text) {
        return;
    }

    const urlRegex = /(?:https?:\/\/|www\.|(?:[a-z0-9-]+\.)+[a-z]{2,})[^\s<>"']*/gi;
    let currentIndex = 0;
    let match;

    while ((match = urlRegex.exec(text)) !== null) {
        if (match.index > currentIndex) {
            element.appendChild(document.createTextNode(text.slice(currentIndex, match.index)));
        }

        const rawUrl = match[0];
        const trailing = rawUrl.match(/[.,!?;:)\]]+$/)?.[0] || '';
        const url = trailing ? rawUrl.slice(0, -trailing.length) : rawUrl;
        const link = document.createElement('a');

        link.href = /^https?:\/\//i.test(url) ? url : `https://${url}`;
        link.textContent = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

        element.appendChild(link);

        if (trailing) {
            element.appendChild(document.createTextNode(trailing));
        }

        currentIndex = match.index + rawUrl.length;
    }

    if (currentIndex < text.length) {
        element.appendChild(document.createTextNode(text.slice(currentIndex)));
    }
}

window.Street19RenderTextWithLinks = renderTextWithLinks;

function closeEventModal() {
    document.getElementById('eventModalBackdrop').classList.remove('open');
    document.body.style.overflow = '';
}

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeEventModal();
});
