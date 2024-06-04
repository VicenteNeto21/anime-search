document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const animeId = urlParams.get("id");

    if (animeId) {
        fetchAnimeDetails(animeId);
    }

    function fetchAnimeDetails(id) {
        fetch(`https://kitsu.io/api/edge/anime/${id}`)
            .then((response) => response.json())
            .then((data) => {
                const anime = data.data;
                displayAnimeDetails(anime);
            })
            .catch((error) => {
                console.error("Erro ao buscar os detalhes do anime:", error);
            });
    }

    function displayAnimeDetails(anime) {
        const animeImage = document.getElementById("anime-image");
        const animeTitle = document.getElementById("anime-title");
        const animeClassification = document.getElementById("classification-anime");
        const animeYear = document.getElementById("anime-year");
        const animeGenre = document.getElementById("anime-genre");
        const animeEpisodes = document.getElementById("anime-episodes");
        const animeSynopsis = document.getElementById("anime-synopsis");
        const animeRating = document.getElementById("anime-rating");
        const animeStatus = document.getElementById("anime-status");

        animeImage.src = anime.attributes.posterImage.medium;
        animeImage.alt =
            anime.attributes.titles.en ||
            anime.attributes.titles.en_jp ||
            anime.attributes.canonicalTitle;

        animeTitle.textContent =
            anime.attributes.titles.en ||
            anime.attributes.titles.en_jp ||
            anime.attributes.canonicalTitle;

        const releaseDate = new Date(anime.attributes.startDate);
        const formattedDate = releaseDate.toLocaleDateString("pt-BR", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        });
        animeYear.textContent = `Ano de lançamento: ${formattedDate}`;

        animeGenre.textContent = `Gênero: ${anime.attributes.subtype}`;

        // Mapping age rating guide to compact format
        const ageRatingMap = {
            'G': 'Livre',
            'PG': '+10',
            'PG-13': '+13',
            'R': '+17',
            'R+': '+18',
            'Rx': '+18',
            'Teens 13 or older': '+13',
            '17+ (violence & profanity)': '+18'
        };

        const ageRating = anime.attributes.ageRatingGuide;
        const ageRatingFormatted = ageRatingMap[ageRating] || ageRating;

        animeClassification.textContent = `Classificação indicativa: ${ageRatingFormatted}`;

        const totalEpisodes = anime.attributes.episodeCount;
        const rating = anime.attributes.averageRating;
        const status = anime.attributes.status;
        const episodesCount = anime.attributes.episodesCount;

        if (totalEpisodes !== null && episodesCount !== null) {
            const episodesText = status === "current" ? `${totalEpisodes}` : `${totalEpisodes}`;
            animeEpisodes.textContent = `Episódios: ${episodesText}`;
        }

        if (rating !== null) {
            const ratingFormatted = Math.round(rating) / 10;
            animeRating.textContent = `Avaliação média: ${ratingFormatted}`;
        }

        animeSynopsis.textContent = `Sinopse: ${anime.attributes.synopsis}`;

        if (status === "current") {
            animeStatus.textContent = "Status: Em andamento";
        } else {
            animeStatus.textContent = "Status: Concluído";
        }
    }
});
