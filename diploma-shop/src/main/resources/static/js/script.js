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
});
