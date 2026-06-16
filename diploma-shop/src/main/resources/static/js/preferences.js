(() => {
    const STORAGE_CURRENCY = 'street19_currency';
    const STORAGE_LANGUAGE = 'street19_language';
    const STORAGE_RATES = 'street19_currency_rates';
    const RATES_MAX_AGE = 12 * 60 * 60 * 1000;
    const CONTACT_URL = 'https://t.me/bmnknz';

    const currencies = {
        KZT: { labels: { en: 'KAZAKHSTAN (KZT ₸)', ru: 'КАЗАХСТАН (KZT ₸)', kk: 'ҚАЗАҚСТАН (KZT ₸)' }, shortLabel: 'KZT ₸', symbol: '₸', rate: 510, fractionDigits: 0, symbolAfter: true },
        RUB: { labels: { en: 'RUSSIA (RUB ₽)', ru: 'РОССИЯ (RUB ₽)', kk: 'РЕСЕЙ (RUB ₽)' }, shortLabel: 'RUB ₽', symbol: '₽', rate: 90, fractionDigits: 0, symbolAfter: true },
        EUR: { labels: { en: 'EUROPE (EUR €)', ru: 'ЕВРОПА (EUR €)', kk: 'ЕУРОПА (EUR €)' }, shortLabel: 'EUR €', symbol: '€', rate: 0.93, fractionDigits: 2 },
        USD: { labels: { en: 'USA (USD $)', ru: 'США (USD $)', kk: 'АҚШ (USD $)' }, shortLabel: 'USD $', symbol: '$', rate: 1, fractionDigits: 2 },
        GBP: { labels: { en: 'UK (GBP £)', ru: 'ВЕЛИКОБРИТАНИЯ (GBP £)', kk: 'ҰЛЫБРИТАНИЯ (GBP £)' }, shortLabel: 'GBP £', symbol: '£', rate: 0.79, fractionDigits: 2 }
    };

    const languages = {
        en: { label: 'ENG', htmlLang: 'en' },
        ru: { label: 'RUS', htmlLang: 'ru' },
        kk: { label: 'KAZ', htmlLang: 'kk' }
    };

    const translations = {
        en: {
            'nav.shop': 'shop',
            'nav.culture': 'culture',
            'nav.learn': 'learn',
            'nav.events': 'events',
            'footer.updates': 'Sign up for updates',
            'footer.subscribe': 'SUBSCRIBE',
            'footer.moreInfo': 'MORE INFO',
            'footer.contact': 'Contact',
            'footer.help': 'Help Center',
            'footer.privacy': 'Privacy Policy',
            'footer.refund': 'Refund Policy',
            'footer.shipping': 'Shipping Policy',
            'footer.terms': 'Terms of Service',
            'product.size': 'Size:',
            'product.addToCart': 'ADD TO CART',
            'product.added': 'ADDED',
            'cart.title': 'CART',
            'cart.clearAll': 'CLEAR ALL',
            'cart.viewCart': 'VIEW CART',
            'cart.checkout': 'CHECKOUT',
            'cart.subtotal': 'Subtotal:',
            'cart.signIn': 'Sign in to your account for a faster checkout.',
            'cart.empty': 'Your cart is empty',
            'cart.dropdownEmpty': 'Empty',
            'cart.quantity': 'Quantity',
            'order.confirmed': 'Confirmed',
            'profile.noOrders': 'No orders yet',
            'profile.goStore': 'Go to the store and place an order.',
            'sizeChart.title': 'Size chart',
            'sizeChart.eu': 'EU',
            'sizeChart.us': 'US',
            'sizeChart.uk': 'UK',
            'sizeChart.cm': 'CM',
            'sizeChart.size': 'Size',
            'sizeChart.chest': 'Chest',
            'sizeChart.waist': 'Waist',
            'sizeChart.height': 'Height',
            'search.placeholder': 'Search...',
            'email.placeholder': 'E-mail',
            'register.title': 'Sign in',
            'register.subtitle': 'Sign in or create an account',
            'register.continue': 'Continue',
            'register.offers': 'Email me with news and offers',
            'register.emailPlaceholder': 'Email',
            'register.codePlaceholder': 'Verification code',
            'register.sendCode': 'SEND CODE',
            'register.sending': 'Sending code...',
            'register.codeSent': 'Code sent. Check your email.',
            'register.devCode': 'Local test code: {code}',
            'register.emailRequired': 'Enter your email first.',
            'register.codeRequired': 'Enter the 6-digit code from email.',
            'register.verifyFailed': 'Code is incorrect or expired.',
            'register.creating': 'Checking code...',
            'register.submitError': 'Could not finish sign in. Try again.'
        },
        ru: {
            'nav.shop': 'магазин',
            'nav.culture': 'культура',
            'nav.learn': 'обучение',
            'nav.events': 'события',
            'footer.updates': 'Подпишитесь на новости',
            'footer.subscribe': 'ПОДПИСАТЬСЯ',
            'footer.moreInfo': 'БОЛЬШЕ ИНФО',
            'footer.contact': 'Контакты',
            'footer.help': 'Центр помощи',
            'footer.privacy': 'Политика конфиденциальности',
            'footer.refund': 'Политика возврата',
            'footer.shipping': 'Доставка',
            'footer.terms': 'Условия сервиса',
            'product.size': 'Размер:',
            'product.addToCart': 'ДОБАВИТЬ В КОРЗИНУ',
            'product.added': 'ДОБАВЛЕНО',
            'cart.title': 'КОРЗИНА',
            'cart.clearAll': 'ОЧИСТИТЬ',
            'cart.viewCart': 'КОРЗИНА',
            'cart.checkout': 'ОФОРМИТЬ',
            'cart.subtotal': 'Итого:',
            'cart.signIn': 'Войдите в аккаунт, чтобы оформить заказ быстрее.',
            'cart.empty': 'Корзина пуста',
            'cart.dropdownEmpty': 'Пусто',
            'cart.quantity': 'Количество',
            'order.confirmed': 'Подтвержден',
            'profile.noOrders': 'Заказов пока нет',
            'profile.goStore': 'Перейдите в магазин и оформите заказ.',
            'sizeChart.title': 'Таблица размеров',
            'sizeChart.eu': 'EU',
            'sizeChart.us': 'US',
            'sizeChart.uk': 'UK',
            'sizeChart.cm': 'СМ',
            'sizeChart.size': 'Размер',
            'sizeChart.chest': 'Грудь',
            'sizeChart.waist': 'Талия',
            'sizeChart.height': 'Рост',
            'search.placeholder': 'Поиск...',
            'email.placeholder': 'E-mail',
            'register.title': 'Войти',
            'register.subtitle': 'Войдите или создайте аккаунт',
            'register.continue': 'Продолжить',
            'register.offers': 'Отправлять мне новости и предложения',
            'register.emailPlaceholder': 'Email',
            'register.codePlaceholder': 'Код подтверждения',
            'register.sendCode': 'ОТПРАВИТЬ КОД',
            'register.sending': 'Отправляем код...',
            'register.codeSent': 'Код отправлен. Проверьте email.',
            'register.devCode': 'Код для локальной проверки: {code}',
            'register.emailRequired': 'Сначала введите email.',
            'register.codeRequired': 'Введите 6-значный код из письма.',
            'register.verifyFailed': 'Код неверный или истек.',
            'register.creating': 'Проверяем код...',
            'register.submitError': 'Не получилось войти. Попробуйте еще раз.'
        },
        kk: {
            'nav.shop': 'дүкен',
            'nav.culture': 'мәдениет',
            'nav.learn': 'үйрену',
            'nav.events': 'оқиғалар',
            'footer.updates': 'Жаңалықтарға жазылыңыз',
            'footer.subscribe': 'ЖАЗЫЛУ',
            'footer.moreInfo': 'ҚОСЫМША АҚПАРАТ',
            'footer.contact': 'Байланыс',
            'footer.help': 'Көмек орталығы',
            'footer.privacy': 'Құпиялылық саясаты',
            'footer.refund': 'Қайтару саясаты',
            'footer.shipping': 'Жеткізу саясаты',
            'footer.terms': 'Қызмет көрсету шарттары',
            'product.size': 'Өлшем:',
            'product.addToCart': 'СЕБЕТКЕ ҚОСУ',
            'product.added': 'ҚОСЫЛДЫ',
            'cart.title': 'СЕБЕТ',
            'cart.clearAll': 'ТАЗАЛАУ',
            'cart.viewCart': 'СЕБЕТ',
            'cart.checkout': 'ТӨЛЕУ',
            'cart.subtotal': 'Барлығы:',
            'cart.signIn': 'Жылдам төлеу үшін аккаунтқа кіріңіз.',
            'cart.empty': 'Себет бос',
            'cart.dropdownEmpty': 'Бос',
            'cart.quantity': 'Саны',
            'order.confirmed': 'Расталды',
            'profile.noOrders': 'Әзірге тапсырыс жоқ',
            'profile.goStore': 'Дүкенге өтіп, тапсырыс беріңіз.',
            'sizeChart.title': 'Өлшем кестесі',
            'sizeChart.eu': 'EU',
            'sizeChart.us': 'US',
            'sizeChart.uk': 'UK',
            'sizeChart.cm': 'СМ',
            'sizeChart.size': 'Өлшем',
            'sizeChart.chest': 'Кеуде',
            'sizeChart.waist': 'Бел',
            'sizeChart.height': 'Бой',
            'search.placeholder': 'Іздеу...',
            'email.placeholder': 'E-mail',
            'register.title': 'Кіру',
            'register.subtitle': 'Кіріңіз немесе аккаунт жасаңыз',
            'register.continue': 'Жалғастыру',
            'register.offers': 'Маған жаңалықтар мен ұсыныстар жіберу',
            'register.emailPlaceholder': 'Email',
            'register.codePlaceholder': 'Растау коды',
            'register.sendCode': 'КОД ЖІБЕРУ',
            'register.sending': 'Код жіберіліп жатыр...',
            'register.codeSent': 'Код жіберілді. Email-ды тексеріңіз.',
            'register.devCode': 'Жергілікті тексеру коды: {code}',
            'register.emailRequired': 'Алдымен email енгізіңіз.',
            'register.codeRequired': 'Email-дағы 6 таңбалы кодты енгізіңіз.',
            'register.verifyFailed': 'Код қате немесе мерзімі өтті.',
            'register.creating': 'Код тексеріліп жатыр...',
            'register.submitError': 'Кіру аяқталмады. Қайталап көріңіз.'
        }
    };

    const contentTranslations = {
        'clothing and knowledge': {
            ru: 'одежда и знания',
            kk: 'киім мен білім'
        },
        'to kickstart your journey.': {
            ru: 'чтобы начать твой путь.',
            kk: 'жолыңды бастау үшін.'
        },
        'Stop watching.': {
            ru: 'Хватит смотреть.',
            kk: 'Қарап тұра берме.'
        },
        'Start rolling.': {
            ru: 'Начинай кататься.',
            kk: 'Сырғанауды баста.'
        },
        'Get a board that handles your first fails and fuels your pro gains.': {
            ru: 'Выбери доску, которая выдержит первые падения и поможет расти дальше.',
            kk: 'Алғашқы құлауларға төтеп беріп, өсуіңе көмектесетін тақта таңда.'
        },
        'Go to shop': {
            ru: 'В магазин',
            kk: 'Дүкенге өту'
        },
        'We don\'t need stadiums. We need ledges, rails, and cracked sidewalks. Skate culture was born in the roar of the streets and the scent of burnt polyurethane. Step behind the scenes of an industry that taught the world to see architecture from a different angle.': {
            ru: 'Нам не нужны стадионы. Нам нужны бордюры, перила и потрескавшиеся тротуары. Скейт-культура родилась в шуме улиц и запахе горелого полиуретана. Загляни за кулисы индустрии, которая научила мир смотреть на архитектуру иначе.',
            kk: 'Бізге стадион керек емес. Бізге қырлар, рейлдер және жарылған тротуарлар керек. Скейт мәдениеті көшенің шуында және күйген полиуретан иісінде туды. Әлемді архитектураға басқа қырынан қарауға үйреткен индустрияның ішіне үңіл.'
        },
        'Check the Vibe': {
            ru: 'Поймать вайб',
            kk: 'Вайбты сезіну'
        },
        'From California to our own sidewalks.': {
            ru: 'От Калифорнии до наших тротуаров.',
            kk: 'Калифорниядан өз тротуарларымызға дейін.'
        },
        'June 21st is the day the world drops everything to step on a board. We keep this tradition alive locally, bringing the crew together at the city\'s main ledges and rails. It\'s more than just an event—it\'s proof that skateboarding lives as long as we keep rolling.': {
            ru: '21 июня мир откладывает все дела, чтобы встать на доску. Мы поддерживаем эту традицию здесь, собирая команду у главных городских спотов. Это больше, чем событие: это доказательство, что скейтбординг жив, пока мы продолжаем кататься.',
            kk: '21 маусымда әлем бәрін қойып, тақтаға тұрады. Біз бұл дәстүрді өз қаламызда сақтап, команданы негізгі споттарға жинаймыз. Бұл жай оқиға емес: біз сырғанауды тоқтатпасақ, скейтбординг өмір сүретінінің дәлелі.'
        },
        'Show more': {
            ru: 'Подробнее',
            kk: 'Толығырақ'
        },
        'Shop': {
            ru: 'Магазин',
            kk: 'Дүкен'
        },
        'All': {
            ru: 'Все',
            kk: 'Барлығы'
        },
        'Clothes': {
            ru: 'Одежда',
            kk: 'Киім'
        },
        'Skateboarding': {
            ru: 'Скейтбординг',
            kk: 'Скейтбординг'
        },
        'Accesses': {
            ru: 'Аксессуары',
            kk: 'Аксессуарлар'
        },
        'Brands': {
            ru: 'Бренды',
            kk: 'Брендтер'
        },
        'Add To Cart': {
            ru: 'Добавить',
            kk: 'Қосу'
        },
        'Buy Now': {
            ru: 'Купить',
            kk: 'Сатып алу'
        },
        'Products not found': {
            ru: 'Товары не найдены',
            kk: 'Тауарлар табылмады'
        },
        'SHOP': {
            ru: 'МАГАЗИН',
            kk: 'ДҮКЕН'
        },
        'PRODUCT': {
            ru: 'ТОВАР',
            kk: 'ТАУАР'
        },
        'Color': {
            ru: 'Цвет',
            kk: 'Түс'
        },
        'NO IMAGE': {
            ru: 'НЕТ ФОТО',
            kk: 'ФОТО ЖОҚ'
        },
        'STREET MANUAL': {
            ru: 'STREET МАНУАЛ',
            kk: 'STREET НҰСҚАУЛЫҒЫ'
        },
        'EVERY TRICK STARTS WITH UNDERSTANDING THE MECHANICS. FROM THE GRAIN OF THE MAPLE TO THE HARDNESS OF THE URETHANE — KNOWLEDGE IS THE FOUNDATION OF YOUR STYLE. STUDY THE BLUEPRINT, MASTER THE BASICS, AND OWN THE STREETS.': {
            ru: 'КАЖДЫЙ ТРЮК НАЧИНАЕТСЯ С ПОНИМАНИЯ МЕХАНИКИ. ОТ СЛОЕВ КЛЕНА ДО ЖЕСТКОСТИ УРЕТАНА — ЗНАНИЯ ЭТО ОСНОВА ТВОЕГО СТИЛЯ. ИЗУЧИ СХЕМУ, ОСВОЙ БАЗУ И ЗАБИРАЙ УЛИЦЫ.',
            kk: 'ӘР ТРЮК МЕХАНИКАНЫ ТҮСІНУДЕН БАСТАЛАДЫ. ҮЙЕҢКІ ҚАБАТЫНАН УРЕТАН ҚАТТЫЛЫҒЫНА ДЕЙІН — БІЛІМ СЕНІҢ СТИЛІҢНІҢ НЕГІЗІ. СЫЗБАНЫ ҮЙРЕН, БАЗАНЫ МЕҢГЕР ЖӘНЕ КӨШЕНІ ИЕЛЕН.'
        },
        'PART NAME': {
            ru: 'НАЗВАНИЕ ДЕТАЛИ',
            kk: 'БӨЛШЕК АТАУЫ'
        },
        'Click a point to learn more.': {
            ru: 'Нажми на точку, чтобы узнать больше.',
            kk: 'Көбірек білу үшін нүктені бас.'
        },
        'THE PHYSICS OF OLLIE': {
            ru: 'ФИЗИКА OLLIE',
            kk: 'OLLIE ФИЗИКАСЫ'
        },
        'THE POP': {
            ru: 'ЩЕЛЧОК',
            kk: 'СЕРПІН'
        },
        'The rider snaps the tail down. This creates a powerful impulse against the ground, launching the board upwards.': {
            ru: 'Райдер резко бьет тейлом вниз. Это создает мощный импульс от земли и подбрасывает доску вверх.',
            kk: 'Райдер тейлді төмен ұрады. Осылай жерден күшті импульс пайда болып, тақта жоғары көтеріледі.'
        },
        'THE LEVELING': {
            ru: 'ВЫРАВНИВАНИЕ',
            kk: 'ТЕҢЕСТІРУ'
        },
        'The front foot slides up the griptape, using friction to pull the board level and control the height of the jump.': {
            ru: 'Передняя нога скользит по гриптейпу, за счет трения выравнивает доску и контролирует высоту прыжка.',
            kk: 'Алдыңғы аяқ гриптейппен жоғары сырғып, үйкеліс арқылы тақтаны теңестіріп, секіру биіктігін басқарады.'
        },
        'THE LANDING': {
            ru: 'ПРИЗЕМЛЕНИЕ',
            kk: 'ҚОНУ'
        },
        'Gravity takes over. The rider centers their weight over the bolts to ensure a clean, stable landing without snapping the deck.': {
            ru: 'Дальше работает гравитация. Райдер держит вес над болтами, чтобы приземлиться чисто и не сломать деку.',
            kk: 'Әрі қарай гравитация жұмыс істейді. Райдер салмағын болттардың үстінде ұстап, таза әрі тұрақты қонады.'
        },
        'WATCH VIDEO': {
            ru: 'СМОТРЕТЬ ВИДЕО',
            kk: 'ВИДЕОНЫ КӨРУ'
        },
        'GEAR SETUP GUIDE': {
            ru: 'ГАЙД ПО НАСТРОЙКЕ СЕТАПА',
            kk: 'СЕТАПТЫ БАПТАУ НҰСҚАУЛЫҒЫ'
        },
        'SELECT YOUR RIDING STYLE TO GET TECHNICAL RECOMMENDATIONS': {
            ru: 'ВЫБЕРИ СТИЛЬ КАТАНИЯ, ЧТОБЫ ПОЛУЧИТЬ ТЕХНИЧЕСКИЕ РЕКОМЕНДАЦИИ',
            kk: 'ТЕХНИКАЛЫҚ ҰСЫНЫСТАР АЛУ ҮШІН МІНУ СТИЛІҢДІ ТАҢДА'
        },
        'STREET': {
            ru: 'СТРИТ',
            kk: 'СТРИТ'
        },
        'PARK/BOWL': {
            ru: 'ПАРК/БОУЛ',
            kk: 'ПАРК/БОУЛ'
        },
        'VERT/RAMPS': {
            ru: 'ВЕРТ/РАМПЫ',
            kk: 'ВЕРТ/РАМПА'
        },
        'DECK WIDTH': {
            ru: 'ШИРИНА ДЕКИ',
            kk: 'ДЕКАНЫҢ ЕНІ'
        },
        'WHEEL HARDNESS': {
            ru: 'ЖЕСТКОСТЬ КОЛЕС',
            kk: 'ДӨҢГЕЛЕК ҚАТТЫЛЫҒЫ'
        },
        'TRUCK HEIGHT': {
            ru: 'ВЫСОТА ТРАКОВ',
            kk: 'ТРАК БИІКТІГІ'
        },
        'Smaller boards and harder wheels make technical flip tricks and grinds on rails easier.': {
            ru: 'Меньшие доски и более жесткие колеса упрощают техничные флип-трюки и грайнды на рейлах.',
            kk: 'Кішірек тақталар мен қаттырақ дөңгелектер техникалық флиптер мен рейлдегі грайндтарды жеңілдетеді.'
        },
        '99A — 101A (HARD)': {
            ru: '99A — 101A (ЖЕСТКИЕ)',
            kk: '99A — 101A (ҚАТТЫ)'
        },
        '97A — 99A (MED-HARD)': {
            ru: '97A — 99A (СРЕДНЕ-ЖЕСТКИЕ)',
            kk: '97A — 99A (ОРТАША-ҚАТТЫ)'
        },
        '95A — 97A (SOFT-MED)': {
            ru: '95A — 97A (МЯГКО-СРЕДНИЕ)',
            kk: '95A — 97A (ЖҰМСАҚ-ОРТАША)'
        },
        'Low / Medium': {
            ru: 'Низкие / средние',
            kk: 'Төмен / орташа'
        },
        'Medium': {
            ru: 'Средние',
            kk: 'Орташа'
        },
        'High': {
            ru: 'Высокие',
            kk: 'Жоғары'
        },
        'A versatile setup for transition skating, providing balance between stability and flick-ability.': {
            ru: 'Универсальный сетап для транзишна: баланс между стабильностью и легким щелчком.',
            kk: 'Транзишнге арналған әмбебап сетап: тұрақтылық пен жеңіл фликтің балансы.'
        },
        'Wide decks and larger wheels provide maximum stability and grip at high speeds on big ramps.': {
            ru: 'Широкие деки и большие колеса дают максимум стабильности и сцепления на скорости в больших рампах.',
            kk: 'Кең декалар мен үлкен дөңгелектер үлкен рампаларда жоғары жылдамдықта тұрақтылық пен ілініс береді.'
        },
        'ABOUT SKATEBOARDING': {
            ru: 'О СКЕЙТБОРДИНГЕ',
            kk: 'СКЕЙТБОРДИНГ ТУРАЛЫ'
        },
        'THE FIRST SPARK.': {
            ru: 'ПЕРВАЯ ИСКРА.',
            kk: 'АЛҒАШҚЫ ҰШҚЫН.'
        },
        'STRIPPED TO': {
            ru: 'СВЕДЕННЫЙ',
            kk: 'АРТЫҚТАН'
        },
        'THE CORE': {
            ru: 'К ОСНОВЕ',
            kk: 'ТАЗАРТЫЛҒАН'
        },
        'Jey Adams in 1975': {
            ru: 'Джей Адамс в 1975',
            kk: 'Джей Адамс, 1975'
        },
        'Tony Hawk in 1988': {
            ru: 'Тони Хоук в 1988',
            kk: 'Тони Хоук, 1988'
        },
        'Mark Gonzales in 1987': {
            ru: 'Марк Гонзалес в 1987',
            kk: 'Марк Гонзалес, 1987'
        },
        'Rob Dyrdek in 1992': {
            ru: 'Роб Дирдек в 1992',
            kk: 'Роб Дирдек, 1992'
        },
        'Elissa Steamer in 1997': {
            ru: 'Элисса Стимер в 1997',
            kk: 'Элисса Стимер, 1997'
        },
        'Rodney Mullen in 2016 for Vogue': {
            ru: 'Родни Маллен в 2016 для Vogue',
            kk: 'Родни Маллен, 2016, Vogue'
        },
        'Ryan Sheckler in 2003': {
            ru: 'Райан Шеклер в 2003',
            kk: 'Райан Шеклер, 2003'
        },
        'Bam Margera in 1999': {
            ru: 'Бэм Марджера в 1999',
            kk: 'Бэм Марджера, 1999'
        },
        'WATCH': {
            ru: 'СМОТРЕТЬ',
            kk: 'КӨРУ'
        },
        'DECK': {
            ru: 'ДЕКА',
            kk: 'ДЕКА'
        },
        'The deck is made of 7 layers of pressed maple wood. It\'s the foundation of your setup — width ranges from 7.5" to 8.5" depending on your style.': {
            ru: 'Дека состоит из 7 слоев прессованного клена. Это основа сетапа: ширина обычно от 7.5" до 8.5" в зависимости от стиля.',
            kk: 'Дека 7 қабат сығымдалған үйеңкіден жасалады. Бұл сетаптың негізі: ені стильге қарай 7.5"-тен 8.5"-ке дейін болады.'
        },
        'WHEELS': {
            ru: 'КОЛЕСА',
            kk: 'ДӨҢГЕЛЕКТЕР'
        },
        'Urethane wheels come in different hardness levels (durometer). Softer wheels (78A–87A) absorb rough surfaces, harder wheels (99A+) are faster and better for street tricks.': {
            ru: 'Уретановые колеса бывают разной жесткости. Мягкие (78A–87A) гасят неровности, жесткие (99A+) быстрее и лучше подходят для стрит-трюков.',
            kk: 'Уретан дөңгелектер әртүрлі қаттылықта болады. Жұмсақтары (78A–87A) кедір-бұдырды жұтады, қаттылары (99A+) жылдамырақ және стрит трюктерге ыңғайлы.'
        },
        'TRUCKS': {
            ru: 'ТРАКИ',
            kk: 'ТРАКТАР'
        },
        'Trucks are the metal T-shaped axles mounted under the deck. They control turning and are used for grinding. Tighter trucks = more stability, looser = more turn.': {
            ru: 'Траки — металлические Т-образные оси под декой. Они отвечают за поворот и используются для грайндов. Туже — стабильнее, свободнее — больше поворот.',
            kk: 'Трактар — деканың астындағы Т-тәрізді металл осьтер. Олар бұрылуды басқарады және грайнд үшін қолданылады. Қаттырақ — тұрақтырақ, босырақ — бұрылыс көбірек.'
        },
        'GRIPTAPE': {
            ru: 'ГРИПТЕЙП',
            kk: 'ГРИПТЕЙП'
        },
        'Griptape is the sandpaper-like surface on top of the deck. It keeps your feet locked in place during tricks. Usually black, but comes in all colors and patterns.': {
            ru: 'Гриптейп — шершавая поверхность сверху деки. Он удерживает ноги во время трюков. Обычно черный, но бывает любых цветов и рисунков.',
            kk: 'Гриптейп — деканың үстіндегі зімпараға ұқсас қабат. Ол трюк кезінде аяқты ұстап тұрады. Әдетте қара, бірақ түрлі түсте және өрнекте болады.'
        },
        'BEARINGS': {
            ru: 'ПОДШИПНИКИ',
            kk: 'МОЙЫНТІРЕКТЕР'
        },
        'Bearings sit inside the wheels and allow them to spin. Rated on the ABEC scale — higher ABEC means smoother, faster spin. Clean them regularly to keep speed.': {
            ru: 'Подшипники стоят внутри колес и позволяют им вращаться. Рейтинг ABEC показывает плавность и скорость вращения. Чисти их регулярно, чтобы сохранить скорость.',
            kk: 'Мойынтіректер дөңгелектің ішінде тұрып, оның айналуына мүмкіндік береді. ABEC рейтингі айналудың тегістігі мен жылдамдығын көрсетеді. Жылдамдық сақтау үшін оларды тазалап тұр.'
        },
        'Genre: Coming-of-age': {
            ru: 'Жанр: взросление',
            kk: 'Жанр: есею'
        },
        'Genre: Sci-fi / Adventure': {
            ru: 'Жанр: фантастика / приключения',
            kk: 'Жанр: фантастика / шытырман'
        },
        'Genre: Drama': {
            ru: 'Жанр: драма',
            kk: 'Жанр: драма'
        },
        'Genre: Documentary': {
            ru: 'Жанр: документальный',
            kk: 'Жанр: деректі'
        },
        'Genre: Drama / Psychological': {
            ru: 'Жанр: драма / психологический',
            kk: 'Жанр: драма / психологиялық'
        },
        'Genre: Drama / Coming-of-age': {
            ru: 'Жанр: драма / взросление',
            kk: 'Жанр: драма / есею'
        },
        'Genre: Sports / Action': {
            ru: 'Жанр: спорт / экшен',
            kk: 'Жанр: спорт / экшен'
        },
        'Los Angeles, the 1990s. 13-year-old Stevie is supposed to be thinking about his future...': {
            ru: 'Лос-Анджелес, 1990-е. 13-летний Стиви должен думать о будущем, но вместо этого находит себя в скейтбординге...',
            kk: 'Лос-Анджелес, 1990-жылдар. 13 жастағы Стиви болашағын ойлауы керек еді, бірақ ол өзін скейтбордингтен табады...'
        },
        'An ordinary teenager, a reckless scientist, and a car capable of bending time — one accidental trip to the past turns Marty McFly’s life upside down. Now he has only a few days to fix history before the future disappears completely.': {
            ru: 'Обычный подросток, безумный ученый и машина, умеющая ломать время: случайная поездка в прошлое переворачивает жизнь Марти МакФлая. Теперь у него всего несколько дней, чтобы исправить историю.',
            kk: 'Қарапайым жасөспірім, тәуекелшіл ғалым және уақытты бүге алатын көлік: өткенге кездейсоқ сапар Марти МакФлайдың өмірін өзгертеді. Енді тарихты түзетуге бірнеше-ақ күні бар.'
        },
        'Skateboards, heat, cheap alcohol, and endless wandering through New York streets. For a group of teenagers, adulthood feels far away — until reality suddenly catches up with them faster than they expected.': {
            ru: 'Скейтборды, жара, дешевый алкоголь и бесконечные прогулки по Нью-Йорку. Для группы подростков взрослая жизнь кажется далекой, пока реальность внезапно не догоняет их быстрее, чем ожидалось.',
            kk: 'Скейтбордтар, ыстық, арзан ішімдік және Нью-Йорк көшелерінде шексіз жүру. Бір топ жасөспірімге ересек өмір алыс сияқты, бірақ шындық оларды күтпеген жерден тез қуып жетеді.'
        },
        'Before skateboarding became mainstream, it belonged to loud, reckless kids from the streets of Dogtown. This documentary tells the story of the crew that transformed skating from a hobby into a cultural movement.': {
            ru: 'До того как скейтбординг стал мейнстримом, он принадлежал шумным и отчаянным детям улиц Dogtown. Документальный фильм рассказывает о команде, превратившей катание в культурное движение.',
            kk: 'Скейтбординг мейнстрим болмай тұрып, ол Dogtown көшелеріндегі батыл балаларға тиесілі еді. Бұл деректі фильм катание хоббиден мәдени қозғалысқа айналдырған команданы баяндайды.'
        },
        'A quiet skatepark hidden beneath the city becomes both an escape and a nightmare for teenager Alex. Between drifting thoughts and fragmented memories, he struggles to live with a secret that changed everything overnight.': {
            ru: 'Тихий скейтпарк под городом становится для подростка Алекса и убежищем, и кошмаром. Между обрывками мыслей и воспоминаний он пытается жить с тайной, изменившей все за одну ночь.',
            kk: 'Қаланың астындағы тыныш скейтпарк Алекс үшін әрі қашу орны, әрі қорқынышқа айналады. Үзік ойлар мен естеліктер арасында ол бір түнде бәрін өзгерткен құпиямен өмір сүруге тырысады.'
        },
        'Josh lives like there’s no tomorrow: abandoned pools, stolen moments, sleepless nights, and skateboarding as the only thing holding his world together. A raw portrait of youth balancing somewhere between freedom and collapse.': {
            ru: 'Джош живет так, будто завтра нет: заброшенные бассейны, украденные моменты, бессонные ночи и скейтбординг как единственное, что держит его мир. Честный портрет юности между свободой и крахом.',
            kk: 'Джош ертең жоқтай өмір сүреді: бос бассейндер, ұрланған сәттер, ұйқысыз түндер және әлемін ұстап тұрған жалғыз нәрсе — скейтбординг. Еркіндік пен күйреу арасындағы жастықтың шынайы портреті.'
        },
        'Long before skateboarding filled social media feeds, a small team of outsiders was rewriting its future. Through memories, victories, and personal struggles, the legends of Bones Brigade look back at the era that shaped an entire generation of skaters.': {
            ru: 'Задолго до соцсетей маленькая команда аутсайдеров переписывала будущее скейтбординга. Через воспоминания, победы и личные трудности легенды Bones Brigade оглядываются на эпоху, сформировавшую поколение скейтеров.',
            kk: 'Әлеуметтік желілерге дейін-ақ шағын аутсайдерлер командасы скейтбордингтің болашағын қайта жазды. Bones Brigade аңыздары естеліктер, жеңістер және қиындықтар арқылы бүтін бір буынды қалыптастырған дәуірге қарайды.'
        },
        'Tired of feeling alone, Camille finds herself pulled into an all-girl skate crew where every ride through New York feels like freedom. But growing closer to new people also means learning how fragile friendship and trust can be.': {
            ru: 'Устав от одиночества, Камилла попадает в женскую скейт-команду, где каждая поездка по Нью-Йорку ощущается свободой. Но близость к новым людям учит, насколько хрупкими бывают дружба и доверие.',
            kk: 'Жалғыздықтан шаршаған Камилла қыздардан құралған скейт-командаға қосылады, Нью-Йоркпен әр жүріс еркіндік сияқты сезіледі. Бірақ жаңа адамдарға жақындау достық пен сенімнің нәзіктігін көрсетеді.'
        },
        'Los Angeles, the 1990s. 13-year-old Stevie is supposed to be thinking about his future, but instead, he finds refuge in skateboarding...': {
            ru: 'Лос-Анджелес, 1990-е. 13-летний Стиви должен думать о будущем, но вместо этого находит убежище в скейтбординге...',
            kk: 'Лос-Анджелес, 1990-жылдар. 13 жастағы Стиви болашағын ойлауы керек еді, бірақ ол скейтбордингтен пана табады...'
        },
        'Hidden after dark, the underground races of “S” attract skaters willing to risk everything for adrenaline and respect. For Langa, a newcomer with snowboarding skills and no experience on a skateboard, this world is about to change his life completely.': {
            ru: 'Подпольные гонки "S", скрытые после заката, притягивают скейтеров, готовых рискнуть всем ради адреналина и уважения. Для Ланги, новичка со сноубордическим опытом, этот мир изменит жизнь полностью.',
            kk: 'Күн батқаннан кейін жасырын өтетін "S" жарыстары адреналин мен құрмет үшін бәріне дайын скейтерлерді тартады. Сноуборд тәжірибесі бар, бірақ скейтте жаңа Ланга үшін бұл әлем өмірін өзгертеді.'
        },
        'Derrick spends every free moment skating, chasing a dream that nobody around him takes seriously. Between pressure from family and the harsh reality of competition, he has to decide how much he’s willing to sacrifice for the life he wants.': {
            ru: 'Деррик каждую свободную минуту катается, гонясь за мечтой, которую никто вокруг не воспринимает всерьез. Между давлением семьи и жесткой реальностью соревнований он решает, чем готов пожертвовать ради желанной жизни.',
            kk: 'Деррик бос уақытының бәрін сырғанап өткізеді, айналасындағылар сенбейтін арманға ұмтылады. Отбасы қысымы мен жарыстың қатал шындығы арасында ол қалаған өмірі үшін не құрбан ететінін шешеді.'
        },
        'coming events': {
            ru: 'ближайшие события',
            kk: 'алдағы оқиғалар'
        },
        'archive events': {
            ru: 'архив событий',
            kk: 'оқиғалар мұрағаты'
        },
        'No upcoming events': {
            ru: 'Ближайших событий нет',
            kk: 'Алдағы оқиғалар жоқ'
        },
        'CART': {
            ru: 'КОРЗИНА',
            kk: 'СЕБЕТ'
        },
        'Sign in': {
            ru: 'Войти',
            kk: 'Кіру'
        },
        'Sign in or create an account': {
            ru: 'Войдите или создайте аккаунт',
            kk: 'Кіріңіз немесе аккаунт жасаңыз'
        },
        'Continue': {
            ru: 'Продолжить',
            kk: 'Жалғастыру'
        },
        'Email me with news and offers': {
            ru: 'Присылать новости и предложения',
            kk: 'Жаңалықтар мен ұсыныстар жіберу'
        },
        'Profile': {
            ru: 'Профиль',
            kk: 'Профиль'
        },
        'Orders': {
            ru: 'Заказы',
            kk: 'Тапсырыстар'
        },
        'Edit profile': {
            ru: 'Редактировать профиль',
            kk: 'Профильді өңдеу'
        },
        'Add address': {
            ru: 'Добавить адрес',
            kk: 'Мекенжай қосу'
        },
        'Logout': {
            ru: 'Выйти',
            kk: 'Шығу'
        },
        'No addresses yet': {
            ru: 'Адресов пока нет',
            kk: 'Әзірге мекенжай жоқ'
        },
        'Save': {
            ru: 'Сохранить',
            kk: 'Сақтау'
        },
        'Cancel': {
            ru: 'Отмена',
            kk: 'Болдырмау'
        },
        'First name': {
            ru: 'Имя',
            kk: 'Аты'
        },
        'Last name': {
            ru: 'Фамилия',
            kk: 'Тегі'
        },
        'Email': {
            ru: 'Email',
            kk: 'Email'
        },
        'Address': {
            ru: 'Адрес',
            kk: 'Мекенжай'
        },
        'Sign me up with news and offers': {
            ru: 'Подписать меня на новости и предложения',
            kk: 'Мені жаңалықтар мен ұсыныстарға жазу'
        },
        'No orders yet': {
            ru: 'Заказов пока нет',
            kk: 'Әзірге тапсырыс жоқ'
        },
        'Go to the store and place an order.': {
            ru: 'Перейдите в магазин и оформите заказ.',
            kk: 'Дүкенге өтіп, тапсырыс беріңіз.'
        },
        'SIZE:': {
            ru: 'РАЗМЕР:',
            kk: 'ӨЛШЕМ:'
        },
        'Size:': {
            ru: 'Размер:',
            kk: 'Өлшем:'
        },
        'Quantity:': {
            ru: 'Количество:',
            kk: 'Саны:'
        },
        'Order #': {
            ru: 'Заказ #',
            kk: 'Тапсырыс #'
        }
    };

    const selectorTranslations = [
        {
            selector: '.skate-section .card-title',
            html: {
                en: 'THE <span class="highlight">GENESIS</span> OF CHAOS',
                ru: '<span class="highlight">ЗАРОЖДЕНИЕ</span> ХАОСА',
                kk: 'ХАОСТЫҢ <span class="highlight">БАСТАУЫ</span>'
            }
        },
        {
            selector: '.skate-section .card-text',
            text: {
                en: 'To know where we’re rolling, we have to remember where it all began. Skateboarding wasn’t born in pristine Californian parks — it broke out of garages and the bruises of those who saw pavement not just as a road, but as a challenge. It all started with the first spark, when a standard trainer fell into the hands of those who refused to play by the rules.',
                ru: 'Чтобы понять, куда мы катимся, нужно вспомнить, с чего все началось. Скейтбординг родился не в идеальных калифорнийских парках — он вырвался из гаражей и синяков тех, кто видел в асфальте не просто дорогу, а вызов. Все началось с первой искры, когда обычная тренировочная платформа попала в руки тех, кто отказался играть по правилам.',
                kk: 'Қайда бара жатқанымызды түсіну үшін бәрі неден басталғанын есте сақтау керек. Скейтбординг мінсіз Калифорния парктерінде туған жоқ — ол асфальтты жай жол емес, сынақ деп көргендердің гараждары мен жарақаттарынан шықты. Бәрі ережемен ойнаудан бас тартқан адамдардың қолына қарапайым жаттығу платформасы түскен сәттен басталды.'
            }
        },
        {
            selector: '.history-text',
            text: {
                en: 'The forefather of the board was the "skeeler" — a metal three-wheeled platform meant for land-skiing with poles. The real magic happened when kids ditched the poles and one of the rollers to ride a single platform instead. This moment of creative chaos became the true zero point of skateboarding history.',
                ru: 'Предком доски был "skeeler" — металлическая трехколесная платформа для сухопутных лыж с палками. Настоящая магия случилась, когда дети отбросили палки и один из роликов, чтобы кататься на одной платформе. Этот момент творческого хаоса стал настоящей нулевой точкой истории скейтбординга.',
                kk: 'Тақтаның арғы атасы "skeeler" болды — таяқпен құрлықта сырғанауға арналған үш дөңгелекті металл платформа. Нағыз магия балалар таяқтарды және бір роликті алып тастап, бір платформада сырғанағанда басталды. Осы шығармашылық хаос сәті скейтбординг тарихының нөлдік нүктесіне айналды.'
            }
        },
        {
            selector: '.core-text',
            html: {
                en: 'The <strong class="highlight-year">1930s</strong> Skooter Skate was an engineering attempt to tame speed with handlebars and an aluminum deck. However, the revolution moved from workshops to backyards as kids began stripping away everything unnecessary. The modern skateboard is essentially a scooter, freed from everything that stood in its way.',
                ru: '<strong class="highlight-year">1930-е</strong> Skooter Skate были инженерной попыткой приручить скорость с помощью руля и алюминиевой деки. Но революция ушла из мастерских во дворы, когда дети начали убирать все лишнее. Современный скейтборд — это по сути самокат, освобожденный от всего, что мешало.',
                kk: '<strong class="highlight-year">1930-жылдардағы</strong> Skooter Skate руль мен алюминий дека арқылы жылдамдықты бағындыруға тырысқан инженерлік шешім еді. Бірақ төңкеріс шеберханадан аулаға көшті: балалар артықтың бәрін алып тастай бастады. Қазіргі скейтборд — жолындағының бәрінен босатылған самокаттың мәні.'
            }
        },
        {
            selector: '.timeline-row:nth-of-type(1) .timeline-text',
            text: {
                en: 'While brands launched mass production, street culture thrived on DIY decks. The ultimate catalyst was the calm on the coast; surfers took to the pavement to "surf the concrete" when the waves were flat. This era linked the two elements forever, giving skateboarding its modern form and global recognition.',
                ru: 'Пока бренды запускали массовое производство, уличная культура росла на самодельных деках. Главным толчком стал штиль на побережье: серферы выходили на асфальт, чтобы "серфить бетон", когда волн не было. Эта эпоха навсегда связала две стихии и дала скейтбордингу современную форму.',
                kk: 'Брендтер жаппай өндірісті бастағанда, көше мәдениеті қолдан жасалған декаларда дамыды. Негізгі түрткі жағалаудағы тыныштық болды: толқын жоқ кезде серферлер асфальтқа шығып, "бетонды серфинг" жасады. Бұл дәуір екі әлемді мәңгі байланыстырды.'
            }
        },
        {
            selector: '.timeline-row:nth-of-type(2) .timeline-text',
            text: {
                en: 'In 1962, kicktails arrived in Hollywood, and by 1965, the craze peaked with 50 million decks sold and the opening of Surf City, the first skatepark. But the triumph was short-lived. Low-quality clay and steel wheels led to injuries and city bans. By 1966, the market collapsed, and skateboarding retreated into the underground.',
                ru: 'В 1962 году киктейлы появились в Голливуде, а к 1965 году бум достиг пика: 50 миллионов проданных дек и открытие Surf City, первого скейтпарка. Но триумф был недолгим. Плохие глиняные и стальные колеса приводили к травмам и городским запретам. К 1966 рынок рухнул, и скейтбординг ушел в андеграунд.',
                kk: '1962 жылы Голливудта киктейлдер пайда болды, ал 1965 жылға қарай қызығушылық шыңына жетті: 50 миллион дека сатылып, алғашқы скейтпарк Surf City ашылды. Бірақ жеңіс ұзаққа созылмады. Сапасыз саз және болат дөңгелектер жарақат пен қала тыйымдарына әкелді. 1966 жылы нарық құлап, скейтбординг андеграундқа кетті.'
            }
        },
        {
            selector: '.present-content .step-1',
            text: {
                en: 'URETHANE WHEELS CHANGED EVERYTHING, PROVIDING GRIP AND SPEED. DURING THE CALIFORNIA DROUGHT, THE Z-BOYS DIVED INTO EMPTY POOLS, INVENTING VERT SKATING. BY',
                ru: 'УРЕТАНОВЫЕ КОЛЕСА ИЗМЕНИЛИ ВСЕ, ДАВ СЦЕПЛЕНИЕ И СКОРОСТЬ. ВО ВРЕМЯ КАЛИФОРНИЙСКОЙ ЗАСУХИ Z-BOYS НЫРЯЛИ В ПУСТЫЕ БАССЕЙНЫ И ИЗОБРЕТАЛИ ВЕРТ-СКЕЙТИНГ. К',
                kk: 'УРЕТАН ДӨҢГЕЛЕКТЕР БӘРІН ӨЗГЕРТІП, ІЛІНІС ПЕН ЖЫЛДАМДЫҚ БЕРДІ. КАЛИФОРНИЯДАҒЫ ҚҰРҒАҚШЫЛЫҚ КЕЗІНДЕ Z-BOYS БОС БАССЕЙНДЕРГЕ ТҮСІП, ВЕРТ СКЕЙТИНГТІ ОЙЛАП ТАПТЫ. АЛ'
            }
        },
        {
            selector: '.present-content .step-2',
            text: {
                en: 'THE 80S, TONY HAWK AND VHS TAPES TOOK THE SPORT GLOBAL, EVOLVING THE BOARD INTO THE MODERN DOUBLE-KICK DESIGN. SKATING HIT THE PAVEMENT, TURNING LEDGES AND',
                ru: '80-М ГОДАМ ТОНИ ХОУК И VHS-КАССЕТЫ ВЫВЕЛИ СПОРТ НА МИРОВОЙ УРОВЕНЬ, А ДОСКА ПРЕВРАТИЛАСЬ В СОВРЕМЕННЫЙ DOUBLE-KICK. СКЕЙТИНГ ВЫШЕЛ НА АСФАЛЬТ, ПРЕВРАЩАЯ БОРДЮРЫ И',
                kk: '80-ЖЫЛДАРДА ТОНИ ХОУК ПЕН VHS ТАСПАЛАРЫ СПОРТТЫ ӘЛЕМГЕ ШЫҒАРДЫ, АЛ ТАҚТА ҚАЗІРГІ DOUBLE-KICK ДИЗАЙНЫНА АЙНАЛДЫ. СКЕЙТИНГ АСФАЛЬТҚА ШЫҒЫП, ҚЫРЛАР МЕН'
            }
        },
        {
            selector: '.present-content .step-3',
            text: {
                en: 'RAILS INTO A CANVAS. FROM BACKYARD POOLS TO THE OLYMPIC GAMES, IT IS NOW A TECH-DRIVEN GLOBAL ART FORM. YET, THE CORE REMAINS: YOU, THE BOARD, AND THE SOUND OF WHEELS HITTING THE CONCRETE.',
                ru: 'РЕЙЛЫ В ХОЛСТ. ОТ БАССЕЙНОВ НА ЗАДНЕМ ДВОРЕ ДО ОЛИМПИЙСКИХ ИГР — ТЕПЕРЬ ЭТО ТЕХНИЧНАЯ ГЛОБАЛЬНАЯ ФОРМА ИСКУССТВА. НО СУТЬ ОСТАЕТСЯ: ТЫ, ДОСКА И ЗВУК КОЛЕС ПО БЕТОНУ.',
                kk: 'РЕЙЛДЕРДІ КЕНЕПКЕ АЙНАЛДЫРДЫ. АУЛАДАҒЫ БАССЕЙНДЕРДЕН ОЛИМПИАДА ОЙЫНДАРЫНА ДЕЙІН — БҰЛ ҚАЗІР ТЕХНИКАЛЫҚ ҒАЛАМДЫҚ ӨНЕР. БІРАҚ НЕГІЗІ ӨЗГЕРМЕЙДІ: СЕН, ТАҚТА ЖӘНЕ БЕТОНҒА ТИГЕН ДӨҢГЕЛЕК ДЫБЫСЫ.'
            }
        }
    ];

    let currentCurrency = localStorage.getItem(STORAGE_CURRENCY) || 'USD';
    let currentLanguage = localStorage.getItem(STORAGE_LANGUAGE) || 'en';
    let rates = Object.fromEntries(Object.entries(currencies).map(([code, data]) => [code, data.rate]));

    Object.assign(translations.en, {
        'cart.back': '← BACK',
        'events.coming': 'coming events',
        'events.archive': 'archive events',
        'events.empty': 'No upcoming events'
    });

    Object.assign(translations.ru, {
        'cart.back': '← НАЗАД',
        'events.coming': 'ближайшие события',
        'events.archive': 'архив событий',
        'events.empty': 'Ближайших событий нет'
    });

    Object.assign(translations.kk, {
        'cart.back': '← АРТҚА',
        'events.coming': 'алдағы оқиғалар',
        'events.archive': 'оқиғалар мұрағаты',
        'events.empty': 'Алдағы оқиғалар жоқ'
    });

    const eventTranslations = {
        '/images/17.05.jpg': {
            en: {
                title: 'Group Skate',
                description: 'Micro-ramp session for beginners and riders who already love skating.',
                details: `If you have never skated a ramp before, this is the perfect time to try. We will help and support you.
If you already skate, we will work on tricks and simply have a good session together.
Come alone or with friends.
GIRLS ONLY.`,
                location: 'Skatepark at Zhambyl and Vesnovka'
            },
            kk: {
                title: 'Group Skate',
                description: 'Жаңадан бастаушыларға және скейтті жақсы көретіндерге арналған микро-рампадағы сессия.',
                details: `Егер рампада ешқашан теппеген болсаңыз, қазір байқап көруге ең жақсы уақыт. Біз көмектесіп, қолдаймыз.
Егер бұрыннан тебетін болсаңыз, трюктермен жұмыс істеп, бірге жақсы уақыт өткіземіз.
Жалғыз немесе құрбыларыңызбен келіңіз.
ТЕК ҚЫЗДАР.`,
                location: 'Жамбыл мен Весновка қиылысындағы скейтпарк'
            }
        },
        '/images/02.05.jpg': {
            en: {
                title: 'Gossip Session',
                description: 'Mini-ramp session for beginners and riders who already love skating.',
                details: `If you are just starting out, do not worry: we will help, support, and teach you.
If you already skate, it is a great reason to meet up and ride together.
Come alone or with friends.`,
                location: 'Skatepark at Zhambyl and Vesnovka'
            },
            kk: {
                title: 'Gossip Session',
                description: 'Жаңадан бастаушыларға және скейтті жақсы көретіндерге арналған мини-рампа сессиясы.',
                details: `Егер енді бастап жүрсеңіз, уайымдамаңыз: көмектесеміз, қолдаймыз және үйретеміз.
Егер бұрыннан тебетін болсаңыз, кездесіп, бірге тебуге жақсы себеп.
Жалғыз немесе құрбыларыңызбен келіңіз.`,
                location: 'Жамбыл мен Весновкадағы скейтпарк'
            }
        },
        '/images/28.03.jpg': {
            en: {
                title: 'Ice Ledge Challenge',
                description: 'Winter is behind us - we are opening the season with a Wallride and Red Bull contest.',
                details: `Winter is behind us - we are opening the season with a Wallride and Red Bull contest.

Program:
- Cash for tricks
- Contest on a secret obstacle
- Prizes from Wallride

The obstacle will be available only on the day of the contest.`,
                location: 'Caspian University, Dostyk 85a'
            },
            kk: {
                title: 'Ice Ledge Challenge',
                description: 'Қыс артта қалды - маусымды Wallride және Red Bull контесімен ашамыз.',
                details: `Қыс артта қалды - маусымды Wallride және Red Bull контесімен ашамыз.

Бағдарлама:
- Cash for tricks
- Құпия фигурадағы контест
- Wallride сыйлықтары

Фигура тек контест күні қолжетімді болады.`,
                location: 'Каспий университеті, Достық 85а'
            }
        },
        '/images/21.03.jpg': {
            en: {
                title: 'Girls Only Season Opening',
                description: 'We are gathering on the micro-ramp to open the season together.',
                details: `This Saturday we are meeting on the micro-ramp to open the season together.

If you have never skated before, this is the perfect moment to try: we will show the basics and support you.
If you already skate, we will help with tricks and simply have a good session.

Almaty
Saturday, 21.03
12:00 - 16:00
Zhambyl x Vesnovka skatepark

Come skate, meet people, and feel like you belong.`,
                location: 'Zhambyl x Vesnovka skatepark'
            },
            kk: {
                title: 'Girls Only маусым ашылуы',
                description: 'Маусымды бірге ашу үшін микро-рампада жиналамыз.',
                details: `Осы сенбіде маусымды бірге ашу үшін микро-рампада жиналамыз.

Егер ешқашан теппеген болсаңыз, бұл байқап көруге ең ыңғайлы сәт: базаны көрсетіп, қолдаймыз.
Егер бұрыннан тебетін болсаңыз, трюктерге көмектесіп, жақсы уақыт өткіземіз.

Алматы
Сенбі, 21.03
12:00 - 16:00
Жамбыл x Весновка скейтпаркі

Тебуге, танысуға және өз орныңызда екеніңізді сезінуге келіңіз.`,
                location: 'Жамбыл x Весновка скейтпаркі'
            }
        },
        '/images/1.11.jpg': {
            en: {
                title: 'Halloween Contest by Skateboarding Girls Club x Mati Company',
                description: 'Come skate, laugh, and win prizes.',
                details: `Program:
Best Trick Contest
Hippie Jump Contest
Gladiator Challenge
Best Costume Contest

Main rule:
you can participate only in a costume.
No costume - no tricks and no sweets.

Prizes:
- Skateboarding Girls Club deck
- certificates from Mati.co
- limited SGC shopper`,
                location: 'Baisa Spot, Almaty, Baiseitova 40/1'
            },
            kk: {
                title: 'Skateboarding Girls Club x Mati Company Хэллоуин контесті',
                description: 'Тебуге, күлуге және сыйлық алуға келіңіз.',
                details: `Бағдарлама:
Best Trick Contest
Hippie Jump Contest
Gladiator Challenge
Best Costume Contest

Негізгі ереже:
тек костюммен қатысуға болады.
Костюмсіз - трюк те, тәтті де жоқ.

Сыйлықтар:
- Skateboarding Girls Club декасы
- Mati.co сертификаттары
- SGC лимиттелген шоппері`,
                location: 'Байса споты, Алматы, Байсейітова 40/1'
            }
        },
        '/images/27.09.jpg': {
            en: {
                title: 'Wallride x activ: Cash for Tricks and Best Trick Contest',
                description: 'At the end of summer we teamed up with activ, a mobile operator that supports street culture and progressive ideas.',
                details: `This season is all about bright collaborations. At the end of summer we teamed up with activ, a mobile operator that supports street culture and progressive ideas. activ is always close to its audience, and now to us too.

Save the date: September 27, 15:00, Caspian University, opposite Hotel Kazakhstan.

Together with @rare.spot.co we designed an obstacle for:

- Best trick
Land your best tricks and get prizes from @wallrideskate.co.

- Cash For Tricks
Land tricks and get paid.

activ is also launching the strong "Imba" tariff for people who are always online and want to stay connected with friends.`,
                location: 'Caspian University, opposite Hotel Kazakhstan'
            },
            kk: {
                title: 'Wallride x activ: Cash for Tricks және Best Trick Contest',
                description: 'Жаздың соңында көше мәдениетін және прогрессив идеяларды қолдайтын activ мобильді операторымен біріктік.',
                details: `Бұл маусым жарқын коллаборацияларға толы. Жаздың соңында көше мәдениетін және прогрессив идеяларды қолдайтын activ мобильді операторымен біріктік. activ әрдайым өз аудиториясына жақын, енді бізге де жақын.

Күнді сақтап қойыңыз: 27 қыркүйек, 15:00, Каспий университеті, "Қазақстан" қонақүйінің қарсысы.

@rare.spot.co командасымен бірге келесі форматтарға арналған фигура жасадық:

- Best trick
Ең мықты трюгіңді жасап, @wallrideskate.co сыйлықтарын ал.

- Cash For Tricks
Трюк жаса - ақша ал.

activ достармен байланыста болып, әрдайым онлайн жүретіндерге арналған "Имба" тарифін де шығарады.`,
                location: 'Каспий университеті, "Қазақстан" қонақүйінің қарсысы'
            }
        },
        '/images/30.08.jpg': {
            en: {
                title: 'Wallride x BigPlay: Cash for Tricks and Jam Session',
                description: 'A format where skaters ride in groups of three around the skatepark and show their best line.',
                details: `We collaborated with BigPlay, an organization that promotes mobile esports. We found a lot in common and decided to make a joint contest.

Save the date: August 30, 12:00, Gorilla Golden Square skatepark.

Program:

- Jam session in the skatepark.
Skaters ride in groups of three around the park and show their best line.

Prizes:
1st place: complete
2nd place: deck
3rd place: bearings, cap, and T-shirt`,
                location: 'Gorilla Golden Square skatepark'
            },
            kk: {
                title: 'Wallride x BigPlay: Cash for Tricks және Jam Session',
                description: 'Скейттер скейтпарк ішінде үш-үштен теуіп, ең жақсы лайнын көрсететін формат.',
                details: `Мобильді киберспортты дамытатын BigPlay ұйымымен коллаборация жасадық. Ортақ нәрсе көп екенін байқап, бірге контест өткізуді шештік.

Күнді сақтап қойыңыз: 30 тамыз, 12:00, Gorilla Golden Square скейтпаркі.

Бағдарлама:

- Скейтпарктегі jam session.
Скейттер үш-үштен теуіп, ең жақсы лайнын көрсетеді.

Сыйлықтар:
1 орын: комплит
2 орын: дека
3 орын: подшипниктер, кепка және футболка`,
                location: 'Gorilla Golden Square скейтпаркі'
            }
        },
        '/images/21.06.jpg': {
            en: {
                title: 'Wallride x Red Bull GSD 2025',
                description: 'On June 21, Go Skateboarding Day, we celebrate with our friends from Red Bull Kazakhstan.',
                details: `This year the event format is inspired by American college parties:

- We built a quarter pipe with a basketball hoop. Make a dunk and get paid.
- Road The Gap: jump from one kicker to another. The longest ollie wins.

American 2000s pop-punk will be playing, and cheerleaders will support every trick.

Dress code:
Wear basketball jerseys, college jackets, and let's go.`,
                location: 'Abay 85a, opposite Hotel Kazakhstan'
            },
            kk: {
                title: 'Wallride x Red Bull GSD 2025',
                description: '21 маусымда Go Skateboarding Day күнін Red Bull Kazakhstan достарымызбен бірге атап өтеміз.',
                details: `Биылғы формат америкалық колледж кештері стилінде өтеді:

- Баскетбол сақинасы бар quarter pipe жасадық. Данк жасасаң - ақша аласың.
- Road The Gap: бір кикерден екіншісіне секір. Ең ұзын ollie жеңеді.

Осы кезде 2000-жылдардағы америкалық поп-панк ойнайды, ал чирлидерлер әр трюкте қолдайды.

Дресс-код:
Баскетбол джерсиін, колледж жакетін киіп келіңіз және let's go.`,
                location: 'Абай 85а, "Қазақстан" қонақүйінің қарсысы'
            }
        }
    };

    const policyDocuments = {
        privacy: {
            title: 'Политика конфиденциальности',
            body: `
                <p><strong>Дата последнего обновления:</strong> 18 мая 2026 года</p>
                <p>Мы в скейтшопе <strong>«Стрит 19»</strong> уважаем ваше право на конфиденциальность и ценим ваше доверие. В этой Политике объясняется, какую информацию мы собираем, как используем, защищаем и передаем, когда вы посещаете сайт и совершаете покупки.</p>
                <h3>1. Какую информацию мы собираем?</h3>
                <p>Мы собираем личные данные, которые вы предоставляете сами, и технические данные, которые помогают сайту работать корректно.</p>
                <ul>
                    <li><strong>При оформлении заказа:</strong> ФИО, адрес доставки, номер телефона, e-mail.</li>
                    <li><strong>При регистрации:</strong> данные аккаунта и история заказов.</li>
                    <li><strong>При обращении в поддержку:</strong> имя, контакты и текст сообщения.</li>
                    <li><strong>Автоматически:</strong> IP-адрес, тип браузера, время доступа, действия на сайте и cookie для корзины и авторизации.</li>
                </ul>
                <h3>2. Как мы используем ваши данные?</h3>
                <ul>
                    <li>Обрабатываем, собираем и отправляем заказы.</li>
                    <li>Информируем о статусе заказа по e-mail, SMS или через мессенджеры.</li>
                    <li>Оказываем клиентскую поддержку.</li>
                    <li>Улучшаем работу сайта, ассортимент и сервис.</li>
                    <li>С вашего согласия отправляем новости, акции, скидки и информацию о новых дропах.</li>
                </ul>
                <h3>3. Передача данных третьим лицам</h3>
                <p>Мы не продаем ваши личные данные. Часть информации может передаваться надежным партнерам только для выполнения заказа:</p>
                <ol>
                    <li>службам доставки и курьерам;</li>
                    <li>платежным шлюзам и банкам для безопасной оплаты;</li>
                    <li>сервисам аналитики для обезличенного анализа работы сайта.</li>
                </ol>
                <p>Магазин «Стрит 19» не хранит данные банковских карт.</p>
                <h3>4. Защита данных</h3>
                <p>Мы принимаем технические и организационные меры для защиты информации от несанкционированного доступа, изменения или удаления.</p>
                <h3>5. Cookie</h3>
                <p>Cookie помогают сайту помнить товары в корзине и поддерживать авторизацию. Вы можете отключить cookie в браузере, но часть функций сайта может работать некорректно.</p>
                <h3>6. Ваши права</h3>
                <ul>
                    <li>Узнать, какие данные о вас хранятся.</li>
                    <li>Попросить исправить персональные данные.</li>
                    <li>Отозвать согласие на обработку данных или удалить аккаунт.</li>
                    <li>Отписаться от маркетинговых рассылок.</li>
                </ul>
                <h3>7. Изменения политики</h3>
                <p>Мы можем обновлять эту Политику. Изменения вступают в силу после публикации на сайте.</p>
                <h3>8. Контакты</h3>
                <p>По вопросам обработки данных свяжитесь с командой «Стрит 19» в Telegram: <a href="https://t.me/bmnknz" target="_blank" rel="noopener noreferrer">@bmnknz</a>.</p>
            `
        },
        refund: {
            title: 'Правила возврата товара и денежных средств',
            body: `
                <p><strong>Дата последнего обновления:</strong> 18 мая 2026 года</p>
                <p>Мы в <strong>«Стрит 19»</strong> хотим, чтобы вы были довольны покупками. Если товар не подошел по размеру, цвету или пришел с браком, вы можете вернуть или обменять его по правилам ниже.</p>
                <h3>1. Сроки возврата</h3>
                <ul>
                    <li>Товар надлежащего качества можно вернуть в течение <strong>14 дней</strong> с момента получения.</li>
                    <li>Товар ненадлежащего качества можно вернуть в течение гарантийного срока или в сроки, предусмотренные законом.</li>
                </ul>
                <h3>2. Условия возврата товара надлежащего качества</h3>
                <ul>
                    <li>Товар не был в употреблении: на кедах нет следов ходьбы или катания, на деке нет царапин, наждак не наклеен, подшипники не вскрывались.</li>
                    <li>Сохранены товарный вид, упаковка, бирки, этикетки и защитные пленки.</li>
                    <li>Есть документ, подтверждающий покупку: чек, электронный чек, номер заказа или подтверждение.</li>
                </ul>
                <p><strong>Важно для скейтеров:</strong> если вы собрали комплит, прикрутили подвески к деке или наклеили гриптейп, товар считается бывшим в употреблении и не возвращается по причине «не понравился цвет/форма».</p>
                <h3>3. Как оформить возврат?</h3>
                <ol>
                    <li>Напишите нам в Telegram <a href="https://t.me/bmnknz" target="_blank" rel="noopener noreferrer">@bmnknz</a> с темой «Возврат по заказу №...» и укажите причину.</li>
                    <li>Менеджер свяжется с вами и отправит инструкции.</li>
                    <li>Передайте товар в офлайн-точку, если она доступна, или отправьте доставкой по инструкции менеджера.</li>
                </ol>
                <p>Если возврат происходит по вашей инициативе, стоимость обратной доставки оплачиваете вы. Если пришел брак или перепутан товар, доставку оплачиваем мы.</p>
                <h3>4. Возврат денежных средств</h3>
                <p>После получения товара мы проверим его состояние в течение 1-3 рабочих дней. Деньги возвращаются тем же способом, которым была оплачена покупка. Срок зачисления зависит от банка и обычно занимает 3-10 рабочих дней.</p>
                <h3>5. Обмен товара</h3>
                <p>Если нужен другой размер кед, одежды или другая ширина деки, оформите возврат неподошедшего товара и сделайте новый заказ на сайте.</p>
                <h3>6. Если обнаружен брак</h3>
                <ul>
                    <li>Сделайте четкие фото или видео дефекта.</li>
                    <li>Пришлите материалы нам в Telegram с описанием проблемы.</li>
                    <li>Мы предложим замену, скидку или возврат денег, включая доставку.</li>
                </ul>
                <p>Поломка деки во время жесткого приземления на трюке заводским браком не является.</p>
                <h3>7. Контакты по возвратам</h3>
                <p>Telegram поддержки: <a href="https://t.me/bmnknz" target="_blank" rel="noopener noreferrer">@bmnknz</a>.</p>
            `
        },
        shipping: {
            title: 'Условия доставки',
            body: `
                <p><strong>Дата последнего обновления:</strong> 18 мая 2026 года</p>
                <p>Мы в <strong>«Стрит 19»</strong> делаем все, чтобы новые деки, кеды и комплиты доехали быстро и в хорошем состоянии. Заказы упаковываются в плотный картон, чтобы защитить тейл, ноуз и графику при транспортировке.</p>
                <h3>1. География и способы доставки</h3>
                <p>Мы доставляем заказы по Казахстану и другим доступным регионам следующими способами:</p>
                <ul>
                    <li>курьерская доставка до двери;</li>
                    <li>доставка в пункты выдачи заказов;</li>
                    <li>самовывоз, если офлайн-точка доступна для вашего заказа.</li>
                </ul>
                <h3>2. Стоимость доставки</h3>
                <ul>
                    <li><strong>Самовывоз:</strong> бесплатно.</li>
                    <li><strong>ПВЗ:</strong> стоимость зависит от города и рассчитывается при оформлении заказа.</li>
                    <li><strong>Курьерская доставка:</strong> стоимость зависит от города и службы доставки.</li>
                    <li><strong>Бесплатная доставка:</strong> может действовать для отдельных акций и заказов от установленной суммы.</li>
                </ul>
                <h3>3. Сроки обработки и доставки</h3>
                <ul>
                    <li>Обработка заказа занимает 1-2 рабочих дня после подтверждения оплаты.</li>
                    <li>Если вы заказали сборку комплита, это может занять дополнительно до 1 дня.</li>
                    <li>Доставка по городу обычно занимает 1-3 рабочих дня.</li>
                    <li>Доставка в другие регионы обычно занимает 3-10 рабочих дней.</li>
                </ul>
                <p>После отправки заказа вы получите трек-номер на e-mail, в SMS или в мессенджере.</p>
                <h3>4. Важная информация при получении</h3>
                <ol>
                    <li>Проверьте коробку на сильные вмятины или пробития.</li>
                    <li>Если товар поврежден, сделайте фото/видео и составьте акт со службой доставки.</li>
                    <li>Напишите нам, и мы поможем решить проблему.</li>
                </ol>
                <h3>5. Непредвиденные задержки</h3>
                <p>Сроки доставки могут увеличиваться из-за праздников, нагрузки служб доставки или погодных условий. Если посылка задерживается, свяжитесь с нами.</p>
                <h3>6. Контакты по доставке</h3>
                <p>Telegram: <a href="https://t.me/bmnknz" target="_blank" rel="noopener noreferrer">@bmnknz</a>.</p>
            `
        },
        terms: {
            title: 'Пользовательское соглашение',
            body: `
                <p><strong>Дата последнего обновления:</strong> 18 мая 2026 года</p>
                <p>Добро пожаловать в скейтшоп <strong>«Стрит 19»</strong>. Настоящее Пользовательское соглашение регулирует правила использования сайта и условия покупки товаров в интернет-магазине.</p>
                <p>Используя сайт, регистрируясь или оформляя заказ, вы соглашаетесь с условиями этого Соглашения.</p>
                <h3>1. Общие положения</h3>
                <p>Настоящее Соглашение является публичной офертой. Оплата товара на сайте считается принятием условий оферты. Администрация сайта может изменять условия Соглашения, а обновленная версия вступает в силу после публикации.</p>
                <h3>2. Регистрация и личный кабинет</h3>
                <ul>
                    <li>Регистрация не обязательна для оформления заказа, но открывает доступ к истории покупок.</li>
                    <li>Пользователь обязуется указывать достоверные данные при регистрации и оформлении заказа.</li>
                    <li>Пользователь отвечает за сохранность пароля и действия под своим аккаунтом.</li>
                </ul>
                <h3>3. Оформление заказа и цены</h3>
                <ul>
                    <li>Цены на товары указаны на сайте и могут изменяться до момента оплаты заказа.</li>
                    <li>Характеристики и внешний вид товара могут немного отличаться от фото из-за особенностей материалов и отображения цвета.</li>
                    <li>Заказ считается принятым после подтверждения менеджером или системой магазина.</li>
                </ul>
                <h3>4. Оплата и доставка</h3>
                <p>Оплата осуществляется способами, доступными на сайте. Доставка выполняется сторонними курьерскими службами или иными доступными способами. Сроки и стоимость регулируются Условиями доставки.</p>
                <h3>5. Возврат товара и гарантии</h3>
                <p>Правила возврата описаны в Политике возврата. Скейтбординг связан с повышенными нагрузками на оборудование, поэтому естественный износ, поломка деки при жестком приземлении, царапины, повреждения наждака и стирание колес не считаются заводским браком.</p>
                <h3>6. Ограничение ответственности</h3>
                <p>«Стрит 19» старается поддерживать стабильную работу сайта, но не отвечает за временные технические сбои, перебои хостинга или задержки платежных систем. Магазин не несет ответственности за травмы, полученные при использовании скейт-оборудования.</p>
                <h3>7. Конфиденциальность</h3>
                <p>Персональные данные обрабатываются в соответствии с Политикой конфиденциальности.</p>
                <h3>8. Разрешение споров</h3>
                <p>Споры решаются путем переговоров через службу поддержки. Если договориться не удалось, спор рассматривается по действующему законодательству Республики Казахстан.</p>
                <h3>9. Контакты</h3>
                <p><strong>Название магазина:</strong> Скейтшоп «Стрит 19»</p>
                <p><strong>Telegram:</strong> <a href="https://t.me/bmnknz" target="_blank" rel="noopener noreferrer">@bmnknz</a></p>
            `
        }
    };

    const translatedPolicyDocuments = {
        en: {
            privacy: {
                title: 'Privacy Policy',
                body: `
                    <p><strong>Last updated:</strong> May 18, 2026</p>
                    <p>At <strong>Street 19</strong>, we respect your privacy and explain here what data we collect, how we use it, and how we protect it when you browse the site or place an order.</p>
                    <h3>1. What information we collect</h3>
                    <ul>
                        <li><strong>Orders:</strong> full name, delivery address, phone number, and e-mail.</li>
                        <li><strong>Account:</strong> login details and order history.</li>
                        <li><strong>Support:</strong> your name, contacts, and message text.</li>
                        <li><strong>Technical data:</strong> IP address, browser type, access time, site actions, and cookies for cart and authorization.</li>
                    </ul>
                    <h3>2. How we use your data</h3>
                    <ul>
                        <li>To process, pack, and deliver your orders.</li>
                        <li>To send order status updates by e-mail, SMS, or messenger.</li>
                        <li>To provide customer support.</li>
                        <li>To improve the website, assortment, and service.</li>
                        <li>With your consent, to send news, drops, discounts, and promotions.</li>
                    </ul>
                    <h3>3. Sharing with third parties</h3>
                    <p>We do not sell personal data. We may share only the data needed to complete your order with delivery services, payment providers, banks, and analytics tools. Street 19 does not store bank card data.</p>
                    <h3>4. Data protection and cookies</h3>
                    <p>We use technical and organizational measures to protect your information. Cookies help the cart, account, and basic site functions work correctly. You can disable cookies in your browser, but some features may stop working properly.</p>
                    <h3>5. Your rights</h3>
                    <ul>
                        <li>Ask what personal data we store about you.</li>
                        <li>Request correction of inaccurate data.</li>
                        <li>Withdraw consent or request account deletion.</li>
                        <li>Unsubscribe from marketing messages.</li>
                    </ul>
                    <h3>6. Contacts</h3>
                    <p>For privacy questions, contact the Street 19 team on Telegram: <a href="https://t.me/bmnknz" target="_blank" rel="noopener noreferrer">@bmnknz</a>.</p>
                `
            },
            refund: {
                title: 'Refund & Return Policy',
                body: `
                    <p><strong>Last updated:</strong> May 18, 2026</p>
                    <p>We want you to be happy with your Street 19 order. If an item does not fit, the color is not right, or you find a manufacturing defect, you can request a return or exchange under these rules.</p>
                    <h3>1. Return period</h3>
                    <ul>
                        <li>Unused items of proper quality can be returned within <strong>14 days</strong> after receiving the order.</li>
                        <li>Items with a manufacturing defect can be returned within the warranty period or within the time allowed by law.</li>
                    </ul>
                    <h3>2. Return conditions</h3>
                    <ul>
                        <li>The item must be unused: no skating or walking marks on shoes, no scratches on decks, no applied grip tape, and unopened bearings.</li>
                        <li>Original packaging, tags, labels, and protective films must be kept.</li>
                        <li>You need proof of purchase: receipt, electronic receipt, order number, or confirmation message.</li>
                    </ul>
                    <p><strong>Important for skaters:</strong> once a complete is assembled, trucks are mounted, or grip tape is applied, the item is treated as used and cannot be returned just because the color or shape was not right.</p>
                    <h3>3. How to request a return</h3>
                    <ol>
                        <li>Message us on Telegram <a href="https://t.me/bmnknz" target="_blank" rel="noopener noreferrer">@bmnknz</a> with the topic "Return for order #..." and the reason.</li>
                        <li>Our manager will confirm the request and send instructions.</li>
                        <li>Bring the item to the available offline point or ship it back according to the instructions.</li>
                    </ol>
                    <p>If the return is initiated by you, return shipping is paid by you. If the item is defective or we sent the wrong product, we cover the return shipping.</p>
                    <h3>4. Refunds and exchanges</h3>
                    <p>After we receive and inspect the item, usually within 1-3 business days, the refund is sent to the same payment method. Bank processing usually takes 3-10 business days. For another size or model, return the item and place a new order.</p>
                    <h3>5. Defects</h3>
                    <p>If you notice a defect, send clear photos or video to us on Telegram. Damage from hard landings, normal wear, scratched graphics, worn grip tape, or worn wheels is not considered a manufacturing defect.</p>
                `
            },
            shipping: {
                title: 'Shipping Policy',
                body: `
                    <p><strong>Last updated:</strong> May 18, 2026</p>
                    <p>At <strong>Street 19</strong>, we pack decks, shoes, clothes, and completes carefully so tails, noses, graphics, and boxes reach you in good condition.</p>
                    <h3>1. Delivery area and methods</h3>
                    <p>We deliver orders across Kazakhstan and other available regions using:</p>
                    <ul>
                        <li>courier delivery to your door;</li>
                        <li>delivery to pickup points;</li>
                        <li>self-pickup when an offline point is available for your order.</li>
                    </ul>
                    <h3>2. Shipping cost</h3>
                    <ul>
                        <li><strong>Self-pickup:</strong> free.</li>
                        <li><strong>Pickup point:</strong> calculated during checkout and depends on your city.</li>
                        <li><strong>Courier delivery:</strong> depends on the city and delivery service.</li>
                        <li><strong>Free shipping:</strong> may be available for selected promotions or orders above a set amount.</li>
                    </ul>
                    <h3>3. Processing and delivery time</h3>
                    <ul>
                        <li>Order processing usually takes 1-2 business days after payment confirmation.</li>
                        <li>Complete assembly can add up to 1 extra day.</li>
                        <li>City delivery usually takes 1-3 business days.</li>
                        <li>Regional delivery usually takes 3-10 business days.</li>
                    </ul>
                    <p>After dispatch, you receive a tracking number by e-mail, SMS, or messenger.</p>
                    <h3>4. Receiving the parcel</h3>
                    <ol>
                        <li>Check the box for dents, holes, or serious damage.</li>
                        <li>If the item is damaged, take photos or video and file a damage report with the delivery service.</li>
                        <li>Contact us, and we will help solve the issue.</li>
                    </ol>
                    <h3>5. Delays and contacts</h3>
                    <p>Delivery times may increase because of holidays, courier load, or weather. For delivery questions, contact us on Telegram: <a href="https://t.me/bmnknz" target="_blank" rel="noopener noreferrer">@bmnknz</a>.</p>
                `
            },
            terms: {
                title: 'Terms of Service',
                body: `
                    <p><strong>Last updated:</strong> May 18, 2026</p>
                    <p>Welcome to <strong>Street 19</strong>. These Terms of Service regulate the use of the website and the purchase of goods in our online skate shop.</p>
                    <h3>1. General terms</h3>
                    <p>By using the website, registering, or placing an order, you agree to these terms. Street 19 may update the terms, and the updated version becomes effective after publication on the site.</p>
                    <h3>2. Registration and account</h3>
                    <ul>
                        <li>Registration is not required for every order, but it can give access to order history.</li>
                        <li>You agree to provide accurate information when registering or placing an order.</li>
                        <li>You are responsible for keeping your password safe and for actions made under your account.</li>
                    </ul>
                    <h3>3. Orders and prices</h3>
                    <ul>
                        <li>Product prices are shown on the site and may change before payment.</li>
                        <li>Product characteristics and appearance may slightly differ from photos because of materials and screen settings.</li>
                        <li>An order is accepted after confirmation by the manager or the store system.</li>
                    </ul>
                    <h3>4. Payment, delivery, and returns</h3>
                    <p>Payment is made using methods available on the site. Delivery is handled by third-party delivery services or other available methods. Return rules are described in the Refund & Return Policy.</p>
                    <h3>5. Skateboarding risks</h3>
                    <p>Skateboarding puts heavy load on equipment. Normal wear, deck breakage from hard landings, scratches, grip tape damage, and wheel wear are not manufacturing defects. Street 19 is not responsible for injuries received while using skate equipment.</p>
                    <h3>6. Privacy and disputes</h3>
                    <p>Personal data is processed according to the Privacy Policy. Disputes are first handled through support negotiations; if no agreement is reached, they are handled under the laws of the Republic of Kazakhstan.</p>
                    <h3>7. Contacts</h3>
                    <p><strong>Store:</strong> Street 19 skate shop</p>
                    <p><strong>Telegram:</strong> <a href="https://t.me/bmnknz" target="_blank" rel="noopener noreferrer">@bmnknz</a></p>
                `
            }
        },
        kk: {
            privacy: {
                title: 'Құпиялылық саясаты',
                body: `
                    <p><strong>Соңғы жаңартылған күні:</strong> 2026 жылғы 18 мамыр</p>
                    <p><strong>Street 19</strong> сіздің құпиялылығыңызды құрметтейді. Бұл саясат сайтқа кіргенде және тапсырыс бергенде қандай деректер жиналатынын, қалай қолданылатынын және қалай қорғалатынын түсіндіреді.</p>
                    <h3>1. Қандай ақпарат жинаймыз</h3>
                    <ul>
                        <li><strong>Тапсырыс кезінде:</strong> аты-жөніңіз, жеткізу мекенжайы, телефон нөмірі және e-mail.</li>
                        <li><strong>Аккаунтта:</strong> кіру деректері және тапсырыс тарихы.</li>
                        <li><strong>Қолдау қызметінде:</strong> атыңыз, байланыс деректеріңіз және хабарлама мәтіні.</li>
                        <li><strong>Техникалық деректер:</strong> IP мекенжай, браузер түрі, кіру уақыты, сайттағы әрекеттер және себет пен авторизацияға арналған cookie.</li>
                    </ul>
                    <h3>2. Деректерді қалай қолданамыз</h3>
                    <ul>
                        <li>Тапсырысты өңдеу, жинау және жеткізу үшін.</li>
                        <li>Тапсырыс мәртебесін e-mail, SMS немесе мессенджер арқылы хабарлау үшін.</li>
                        <li>Клиенттерге қолдау көрсету үшін.</li>
                        <li>Сайтты, ассортиментті және сервисті жақсарту үшін.</li>
                        <li>Сіздің келісіміңізбен жаңалықтар, дроптар, жеңілдіктер және акциялар жіберу үшін.</li>
                    </ul>
                    <h3>3. Үшінші тұлғаларға беру</h3>
                    <p>Біз жеке деректерді сатпаймыз. Тапсырысты орындау үшін қажет деректер ғана жеткізу қызметтеріне, төлем провайдерлеріне, банктерге және аналитика сервистеріне берілуі мүмкін. Street 19 банк карталарының деректерін сақтамайды.</p>
                    <h3>4. Қорғау және cookie</h3>
                    <p>Біз ақпаратты қорғау үшін техникалық және ұйымдастырушылық шаралар қолданамыз. Cookie себет, аккаунт және сайттың негізгі функциялары дұрыс жұмыс істеуі үшін қажет. Cookie өшірілсе, кейбір функциялар дұрыс істемеуі мүмкін.</p>
                    <h3>5. Сіздің құқықтарыңыз</h3>
                    <ul>
                        <li>Сіз туралы қандай деректер сақталғанын сұрау.</li>
                        <li>Қате деректерді түзетуді сұрау.</li>
                        <li>Келісімді қайтарып алу немесе аккаунтты жоюды сұрау.</li>
                        <li>Маркетингтік хабарламалардан бас тарту.</li>
                    </ul>
                    <h3>6. Байланыс</h3>
                    <p>Құпиялылық бойынша сұрақтар үшін Street 19 командасына Telegram арқылы жазыңыз: <a href="https://t.me/bmnknz" target="_blank" rel="noopener noreferrer">@bmnknz</a>.</p>
                `
            },
            refund: {
                title: 'Тауарды қайтару және ақшаны қайтару саясаты',
                body: `
                    <p><strong>Соңғы жаңартылған күні:</strong> 2026 жылғы 18 мамыр</p>
                    <p>Street 19 тапсырысы көңіліңізден шыққанын қалаймыз. Өлшемі, түсі сәйкес келмесе немесе зауыттық ақау байқалса, төмендегі ережелер бойынша қайтару немесе айырбастауға өтініш бере аласыз.</p>
                    <h3>1. Қайтару мерзімі</h3>
                    <ul>
                        <li>Қолданылмаған сапалы тауарды алған күннен бастап <strong>14 күн</strong> ішінде қайтаруға болады.</li>
                        <li>Зауыттық ақауы бар тауар кепілдік мерзімі ішінде немесе заңда көрсетілген мерзімде қайтарылады.</li>
                    </ul>
                    <h3>2. Қайтару шарттары</h3>
                    <ul>
                        <li>Тауар қолданылмаған болуы керек: кедада жүру немесе тебу іздері жоқ, декада сызат жоқ, гриптейп жабыстырылмаған, подшипниктер ашылмаған.</li>
                        <li>Қаптама, бирка, жапсырма және қорғаныш пленкалар сақталуы керек.</li>
                        <li>Сатып алуды растайтын құжат қажет: чек, электрондық чек, тапсырыс нөмірі немесе растау хабарламасы.</li>
                    </ul>
                    <p><strong>Скейтшілер үшін маңызды:</strong> комплит жиналса, трактар декаға бекітілсе немесе гриптейп жабыстырылса, тауар қолданылған болып саналады және "түсі/формасы ұнамады" себебімен қайтарылмайды.</p>
                    <h3>3. Қайтаруды қалай рәсімдеу керек</h3>
                    <ol>
                        <li>Telegram-да <a href="https://t.me/bmnknz" target="_blank" rel="noopener noreferrer">@bmnknz</a> аккаунтына "Тапсырыс #... бойынша қайтару" деп жазып, себебін көрсетіңіз.</li>
                        <li>Менеджер өтінішті растап, нұсқаулық жібереді.</li>
                        <li>Тауарды қолжетімді офлайн нүктеге әкеліңіз немесе менеджер нұсқауы бойынша жеткізу арқылы жіберіңіз.</li>
                    </ol>
                    <p>Қайтару сіздің бастамаңызбен болса, кері жеткізу ақысын сіз төлейсіз. Егер тауар ақаулы болса немесе біз қате тауар жіберсек, жеткізу ақысын біз өтейміз.</p>
                    <h3>4. Ақшаны қайтару және айырбастау</h3>
                    <p>Тауарды алғаннан кейін 1-3 жұмыс күні ішінде жағдайын тексереміз. Ақша бастапқы төлем әдісіне қайтарылады, банкте өңдеу әдетте 3-10 жұмыс күнін алады. Басқа өлшем немесе модель қажет болса, тауарды қайтарып, жаңа тапсырыс беріңіз.</p>
                    <h3>5. Ақау</h3>
                    <p>Ақау байқасаңыз, анық фото немесе видео жіберіңіз. Қатты приземление кезіндегі дека сынуы, табиғи тозу, графиканың сызылуы, гриптейптің немесе дөңгелектердің тозуы зауыттық ақау болып саналмайды.</p>
                `
            },
            shipping: {
                title: 'Жеткізу саясаты',
                body: `
                    <p><strong>Соңғы жаңартылған күні:</strong> 2026 жылғы 18 мамыр</p>
                    <p><strong>Street 19</strong> декаларды, кедаларды, киімдерді және комплиттерді мұқият қаптайды, сондықтан тейл, ноуз, графика және қорап жолда жақсы күйде сақталады.</p>
                    <h3>1. Жеткізу аймағы және тәсілдері</h3>
                    <p>Тапсырыстар Қазақстан бойынша және қолжетімді басқа аймақтарға жеткізіледі:</p>
                    <ul>
                        <li>есігіңізге дейін курьерлік жеткізу;</li>
                        <li>тапсырысты беру пунктіне жеткізу;</li>
                        <li>тапсырысқа қолжетімді болса, өзіңіз алып кету.</li>
                    </ul>
                    <h3>2. Жеткізу құны</h3>
                    <ul>
                        <li><strong>Өзіңіз алып кету:</strong> тегін.</li>
                        <li><strong>Беру пункті:</strong> қалаңызға байланысты рәсімдеу кезінде есептеледі.</li>
                        <li><strong>Курьерлік жеткізу:</strong> қалаға және жеткізу қызметіне байланысты.</li>
                        <li><strong>Тегін жеткізу:</strong> жеке акцияларда немесе белгіленген сомадан жоғары тапсырыстарда болуы мүмкін.</li>
                    </ul>
                    <h3>3. Өңдеу және жеткізу мерзімі</h3>
                    <ul>
                        <li>Тапсырыс төлем расталғаннан кейін әдетте 1-2 жұмыс күнінде өңделеді.</li>
                        <li>Комплит жинау қосымша 1 күнге дейін уақыт алуы мүмкін.</li>
                        <li>Қала ішінде жеткізу әдетте 1-3 жұмыс күні.</li>
                        <li>Аймақтарға жеткізу әдетте 3-10 жұмыс күні.</li>
                    </ul>
                    <p>Жіберілгеннен кейін трек нөмір e-mail, SMS немесе мессенджер арқылы беріледі.</p>
                    <h3>4. Сәлемдемені алу кезінде</h3>
                    <ol>
                        <li>Қорапта қатты майысу, тесік немесе зақым бар-жоғын тексеріңіз.</li>
                        <li>Тауар зақымдалса, фото немесе видео түсіріп, жеткізу қызметімен акт жасаңыз.</li>
                        <li>Бізге жазыңыз, мәселені шешуге көмектесеміз.</li>
                    </ol>
                    <h3>5. Кідірістер және байланыс</h3>
                    <p>Мерзімдер мереке, жеткізу қызметінің жүктемесі немесе ауа райына байланысты ұзаруы мүмкін. Жеткізу бойынша сұрақтар үшін Telegram: <a href="https://t.me/bmnknz" target="_blank" rel="noopener noreferrer">@bmnknz</a>.</p>
                `
            },
            terms: {
                title: 'Қызмет көрсету шарттары',
                body: `
                    <p><strong>Соңғы жаңартылған күні:</strong> 2026 жылғы 18 мамыр</p>
                    <p><strong>Street 19</strong> скейтшопына қош келдіңіз. Бұл шарттар сайтты пайдалану және интернет-дүкеннен тауар сатып алу тәртібін реттейді.</p>
                    <h3>1. Жалпы шарттар</h3>
                    <p>Сайтты пайдалану, тіркелу немесе тапсырыс рәсімдеу арқылы сіз осы шарттармен келісесіз. Street 19 шарттарды жаңарта алады, ал жаңа нұсқа сайтта жарияланғаннан кейін күшіне енеді.</p>
                    <h3>2. Тіркелу және аккаунт</h3>
                    <ul>
                        <li>Әр тапсырыс үшін тіркелу міндетті емес, бірақ тапсырыс тарихына қолжетімділік береді.</li>
                        <li>Тіркелу немесе тапсырыс кезінде нақты деректер беруге келісесіз.</li>
                        <li>Құпиясөздің сақталуына және аккаунтыңыз арқылы жасалған әрекеттерге өзіңіз жауап бересіз.</li>
                    </ul>
                    <h3>3. Тапсырыс және бағалар</h3>
                    <ul>
                        <li>Тауар бағалары сайтта көрсетіледі және төлемге дейін өзгеруі мүмкін.</li>
                        <li>Материал ерекшелігі және экран баптауларына байланысты тауардың түсі немесе көрінісі фотодан аздап өзгеше болуы мүмкін.</li>
                        <li>Тапсырыс менеджер немесе дүкен жүйесі растағаннан кейін қабылданды деп саналады.</li>
                    </ul>
                    <h3>4. Төлем, жеткізу және қайтару</h3>
                    <p>Төлем сайтта қолжетімді тәсілдермен жасалады. Жеткізуді үшінші тарап жеткізу қызметтері немесе басқа қолжетімді тәсілдер орындайды. Қайтару ережелері Қайтару саясатында сипатталған.</p>
                    <h3>5. Скейтбординг тәуекелдері</h3>
                    <p>Скейтбординг жабдыққа үлкен жүктеме түсіреді. Табиғи тозу, қатты приземление кезіндегі дека сынуы, сызаттар, гриптейп зақымы және дөңгелек тозуы зауыттық ақау емес. Street 19 скейт жабдығын пайдалану кезінде алынған жарақаттарға жауап бермейді.</p>
                    <h3>6. Құпиялылық және даулар</h3>
                    <p>Жеке деректер Құпиялылық саясатына сай өңделеді. Даулар алдымен қолдау қызметі арқылы келіссөзбен шешіледі; келісім болмаса, Қазақстан Республикасының заңнамасына сәйкес қаралады.</p>
                    <h3>7. Байланыс</h3>
                    <p><strong>Дүкен:</strong> Street 19 скейтшопы</p>
                    <p><strong>Telegram:</strong> <a href="https://t.me/bmnknz" target="_blank" rel="noopener noreferrer">@bmnknz</a></p>
                `
            }
        }
    };

    function injectStyles() {
        if (document.getElementById('street19-preferences-style')) return;

        const style = document.createElement('style');
        style.id = 'street19-preferences-style';
        style.textContent = `
            .language-selector {
                position: relative;
            }

            .language-btn {
                background: transparent;
                border: 1px solid rgba(83, 83, 83, 0.4);
                color: var(--text-dark, #333127);
                padding: 6px 12px;
                border-radius: 20px;
                cursor: pointer;
                font-size: 12px;
                display: flex;
                align-items: center;
                gap: 6px;
                transition: border-color 0.2s;
            }

            .language-btn:hover {
                border-color: black;
            }

            .currency-selector.pref-on-dark .currency-btn,
            .language-selector.pref-on-dark .language-btn {
                color: var(--accent-color, #EFE4D0) !important;
                border: 1px solid rgba(239, 228, 208, 0.75) !important;
            }

            .currency-selector.pref-on-dark .currency-btn:hover,
            .language-selector.pref-on-dark .language-btn:hover {
                border: 1px solid var(--accent-color, #EFE4D0) !important;
            }

            .language-dropdown {
                display: none;
                position: absolute;
                bottom: calc(100% + 8px);
                left: 0;
                min-width: 96px;
                background: var(--text-dark, #333127);
                border: 1px solid rgba(255,255,255,0.15);
                border-radius: 10px;
                list-style: none;
                padding: 8px 0;
                z-index: 100;
                box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
            }

            .language-selector.open .language-dropdown {
                display: block;
            }

            .language-dropdown li {
                padding: 10px 16px;
                color: var(--accent-color, #EFE4D0);
                cursor: pointer;
                font-size: 13px;
                transition: background 0.15s;
            }

            .language-dropdown li:hover {
                background: rgba(255,255,255,0.08);
            }

            .language-dropdown li.selected {
                color: var(--main-color, #F26509);
                font-weight: 700;
            }

            .street19-policy-modal {
                position: fixed;
                inset: 0;
                z-index: 5000;
                display: none;
                align-items: center;
                justify-content: center;
                background: rgba(0, 0, 0, 0.62);
                padding: 20px;
            }

            .street19-policy-modal.open {
                display: flex;
            }

            .street19-policy-dialog {
                width: min(920px, 100%);
                max-height: min(86vh, 820px);
                background: var(--accent-color, #EFE4D0);
                color: var(--text-dark, #333127);
                border: 2px solid var(--main-color, #F26509);
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                box-shadow: 0 24px 70px rgba(0, 0, 0, 0.35);
            }

            .street19-policy-head {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 18px;
                padding: 22px 26px;
                border-bottom: 1px solid rgba(51, 49, 39, 0.14);
            }

            .street19-policy-title {
                margin: 0;
                color: var(--text-dark, #333127);
                font-size: clamp(22px, 3vw, 34px);
                line-height: 1.05;
                text-transform: uppercase;
            }

            .street19-policy-close {
                width: 38px;
                height: 38px;
                border: 1px solid rgba(51, 49, 39, 0.35);
                border-radius: 50%;
                background: transparent;
                color: var(--text-dark, #333127);
                cursor: pointer;
                font-size: 28px;
                line-height: 1;
                flex: 0 0 auto;
            }

            .street19-policy-close:hover {
                background: var(--main-color, #F26509);
                border-color: var(--main-color, #F26509);
                color: var(--accent-color, #EFE4D0);
            }

            .street19-policy-body {
                padding: 24px 26px 30px;
                overflow-y: auto;
                line-height: 1.65;
                font-size: 15px;
            }

            .street19-policy-body h3 {
                color: var(--text-dark, #333127);
                font-size: 18px;
                margin: 26px 0 10px;
                text-transform: uppercase;
            }

            .street19-policy-body p {
                margin: 0 0 14px;
            }

            .street19-policy-body ul,
            .street19-policy-body ol {
                margin: 0 0 16px 22px;
                padding: 0;
            }

            .street19-policy-body li {
                margin-bottom: 8px;
            }

            .street19-policy-body a {
                color: var(--main-color, #F26509);
                font-weight: 700;
            }

            body.policy-modal-open {
                overflow: hidden;
            }

            @media (max-width: 560px) {
                .street19-policy-modal {
                    padding: 12px;
                }

                .street19-policy-head {
                    padding: 18px 16px;
                }

                .street19-policy-body {
                    padding: 18px 16px 24px;
                    font-size: 14px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function ensurePreferenceControls() {
        const footerSocials = document.querySelector('.footer-socials') || document.querySelector('.footer-bottom');
        if (!footerSocials) return;

        let currencySelector = document.getElementById('currencySelector');
        if (!currencySelector) {
            currencySelector = document.createElement('div');
            currencySelector.className = 'currency-selector';
            currencySelector.id = 'currencySelector';
            footerSocials.appendChild(currencySelector);
        }

        currencySelector.innerHTML = `
            <button class="currency-btn" id="currencyBtn" type="button">
                <span id="currencyLabel"></span>
                <span class="currency-arrow">∨</span>
            </button>
            <ul class="currency-dropdown" id="currencyDropdown">
                ${Object.keys(currencies).map(code => `
                    <li data-currency="${code}">${getCurrencyLabel(code)}</li>
                `).join('')}
            </ul>
        `;

        let languageSelector = document.getElementById('languageSelector');
        if (!languageSelector) {
            languageSelector = document.createElement('div');
            languageSelector.className = 'language-selector';
            languageSelector.id = 'languageSelector';
            currencySelector.insertAdjacentElement('afterend', languageSelector);
        }

        languageSelector.innerHTML = `
            <button class="language-btn" id="languageBtn" type="button">
                <span id="languageLabel"></span>
                <span class="currency-arrow">∨</span>
            </button>
            <ul class="language-dropdown" id="languageDropdown">
                ${Object.keys(languages).map(code => `
                    <li data-language="${code}">${languages[code].label}</li>
                `).join('')}
            </ul>
        `;
    }

    function bindControls() {
        const currencySelector = document.getElementById('currencySelector');
        const currencyBtn = document.getElementById('currencyBtn');
        const languageSelector = document.getElementById('languageSelector');
        const languageBtn = document.getElementById('languageBtn');

        currencyBtn?.addEventListener('click', event => {
            event.stopPropagation();
            languageSelector?.classList.remove('open');
            currencySelector?.classList.toggle('open');
        });

        document.querySelectorAll('[data-currency]').forEach(item => {
            item.addEventListener('click', event => {
                event.stopPropagation();
                setCurrency(item.dataset.currency);
                currencySelector?.classList.remove('open');
            });
        });

        languageBtn?.addEventListener('click', event => {
            event.stopPropagation();
            currencySelector?.classList.remove('open');
            languageSelector?.classList.toggle('open');
        });

        document.querySelectorAll('[data-language]').forEach(item => {
            item.addEventListener('click', event => {
                event.stopPropagation();
                setLanguage(item.dataset.language);
                languageSelector?.classList.remove('open');
            });
        });

        document.addEventListener('click', () => {
            currencySelector?.classList.remove('open');
            languageSelector?.classList.remove('open');
        });
    }

    function getReadableBackground(element) {
        let current = element;

        while (current) {
            const color = window.getComputedStyle(current).backgroundColor;
            if (color && color !== 'transparent' && !color.endsWith(', 0)')) {
                return color;
            }
            current = current.parentElement;
        }

        return window.getComputedStyle(document.body).backgroundColor;
    }

    function isDarkColor(color) {
        const match = String(color || '').match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
        if (!match) return false;

        const [, r, g, b] = match.map(Number);
        const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        return luminance < 0.58;
    }

    function syncPreferenceControlTheme() {
        const footer = document.querySelector('.main-footer') || document.body;
        const isDark = isDarkColor(getReadableBackground(footer));

        document.getElementById('currencySelector')?.classList.toggle('pref-on-dark', isDark);
        document.getElementById('languageSelector')?.classList.toggle('pref-on-dark', isDark);
    }

    function setCurrency(currency) {
        if (!currencies[currency]) return;

        currentCurrency = currency;
        localStorage.setItem(STORAGE_CURRENCY, currency);
        updateCurrencyControl();
        window.dispatchEvent(new CustomEvent('street19:currencychange', { detail: { currency } }));
        refreshPrices();
    }

    function setLanguage(language) {
        if (!languages[language]) return;

        currentLanguage = language;
        localStorage.setItem(STORAGE_LANGUAGE, language);
        applyLanguage();
        window.dispatchEvent(new CustomEvent('street19:languagechange', { detail: { language } }));
    }

    function getCurrencyLabel(currency) {
        const config = currencies[currency];
        if (!config) return currency;

        return config.labels?.[currentLanguage] || config.labels?.en || currency;
    }

    function updateCurrencyControl() {
        const label = document.getElementById('currencyLabel');
        if (label) {
            label.textContent = getCurrencyLabel(currentCurrency);
        }

        document.querySelectorAll('[data-currency]').forEach(item => {
            item.textContent = getCurrencyLabel(item.dataset.currency);
            item.classList.toggle('selected', item.dataset.currency === currentCurrency);
        });
    }

    function updateLanguageControl() {
        const label = document.getElementById('languageLabel');
        if (label) {
            label.textContent = languages[currentLanguage].label;
        }

        document.querySelectorAll('[data-language]').forEach(item => {
            item.classList.toggle('selected', item.dataset.language === currentLanguage);
        });
    }

    function ensurePolicyModal() {
        if (document.getElementById('street19PolicyModal')) return;

        const modal = document.createElement('div');
        modal.className = 'street19-policy-modal';
        modal.id = 'street19PolicyModal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-hidden', 'true');
        modal.innerHTML = `
            <div class="street19-policy-dialog" role="document">
                <div class="street19-policy-head">
                    <h2 class="street19-policy-title" id="street19PolicyTitle"></h2>
                    <button class="street19-policy-close" id="street19PolicyClose" type="button" aria-label="Close">×</button>
                </div>
                <div class="street19-policy-body" id="street19PolicyBody"></div>
            </div>
        `;

        modal.addEventListener('click', event => {
            if (event.target === modal) {
                closePolicyModal();
            }
        });

        modal.querySelector('#street19PolicyClose')?.addEventListener('click', closePolicyModal);
        document.body.appendChild(modal);

        if (!window.street19PolicyEscapeBound) {
            window.street19PolicyEscapeBound = true;
            document.addEventListener('keydown', event => {
                if (event.key === 'Escape') {
                    closePolicyModal();
                }
            });
        }
    }

    function openPolicyModal(policyKey) {
        const policy = translatedPolicyDocuments[currentLanguage]?.[policyKey] || policyDocuments[policyKey];
        if (!policy) return;

        ensurePolicyModal();

        const modal = document.getElementById('street19PolicyModal');
        const title = document.getElementById('street19PolicyTitle');
        const body = document.getElementById('street19PolicyBody');

        if (title) title.textContent = policy.title;
        if (body) {
            body.innerHTML = policy.body;
            body.scrollTop = 0;
        }

        if (modal) {
            modal.dataset.policy = policyKey;
        }
        modal?.classList.add('open');
        modal?.setAttribute('aria-hidden', 'false');
        document.body.classList.add('policy-modal-open');
        document.getElementById('street19PolicyClose')?.focus();
    }

    function closePolicyModal() {
        const modal = document.getElementById('street19PolicyModal');
        modal?.classList.remove('open');
        modal?.setAttribute('aria-hidden', 'true');
        document.body?.classList.remove('policy-modal-open');
    }

    function wireFooterContactLinks(root = document) {
        if (!root.querySelectorAll) return;

        ensurePolicyModal();

        const footerItems = root.querySelectorAll('.footer-links li');
        const policies = ['privacy', 'refund', 'shipping', 'terms'];

        footerItems.forEach((item, index) => {
            const link = item.querySelector('a');
            if (!link) return;

            if (index <= 1) {
                link.href = CONTACT_URL;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.onclick = null;
                link.removeAttribute('data-policy');
                return;
            }

            const policyKey = policies[index - 2];
            if (!policyKey) return;

            link.href = `#${policyKey}`;
            link.removeAttribute('target');
            link.removeAttribute('rel');
            link.dataset.policy = policyKey;
            link.onclick = event => {
                event.preventDefault();
                openPolicyModal(policyKey);
            };
        });
    }

    function t(key, fallback = '') {
        return translations[currentLanguage]?.[key] || translations.en[key] || fallback;
    }

    function applyText(selector, key) {
        document.querySelectorAll(selector).forEach(element => {
            element.textContent = t(key, element.textContent.trim());
        });
    }

    function applyPlaceholder(selector, key) {
        document.querySelectorAll(selector).forEach(element => {
            element.setAttribute('placeholder', t(key, element.getAttribute('placeholder') || ''));
        });
    }

    function normalizeContentText(value) {
        return String(value || '')
            .replace(/\u00a0/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function resolveContentTranslation(value) {
        const normalized = normalizeContentText(value);
        if (!normalized) return null;

        for (const [source, values] of Object.entries(contentTranslations)) {
            const sourceNormalized = normalizeContentText(source);
            const ruNormalized = normalizeContentText(values.ru);
            const kkNormalized = normalizeContentText(values.kk);

            if ([sourceNormalized, ruNormalized, kkNormalized].includes(normalized)) {
                if (currentLanguage === 'en') return source;
                return values[currentLanguage] || source;
            }
        }

        if (normalized.startsWith('Order #') || normalized.startsWith('Заказ #') || normalized.startsWith('Тапсырыс #')) {
            const number = normalized.replace(/^(Order|Заказ|Тапсырыс)\s*#/i, '').trim();
            if (currentLanguage === 'ru') return `Заказ #${number}`;
            if (currentLanguage === 'kk') return `Тапсырыс #${number}`;
            return `Order #${number}`;
        }

        return null;
    }

    function shouldSkipNode(node) {
        const element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
        if (!element) return true;

        return Boolean(element.closest(
            'script, style, noscript, .nav-menu, .logo, .banner-title, .footer-payment, .social-icons, .currency-selector, .language-selector, .street19-policy-modal, .product-title, .cart-item-name, .cart-page-head h2, .order-product-info h3, .event-card, .event-modal-title'
        ));
    }

    function translateTextNode(node) {
        if (shouldSkipNode(node)) return;

        const original = node.nodeValue;
        const translation = resolveContentTranslation(original);
        if (!translation) return;

        const leading = original.match(/^\s*/)?.[0] || '';
        const trailing = original.match(/\s*$/)?.[0] || '';
        node.nodeValue = `${leading}${translation}${trailing}`;
    }

    function translateElementAttributes(element) {
        if (shouldSkipNode(element)) return;

        ['placeholder', 'title', 'aria-label', 'data-title', 'data-info', 'data-description', 'data-details'].forEach(attribute => {
            if (!element.hasAttribute(attribute)) return;

            const translation = resolveContentTranslation(element.getAttribute(attribute));
            if (translation) {
                element.setAttribute(attribute, translation);
            }
        });
    }

    function applyContentTranslations(root = document.body) {
        if (!root) return;

        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        const textNodes = [];

        while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
        }

        textNodes.forEach(translateTextNode);

        const elements = root.querySelectorAll ? root.querySelectorAll('[placeholder], [title], [aria-label], [data-title], [data-info], [data-description], [data-details]') : [];
        elements.forEach(translateElementAttributes);
    }

    function getEventKey(card) {
        return card?.dataset?.image || card?.querySelector?.('img')?.getAttribute('src') || '';
    }

    function eventOriginalField(field) {
        return `original${field.charAt(0).toUpperCase()}${field.slice(1)}`;
    }

    function rememberEventOriginals(card) {
        ['title', 'description', 'details', 'location'].forEach(field => {
            const originalField = eventOriginalField(field);
            if (!card.dataset[originalField]) {
                card.dataset[originalField] = card.dataset[field] || '';
            }
        });
    }

    function getEventTranslation(card) {
        if (currentLanguage === 'ru') return null;
        return eventTranslations[getEventKey(card)]?.[currentLanguage] || null;
    }

    function applyEventContent(card) {
        rememberEventOriginals(card);

        const translation = getEventTranslation(card);
        ['title', 'description', 'details', 'location'].forEach(field => {
            const originalField = eventOriginalField(field);
            card.dataset[field] = translation?.[field] || card.dataset[originalField] || '';
        });

        const image = card.querySelector('img');
        if (image) {
            image.alt = card.dataset.title || '';
        }

        const description = card.querySelector('.event-description');
        if (description) {
            description.textContent = card.dataset.description || '';
        }

        const location = card.querySelector('.event-location');
        if (location) {
            location.textContent = card.dataset.location || '';
        }
    }

    function formatEventDate(isoValue, includeTime = false) {
        if (!isoValue) return '';

        const date = new Date(isoValue);
        if (Number.isNaN(date.getTime())) return '';

        const monthLabels = {
            en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            ru: ['янв.', 'фев.', 'мар.', 'апр.', 'мая', 'июн.', 'июл.', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.'],
            kk: ['қаң.', 'ақп.', 'нау.', 'сәу.', 'мам.', 'мау.', 'шіл.', 'там.', 'қыр.', 'қаз.', 'қар.', 'жел.']
        };
        const months = monthLabels[currentLanguage] || monthLabels.en;
        const datePart = `${String(date.getDate()).padStart(2, '0')} ${months[date.getMonth()]} ${date.getFullYear()}`;

        if (!includeTime) return datePart;

        const timePart = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

        return `${datePart} · ${timePart}`;
    }

    function findEventCardByKey(key) {
        return Array.from(document.querySelectorAll('.event-card')).find(card => getEventKey(card) === key) || null;
    }

    function setTextIfChanged(element, value) {
        if (element && element.textContent !== value) {
            element.textContent = value;
        }
    }

    function setEventModalText(element, value) {
        if (!element) return;

        const text = value || '';
        if (typeof window.Street19RenderTextWithLinks === 'function') {
            window.Street19RenderTextWithLinks(element, text);
            return;
        }

        setTextIfChanged(element, text);
    }

    function syncOpenEventModal() {
        const backdrop = document.getElementById('eventModalBackdrop');
        if (!backdrop?.classList.contains('open')) return;

        const card = findEventCardByKey(backdrop.dataset.eventKey);
        if (!card) return;

        setTextIfChanged(document.getElementById('modalTitle'), card.dataset.title || '');
        setTextIfChanged(document.getElementById('modalLocation'), card.dataset.location || '');
        setEventModalText(document.getElementById('modalDescription'), card.dataset.description || '');

        const details = document.getElementById('modalDetails');
        const divider = document.querySelector('.event-modal-divider');
        if (details) {
            setEventModalText(details, card.dataset.details || '');
            details.style.display = card.dataset.details ? '' : 'none';
        }
        if (divider) {
            divider.style.display = card.dataset.details ? '' : 'none';
        }

        const date = document.getElementById('modalDate');
        if (date) {
            date.dataset.dateIso = card.dataset.dateIso || '';
            setTextIfChanged(date, card.dataset.date || '');
        }
    }

    function applyEventTranslations(root = document) {
        if (!root?.querySelectorAll) return;

        root.querySelectorAll('.event-card').forEach(card => {
            applyEventContent(card);

            if (card.dataset.dateIso) {
                const shortDate = formatEventDate(card.dataset.dateIso);
                const fullDate = formatEventDate(card.dataset.dateIso, true);
                if (shortDate) {
                    const dateElement = card.querySelector('.event-date');
                    if (dateElement) {
                        dateElement.textContent = shortDate;
                    }
                }
                if (fullDate) {
                    card.dataset.date = fullDate;
                }
            }
        });

        const modalDate = document.getElementById('modalDate');
        if (modalDate?.dataset.dateIso) {
            const fullDate = formatEventDate(modalDate.dataset.dateIso, true);
            if (fullDate) {
                modalDate.textContent = fullDate;
            }
        }

        syncOpenEventModal();
    }

    function observeTranslatedContent() {
        if (!document.body || window.street19TranslationObserver) return;

        let scheduled = false;
        window.street19TranslationObserver = new MutationObserver(() => {
            if (scheduled) return;
            scheduled = true;
            window.requestAnimationFrame(() => {
                scheduled = false;
                applySelectorTranslations();
                applyContentTranslations();
                applyEventTranslations();
                wireFooterContactLinks();
                refreshPrices();
            });
        });

        window.street19TranslationObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function applyLanguage() {
        document.documentElement.lang = languages[currentLanguage]?.htmlLang || 'en';
        updateLanguageControl();
        updateCurrencyControl();
        resetNavMenuText();
        applySelectorTranslations();

        applyText('.footer-subscribe h3', 'footer.updates');
        applyText('.footer-submit', 'footer.subscribe');
        applyText('.footer-links h4', 'footer.moreInfo');
        applyText('.footer-links li:nth-child(1) a', 'footer.contact');
        applyText('.footer-links li:nth-child(2) a', 'footer.help');
        applyText('.footer-links li:nth-child(3) a', 'footer.privacy');
        applyText('.footer-links li:nth-child(4) a', 'footer.refund');
        applyText('.footer-links li:nth-child(5) a', 'footer.shipping');
        applyText('.footer-links li:nth-child(6) a', 'footer.terms');
        document.querySelectorAll('.product-option-label').forEach(element => {
            const current = element.textContent.trim().toLowerCase();
            if (['size:', 'размер:', 'өлшем:'].includes(current)) {
                element.textContent = t('product.size');
            }
        });
        applyText('#productAddToCart', 'product.addToCart');
        applyText('.clear-all', 'cart.clearAll');
        applyText('.view-cart-button', 'cart.viewCart');
        applyText('.cart-title', 'cart.title');
        applyText('.checkout-button', 'cart.checkout');
        applyText('.checkout-subtotal span', 'cart.subtotal');
        applyText('.checkout-login', 'cart.signIn');
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.dataset.i18n;
            element.textContent = t(key, element.textContent.trim());
        });
        applyPlaceholder('input[name="search"], #searchInput', 'search.placeholder');
        applyPlaceholder('#userEmail', 'email.placeholder');
        applyPlaceholder('#registerEmail', 'register.emailPlaceholder');
        applyPlaceholder('#registerCode', 'register.codePlaceholder');
        applyContentTranslations();
        applyEventTranslations();
        wireFooterContactLinks();
        const activePolicy = document.getElementById('street19PolicyModal')?.classList.contains('open')
            ? document.getElementById('street19PolicyModal')?.dataset.policy
            : null;
        if (activePolicy) {
            openPolicyModal(activePolicy);
        }
        resetNavMenuText();
    }

    function applySelectorTranslations() {
        selectorTranslations.forEach(item => {
            document.querySelectorAll(item.selector).forEach(element => {
                if (item.html) {
                    const nextHtml = item.html[currentLanguage] || item.html.en;
                    if (normalizeContentText(element.innerHTML) !== normalizeContentText(nextHtml)) {
                        element.innerHTML = nextHtml;
                    }
                } else if (item.text) {
                    const nextText = item.text[currentLanguage] || item.text.en;
                    if (normalizeContentText(element.textContent) !== normalizeContentText(nextText)) {
                        element.textContent = nextText;
                    }
                }
            });
        });
    }

    function resetNavMenuText() {
        const items = [
            ['.nav-menu a[href*="/shop"] span', 'shop'],
            ['.nav-menu a[href*="/culture"] span', 'culture'],
            ['.nav-menu a[href*="/learn"] span', 'learn'],
            ['.nav-menu a[href*="/events"] span', 'events']
        ];

        items.forEach(([selector, text]) => {
            document.querySelectorAll(selector).forEach(element => {
                element.textContent = text;
            });
        });
    }

    function parseUsd(text) {
        const normalized = String(text || '')
            .replace(/\s/g, '')
            .replace(',', '.')
            .replace(/[^\d.-]/g, '');
        const value = Number.parseFloat(normalized);
        return Number.isFinite(value) ? value : null;
    }

    function rememberBasePrice(element) {
        if (element.dataset.priceUsd) return;

        const value = parseUsd(element.textContent);
        if (value !== null) {
            element.dataset.priceUsd = String(value);
        }
    }

    function formatMoney(usdAmount, currency = currentCurrency) {
        const config = currencies[currency] || currencies.USD;
        const rate = rates[currency] || config.rate || 1;
        const amount = Number(usdAmount || 0) * rate;

        const formatted = new Intl.NumberFormat(undefined, {
            minimumFractionDigits: config.fractionDigits,
            maximumFractionDigits: config.fractionDigits
        }).format(amount);

        return config.symbolAfter ? `${formatted} ${config.symbol}` : `${config.symbol}${formatted}`;
    }

    function refreshPrices(root = document) {
        const selectors = [
            '.product-price',
            '.product-old-price',
            '.product-detail-price',
            '.cart-item-price',
            '.total-price',
            '#cartPageSubtotal',
            '.cart-page-bottom strong',
            '.checkout-modal-total strong',
            '.checkout-modal-item b',
            '.order-product strong',
            '.order-card-bottom strong'
        ].join(',');

        root.querySelectorAll(selectors).forEach(element => {
            rememberBasePrice(element);
            const usd = Number(element.dataset.priceUsd);
            if (Number.isFinite(usd)) {
                element.textContent = formatMoney(usd);
            }
        });
    }

    async function loadRates() {
        try {
            const cached = JSON.parse(localStorage.getItem(STORAGE_RATES) || 'null');
            if (cached?.timestamp && Date.now() - cached.timestamp < RATES_MAX_AGE) {
                rates = { ...rates, ...cached.rates };
                return;
            }
        } catch (err) {
            localStorage.removeItem(STORAGE_RATES);
        }

        try {
            const response = await fetch('https://open.er-api.com/v6/latest/USD', { cache: 'no-store' });
            const data = await response.json();
            if (data?.rates) {
                rates = {
                    USD: 1,
                    KZT: Number(data.rates.KZT) || rates.KZT,
                    RUB: Number(data.rates.RUB) || rates.RUB,
                    EUR: Number(data.rates.EUR) || rates.EUR,
                    GBP: Number(data.rates.GBP) || rates.GBP
                };
                localStorage.setItem(STORAGE_RATES, JSON.stringify({ timestamp: Date.now(), rates }));
            }
        } catch (err) {
            // Fallback rates above keep the shop usable offline.
        }
    }

    function initSubscribeForm() {
        const subscribeForm = document.getElementById('subscribeForm');
        const subscribeMsg = document.getElementById('subscribeMsg');

        if (!subscribeForm || subscribeForm.dataset.preferencesBound === 'true') return;
        subscribeForm.dataset.preferencesBound = 'true';

        subscribeForm.addEventListener('submit', async event => {
            event.preventDefault();

            const emailInput = document.getElementById('userEmail');
            const body = new URLSearchParams();
            body.set('email', emailInput?.value || '');

            try {
                const response = await fetch('/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body
                });
                const data = await response.json();
                if (subscribeMsg) subscribeMsg.textContent = data.message;
                if (response.ok) subscribeForm.reset();
            } catch (err) {
                if (subscribeMsg) subscribeMsg.textContent = t('subscribe.error', 'Something went wrong, try again.');
            }
        });
    }

    async function init() {
        injectStyles();
        ensurePreferenceControls();
        bindControls();
        initSubscribeForm();
        syncPreferenceControlTheme();
        window.addEventListener('resize', syncPreferenceControlTheme);
        updateCurrencyControl();
        applyLanguage();
        wireFooterContactLinks();
        observeTranslatedContent();
        refreshPrices();
        await loadRates();
        refreshPrices();
    }

    window.Street19Preferences = {
        applyLanguage,
        currentCurrency: () => currentCurrency,
        currentLanguage: () => currentLanguage,
        formatMoney,
        refreshPrices,
        setCurrency,
        setLanguage,
        t
    };

    document.addEventListener('DOMContentLoaded', init);
})();
