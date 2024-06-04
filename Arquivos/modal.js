document.addEventListener('DOMContentLoaded', function () {
    const animeListElement = document.querySelector('.anime-list');
    const modal = document.createElement('div');
    const modalContent = document.createElement('div');
    const closeModalBtn = document.createElement('span');

    // Configura os estilos e estrutura do modal
    modal.classList.add('modal');
    modalContent.classList.add('modal-content');
    closeModalBtn.classList.add('close-btn');
    closeModalBtn.textContent = '×';

    modal.appendChild(modalContent);
    modalContent.appendChild(closeModalBtn);
    document.body.appendChild(modal);

    // Função para abrir o modal com dados do anime
    function openModal(animeId) {
        fetch(`https://kitsu.io/api/edge/anime/${animeId}`)
            .then(response => response.json())
            .then(data => {
                const anime = data.data;
                const animeTitle = anime.attributes.titles.en || anime.attributes.titles.en_jp || anime.attributes.canonicalTitle;
                const animeYear = new Date(anime.attributes.startDate).toLocaleDateString('pt-BR', { year: 'numeric' });
                const animeStatus = anime.attributes.status === 'current' ? 'Em andamento' : anime.attributes.status === 'finished' ? 'Concluído' : anime.attributes.status === 'upcoming' ? 'A ser lançado' : 'Desconhecido';
                const animeType = anime.attributes.showType === 'TV' ? 'Anime' : anime.attributes.showType === 'movie' ? 'Filme' : anime.attributes.showType === 'special' ? 'Especial' : anime.attributes.showType;
                const synopsis = anime.attributes.synopsis || 'Sinopse não disponível';

                modalContent.innerHTML = `
                    <span class="close-btn">×</span>
                    <h2>${animeTitle}</h2>
                    <p>Ano de lançamento: ${animeYear}</p>
                    <p>Status: ${animeStatus}</p>
                    <p>Tipo: ${animeType}</p>
                    <p>Sinopse: ${synopsis}</p>
                `;

                modal.style.display = 'block';

                const closeModalBtn = modalContent.querySelector('.close-btn');
                closeModalBtn.addEventListener('click', function () {
                    modal.style.display = 'none';
                });
            })
            .catch(error => {
                console.error('Erro ao buscar os detalhes do anime:', error);
            });
    }

    // Adiciona evento para abrir o modal ao clicar em um card
    animeListElement.addEventListener('click', function (event) {
        const card = event.target.closest('.anime-card');
        if (card) {
            const animeId = card.dataset.animeId;
            if (animeId) {
                openModal(animeId);
            }
        }
    });

    // Fecha o modal ao clicar fora do conteúdo do modal
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
