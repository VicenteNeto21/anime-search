document.addEventListener('DOMContentLoaded', function () {
    const animeListElement = document.querySelector('.anime-details-extra');

    function showAnimeList(animeData) {
        animeListElement.innerHTML = '';

        animeData.forEach(anime => {
            const animeCard = document.createElement('div');
            animeCard.classList.add('anime-details');

            const animeImage = document.createElement('img');
            animeImage.src = anime.attributes.posterImage.medium;
            animeImage.alt = anime.attributes.titles.en || anime.attributes.titles.en_jp || anime.attributes.canonicalTitle;

            const animeCardContent = document.createElement('div');
            animeCardContent.classList.add('anime-info');

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

            animeListElement.appendChild(animeCard);
        });
    }


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
