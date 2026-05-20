function openEventModal(id) {
    const backdrop = document.getElementById('eventModalBackdrop');
    const title = document.getElementById('eventModalTitle');

    document.getElementById('eventForm').reset();
    document.getElementById('eventId').value = '';

    if (id) {
        const event = eventsData.find(e => e.id === id);
        if (!event) return;

        title.textContent = 'Edit event';
        document.getElementById('eventId').value = event.id;
        document.getElementById('eventTitle').value = event.title || '';
        document.getElementById('eventDescription').value = event.description || '';
        document.getElementById('eventDetails').value = event.details || '';
        document.getElementById('eventLocation').value = event.location || '';
        document.getElementById('eventImageUrl').value = event.imageUrl || '';

        // Форматируем дату для datetime-local input
        if (event.eventDate) {
            const d = new Date(event.eventDate);
            const pad = n => String(n).padStart(2, '0');
            const local = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
            document.getElementById('eventDate').value = local;
        }
    } else {
        title.textContent = 'Add event';
    }

    backdrop.classList.add('open');
}

function closeEventModal() {
    document.getElementById('eventModalBackdrop').classList.remove('open');
}

document.getElementById('eventModalBackdrop').addEventListener('click', function(e) {
    if (e.target === this) closeEventModal();
});

document.getElementById('eventForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const id = document.getElementById('eventId').value;
    const dateVal = document.getElementById('eventDate').value;

    const body = {
        title:       document.getElementById('eventTitle').value.trim(),
        description: document.getElementById('eventDescription').value.trim(),
        details:     document.getElementById('eventDetails').value.trim(),
        location:    document.getElementById('eventLocation').value.trim(),
        imageUrl:    document.getElementById('eventImageUrl').value.trim(),
        eventDate:   dateVal ? dateVal + ':00' : null
    };

    if (id) body.id = parseInt(id);

    const res = await fetch('/admin/events/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    if (res.ok) {
        closeEventModal();
        location.reload();
    } else {
        alert('Error saving event');
    }
});

async function deleteEvent(id) {
    if (!confirm('Delete this event?')) return;
    const res = await fetch(`/admin/events/${id}`, { method: 'DELETE' });
    if (res.ok) location.reload();
    else alert('Error deleting event');
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeEventModal();
});
