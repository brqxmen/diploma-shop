(function () {
    window.Street19Images = window.Street19Images || {};

    window.Street19Images.normalizePath = function (image) {
        if (!image) return '';

        image = String(image).trim();
        if (image.startsWith('http')) return image;
        if (image.includes('static/images/')) return `/images/${image.split('static/images/').pop()}`;
        if (image.includes('/images/')) return `/images/${image.split('/images/').pop()}`;
        if (image.startsWith('images/')) return `/${image}`;
        if (image.startsWith('/')) return image;

        return `/images/${image}`;
    };
})();
