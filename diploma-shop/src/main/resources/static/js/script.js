document.addEventListener('DOMContentLoaded', () => {

    // --- Скейт ---
    const skateGroup = document.getElementById('skateToggle');
    if (skateGroup) {
        const skateParts = skateGroup.querySelectorAll('.skate-part');
        skateParts.forEach(part => {
            part.addEventListener('click', () => {
                skateGroup.classList.toggle('is-active');
            });
        });
    }

    // --- Слайдер ---
    const slides = Array.from(document.querySelectorAll('.slide'));
    if (slides.length > 0) {
        let current = 0;
        slides[current].classList.add('active');

        const nextBtn = document.getElementById('albumNext');
        const prevBtn = document.getElementById('albumPrev');

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                slides[current].classList.remove('active');
                current = (current + 1) % slides.length;
                slides[current].classList.add('active');
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                slides[current].classList.remove('active');
                current = (current - 1 + slides.length) % slides.length;
                slides[current].classList.add('active');
            });
        }
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
                if (subscribeMsg) subscribeMsg.textContent = 'Что-то пошло не так, попробуй ещё раз.';
            }
        });
    }

    // --- Выбор валюты ---
    const currencySelector = document.getElementById('currencySelector');
    const currencyBtn = document.getElementById('currencyBtn');
    const currencyFlag = document.getElementById('currencyFlag');
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

        document.addEventListener('click', () => {
            currencySelector.classList.remove('open');
        });
    }

});
