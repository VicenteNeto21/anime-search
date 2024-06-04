import { showAnimeList } from './animeList.js';

let currentPage = 1;
let searchTerm = '';

export function setupPagination(prevPageButton, nextPageButton, pageIndicator, animeListElement) {
    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            fetchAnimes(--currentPage, searchTerm, animeListElement, page => {
                pageIndicator.textContent = page;
            });
        }
    });

    nextPageButton.addEventListener('click', () => {
        fetchAnimes(++currentPage, searchTerm, animeListElement, page => {
            pageIndicator.textContent = page;
        });
    });
}

export function fetchAnimes(page, searchTerm, animeListElement, updatePageIndicator) {
    const url = searchTerm
        ? `https://kitsu.io/api/edge/anime?filter[text]=${searchTerm}&page[limit]=12&page[offset]=${(page - 1) * 12}`
        : `https://kitsu.io/api/edge/anime?sort=popularityRank&page[limit]=12&page[offset]=${(page - 1) * 12}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            showAnimeList(data.data, animeListElement);
            updatePageIndicator(page);
        })
        .catch(error => {
            console.error('Erro ao buscar os animes:', error);
        });
}
