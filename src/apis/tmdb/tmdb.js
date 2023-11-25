const BASE_URL = 'https://api.themoviedb.org/3/'

const headers = {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_TMDB_AUTHORIZATION
}

const movieEndpoints = {
    'trending': 'trending/movie/day?language=en-US',
    'upcoming': 'movie/upcoming',
    'top-rated': 'movie/top_rated',
}

const tvEndpoints = {
    'trending': 'trending/tv/day?language=en-US',
    'top-rated': 'tv/top_rated',
}

export function getByQuery(query, mediaType) {
    return fetch(BASE_URL + `search/${mediaType == 'shows' ? 'tv' : 'movie'}?query=${query}&language=en-US&page=1`, {
        method: 'GET',
        headers
    })
        .then(x => x.json())
}

export function getByType(type, mediaType) {
    return fetch(BASE_URL + (mediaType == 'shows' ? tvEndpoints[type] : movieEndpoints[type]), {
        method: 'GET',
        headers
    })
        .then(x => x.json())
}

export function getByGenre(genre, mediaType) {
    return fetch(BASE_URL + `discover/${mediaType == 'shows' ? 'tv' : 'movie'}?with_genres=${genre}&language=en-US&page=1`, {
        method: 'GET',
        headers
    })
        .then(response => response.json())
}