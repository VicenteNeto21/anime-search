document.addEventListener('DOMContentLoaded', function () {
    const animeListElement = document.querySelector('.anime-list');
    const prevPageButton = document.querySelector('.prev-page');
    const nextPageButton = document.querySelector('.next-page');
    const pageIndicator = document.querySelector('.page-indicator');
    let currentPage = 1;

    function showAnimeList(animeData) {
        animeListElement.innerHTML = '';

        animeData.forEach(anime => {
            const animeCard = document.createElement('div');
            animeCard.classList.add('anime-card');

            const animeImage = document.createElement('img');
            animeImage.src = anime.attributes.posterImage.medium;
            animeImage.alt = anime.attributes.titles.en || anime.attributes.titles.en_jp || anime.attributes.canonicalTitle;

            const animeCardContent = document.createElement('div');
            animeCardContent.classList.add('anime-card-content');

            const animeTitle = document.createElement('h2');
            animeTitle.textContent = anime.attributes.titles.en || anime.attributes.titles.en_jp || anime.attributes.canonicalTitle;

            const animeYear = document.createElement('p');
            const releaseDate = new Date(anime.attributes.startDate);
            const formattedDate = releaseDate.toLocaleDateString('pt-BR', { year: 'numeric' });
            animeYear.textContent = `Ano de lançamento: ${formattedDate}`;
            animeYear.classList.add('anime-card-ano');

            const animeStatus = document.createElement('span');
            const status = anime.attributes.status;
            animeStatus.textContent = status === 'current' ? 'Em andamento' : status === 'finished' ? 'Concluído' : status === 'upcoming' ? 'A ser lançado' : 'A ser lançado';
            animeStatus.classList.add('anime-status');

            if (status === 'current') {
                animeStatus.classList.add('status-current');
            } else if (status === 'finished') {
                animeStatus.classList.add('status-finished');
            } else if (status === 'upcoming') {
                animeStatus.classList.add('status-upcoming');
            } else {
                animeStatus.classList.add('status-unknown');
            }

            const animeType = document.createElement('span');
            const showType = anime.attributes.showType;
            animeType.textContent = `${showType === 'TV' ? 'Anime' : showType === 'movie' ? 'Filme' : showType === 'special' ? 'OVA' : showType}`;
            animeType.classList.add('anime-type');

            animeCardContent.appendChild(animeStatus);
            animeCardContent.appendChild(animeType);
            animeCardContent.appendChild(animeTitle);
            animeCardContent.appendChild(animeYear);

            animeCard.appendChild(animeImage);
            animeCard.appendChild(animeCardContent);

            // Adiciona um evento de clique ao card para redirecionar para a página de detalhes do anime
            animeCard.addEventListener('click', function() {
                window.location.href = `anime.html?id=${anime.id}`;
            });

            animeListElement.appendChild(animeCard);
        });
    }

    function fetchTopAnimes(page) {
        fetch(`https://kitsu.io/api/edge/anime?sort=popularityRank&page[limit]=12&page[offset]=${(page - 1) * 12}`)
            .then(response => response.json())
            .then(data => {
                const topAnimeData = data.data;
                showAnimeList(topAnimeData);
                currentPage = page;
                pageIndicator.textContent = page;
            })
            .catch(error => {
                console.error('Erro ao buscar os top animes:', error);
            });
    }

    prevPageButton.addEventListener('click', function() {
        if (currentPage > 1) {
            fetchTopAnimes(currentPage - 1);
        }
    });

    nextPageButton.addEventListener('click', function() {
        fetchTopAnimes(currentPage + 1);
    });

    function searchAnime(term) {
        if (term === '') {
            fetchTopAnimes();
            return;
        }

        fetch(`https://kitsu.io/api/edge/anime?filter[text]=${term}`)
            .then(response => response.json())
            .then(data => {
                const animeData = data.data;
                showAnimeList(animeData);
            })
            .catch(error => {
                console.error('Erro ao buscar os animes:', error);
            });
    }

    const form = document.querySelector('.search-anime');
    const searchInput = document.querySelector('.search-anime-input');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const searchTerm = searchInput.value.trim();
        searchAnime(searchTerm);
    });

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim();
        if (searchTerm === '') {
            fetchTopAnimes();
        }
    });

    // Carrega os top animes assim que a página é carregada
    fetchTopAnimes(1);
});
