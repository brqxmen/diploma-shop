// --- Hotspot карточки ---
const hotspots = document.querySelectorAll('.hotspot');
const popup = document.getElementById('info-card');
const popTitle = document.getElementById('pop-title');
const popDesc = document.getElementById('pop-desc');
const closePop = document.getElementById('close-pop');
const wrapper = document.querySelector('.blueprint-wrapper');

hotspots.forEach(hotspot => {
    hotspot.addEventListener('click', (e) => {
        e.stopPropagation();

        const title = hotspot.dataset.title;
        const info = hotspot.dataset.info;

        popTitle.textContent = title;
        popDesc.innerHTML = info;

        // Позиция точки относительно wrapper
        const wRect = wrapper.getBoundingClientRect();
        const hRect = hotspot.getBoundingClientRect();

        const dotX = hRect.left - wRect.left + hRect.width / 2;
        const dotY = hRect.top - wRect.top + hRect.height / 2;

        const popupW = 260;
        const popupH = 130;
        const margin = 14;

        // По умолчанию — справа от точки
        let left = dotX + margin;
        let top = dotY - popupH / 2;

        // Если выходит за правый край — показываем слева
        if (left + popupW > wRect.width - 10) {
            left = dotX - popupW - margin;
        }

        // Не выходим за верхний/нижний край
        if (top < 0) top = 4;
        if (top + popupH > wRect.height) top = wRect.height - popupH - 4;

        popup.style.left = left + 'px';
        popup.style.top = top + 'px';

        popup.classList.add('visible');
    });
});

// Закрытие по крестику
if (closePop) {
    closePop.addEventListener('click', (e) => {
        e.stopPropagation();
        popup.classList.remove('visible');
    });
}

// Закрытие по клику вне карточки
document.addEventListener('click', () => {
    if (popup) popup.classList.remove('visible');
});

popup && popup.addEventListener('click', (e) => e.stopPropagation());

const setupData = {
    street: {
        deck: '7.75" — 8.25"',
        wheels: '99A — 101A (HARD)',
        trucks: 'Low / Medium',
        desc: 'Smaller boards and harder wheels make technical flip tricks and grinds on rails easier.'
    },
    park: {
        deck: '8.25" — 8.5"',
        wheels: '97A — 99A (MED-HARD)',
        trucks: 'Medium',
        desc: 'A versatile setup for transition skating, providing balance between stability and flick-ability.'
    },
    vert: {
        deck: '8.5" — 9.0"+',
        wheels: '95A — 97A (SOFT-MED)',
        trucks: 'High',
        desc: 'Wide decks and larger wheels provide maximum stability and grip at high speeds on big ramps.'
    }
};

function updateSetup(style, btn) {
    // Управляем активным классом кнопок
    document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Эффект подмигивания при смене данных
    const card = document.getElementById('setup-card');
    card.style.opacity = 0;

    setTimeout(() => {
        const data = setupData[style];
        document.getElementById('deck-width').innerText = data.deck;
        document.getElementById('wheel-hardness').innerText = data.wheels;
        document.getElementById('truck-height').innerText = data.trucks;
        document.getElementById('spec-desc').innerText = data.desc;

        card.style.opacity = 1;
    }, 200);
}

