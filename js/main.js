import { fetchAnimes, setupPagination } from './pagination.js';

document.addEventListener('DOMContentLoaded', function () {
    const animeListElement = document.querySelector('.anime-list');
    const prevPageButton = document.querySelector('.prev-page');
    const nextPageButton = document.querySelector('.next-page');
    const pageIndicator = document.querySelector('.page-indicator');

    setupPagination(prevPageButton, nextPageButton, pageIndicator, animeListElement);

    const form = document.querySelector('.search-anime');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const searchTerm = document.querySelector('.search-anime-input').value.trim();
        if (searchTerm !== '') {
            fetchAnimes(1, searchTerm, animeListElement, page => {
                pageIndicator.textContent = page;
            });
        }
    });

    fetchAnimes(1, '', animeListElement, page => {
        pageIndicator.textContent = page;
    });
});
