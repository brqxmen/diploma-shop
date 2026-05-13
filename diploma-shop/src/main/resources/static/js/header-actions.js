document.addEventListener('DOMContentLoaded', function () {
    const searchToggle = document.querySelector('.header-search-toggle');
    const searchForm = document.querySelector('.header-search-form');
    const searchInput = searchForm?.querySelector('input[name="search"]');

    if (!searchToggle || !searchForm || !searchInput) return;

    searchToggle.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (searchForm.classList.contains('open') && searchInput.value.trim()) {
            searchForm.submit();
            return;
        }

        searchForm.classList.add('open');
        searchInput.focus();
    });

    searchForm.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && searchInput.value.trim()) {
            searchForm.submit();
        }
    });

    document.addEventListener('click', () => {
        if (!searchInput.value.trim()) {
            searchForm.classList.remove('open');
        }
    });
});
