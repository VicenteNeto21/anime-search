export function showAnimeList(animeData, animeListElement) {
    animeListElement.innerHTML = '';

    animeData.forEach(anime => {
        const animeCard = document.createElement('div');
        animeCard.classList.add('anime-card');
        animeCard.dataset.animeId = anime.id;

        const animeImage = document.createElement('img');
        animeImage.src = anime.attributes.posterImage.medium;
        animeImage.alt = anime.attributes.titles.en_jp || anime.attributes.titles.en || anime.attributes.canonicalTitle;

        const animeCardContent = document.createElement('div');
        animeCardContent.classList.add('anime-card-content');

        const animeTitle = document.createElement('h2');
        animeTitle.textContent = anime.attributes.titles.en_jp || anime.attributes.titles.en || anime.attributes.canonicalTitle;

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

        // Adicionar evento de clique para redirecionar para a página de detalhes do anime
        animeCard.addEventListener('click', (event) => {
            // Verifica se o clique foi no próprio card, não em um elemento filho.
            if (event.target === animeCard || event.target === animeImage) {
                window.location.href = `anime.html?id=${anime.id}`;
            }
        });

        animeListElement.appendChild(animeCard);
    });
}
