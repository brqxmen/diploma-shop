document.addEventListener('mousemove', (e) => {
    const card = document.querySelector('.info-card');
    const circle = document.querySelector('.circle-image-wrapper');

    if (!card || !circle) return;

    const mouseX = e.clientX - window.innerWidth / 2;
    const mouseY = e.clientY - window.innerHeight / 2;


    card.style.transform = `translate(${mouseX * 0.02}px, ${mouseY * 0.02}px)`;

    circle.style.transform = `translate(${mouseX * -0.04}px, ${mouseY * -0.04}px)`;
});

const filmsData = [
    {
        id: "01",
        title: "Back to the Future (1985)",
        genre: "Sci-fi / Adventure",
        stars: "★★★★★",
        desc: "An ordinary teenager, a reckless scientist, and a car capable of bending time — one accidental trip to the past turns Marty McFly’s life upside down. Now he has only a few days to fix history before the future disappears completely.",
        link: "https://kinogo.family/filmy/14428-nazad-v-buduschee.html"
    },
    {
        id: "02",
        title: "Kids (1995)",
        genre: "Drama",
        stars: "★★★★☆",
        desc: "Skateboards, heat, cheap alcohol, and endless wandering through New York streets. For a group of teenagers, adulthood feels far away — until reality suddenly catches up with them faster than they expected.",
        link: "https://kinogo.family/filmy/11651-detki.html"
    },
    {
        id: "03",
        title: "Dogtown and Z-Boys (2001)",
        genre: "Documentary",
        stars: "★★★★★",
        desc: "Before skateboarding became mainstream, it belonged to loud, reckless kids from the streets of Dogtown. This documentary tells the story of the crew that transformed skating from a hobby into a cultural movement.",
        link: "https://kinogo-filmov.net/1382985-parni-na-skeytah-2001.html"
    },
    {
        id: "04",
        title: "Paranoid Park (2007)",
        genre: "Drama / Psychological",
        stars: "★★★★★",
        desc: "A quiet skatepark hidden beneath the city becomes both an escape and a nightmare for teenager Alex. Between drifting thoughts and fragmented memories, he struggles to live with a secret that changed everything overnight.",
        link: "https://kinogo.family/filmy/21863-paranoid-park.html"
    },
    {
        id: "05",
        title: "Dragonslayer (2011)",
        genre: "Documentary",
        stars: "★★★★★",
        desc: "Josh lives like there’s no tomorrow: abandoned pools, stolen moments, sleepless nights, and skateboarding as the only thing holding his world together. A raw portrait of youth balancing somewhere between freedom and collapse.",
        link: "https://www.kinopoisk.ru/film/569421/"
    },
    {
        id: "06",
        title: "Bones Brigade: An Autobiography (2012)",
        genre: "Documentary",
        stars: "★★★★★",
        desc: "Long before skateboarding filled social media feeds, a small team of outsiders was rewriting its future. Through memories, victories, and personal struggles, the legends of Bones Brigade look back at the era that shaped an entire generation of skaters.",
        link: "https://www.kinopoisk.ru/film/728100/"
    },
    {
        id: "07",
        title: "Skate Kitchen (2018)",
        genre: "Drama / Coming-of-age",
        stars: "★★★★★",
        desc: "Tired of feeling alone, Camille finds herself pulled into an all-girl skate crew where every ride through New York feels like freedom. But growing closer to new people also means learning how fragile friendship and trust can be.",
        link: "https://kinogo.family/filmy/760-skejt-kuhnja.html"
    },
    {
        id: "08",
        title: "Mid 90's (2018)",
        genre: "Coming-of-age",
        stars: "★★★★★",
        desc: "Los Angeles, the 1990s. 13-year-old Stevie is supposed to be thinking about his future, but instead, he finds refuge in skateboarding...",
        link: "https://kinogo.family/filmy/7210-seredina-90-h.html"
    },
    {
        id: "09",
        title: "SK8 the Infinity (2021)",
        genre: "Sports / Action",
        stars: "★★★★★",
        desc: "Hidden after dark, the underground races of “S” attract skaters willing to risk everything for adrenaline and respect. For Langa, a newcomer with snowboarding skills and no experience on a skateboard, this world is about to change his life completely.",
        link: "https://jut-su.net/1061-skejt-beskonechnost.html"
    },
    {
        id: "10",
        title: "Street Dreams (2009)",
        genre: "Drama",
        stars: "★★★★★",
        desc: "Derrick spends every free moment skating, chasing a dream that nobody around him takes seriously. Between pressure from family and the harsh reality of competition, he has to decide how much he’s willing to sacrifice for the life he wants.",
        link: "https://youtu.be/HGezagpjZiA?si=tccMJWK74K0_EqNY"
    }

];

const posters = document.querySelectorAll('.poster-item');
const sliderContainer = document.getElementById('slider-container');
const arrowLeft = document.getElementById('arrow-left');
const arrowRight = document.getElementById('arrow-right');

// Ширина одного постера + gap для скролла
const SCROLL_STEP = 300;

function updateArrows() {
    if (!sliderContainer) return;
    arrowLeft.disabled = sliderContainer.scrollLeft <= 0;
    arrowRight.disabled = sliderContainer.scrollLeft + sliderContainer.clientWidth >= sliderContainer.scrollWidth - 1;
}

if (arrowLeft && arrowRight && sliderContainer) {
    arrowLeft.addEventListener('click', () => {
        sliderContainer.scrollBy({ left: -SCROLL_STEP, behavior: 'smooth' });
    });

    arrowRight.addEventListener('click', () => {
        sliderContainer.scrollBy({ left: SCROLL_STEP, behavior: 'smooth' });
    });

    sliderContainer.addEventListener('scroll', updateArrows);
    updateArrows();
}

posters.forEach(poster => {
    poster.addEventListener('click', () => {
        posters.forEach(p => p.classList.remove('active'));
        poster.classList.add('active');

        const filmId = parseInt(poster.getAttribute('data-id'));
        const data = filmsData[filmId];
        updateInfo(data);
    });
});

function updateInfo(data) {
    const infoBox = document.getElementById('current-film-info');
    infoBox.style.opacity = 0; // Плавное исчезновение

    setTimeout(() => {
        document.getElementById('info-num').innerText = data.id;
        document.getElementById('info-title').innerText = data.title;
        document.getElementById('info-genre').innerText = `Genre: ${data.genre}`;
        document.getElementById('info-stars').innerText = data.stars;
        document.getElementById('info-desc').innerText = data.desc;
        document.getElementById('watch-btn').href = data.link;

        infoBox.style.opacity = 1; // Плавное появление
    }, 300);
}
