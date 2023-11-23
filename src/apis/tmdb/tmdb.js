const BASE_URL = 'https://api.themoviedb.org/3/'

const headers = {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_TMDB_AUTHORIZATION
}

const endpoints = {
    'trending': 'trending/movie/day?language=en-US',
    'upcoming': 'movie/upcoming',
    'top-rated': 'movie/top_rated',
}

export function getMoviesByQuery(query) {
    return fetch(BASE_URL + `search/movie?query=${query}&language=en-US&page=1`, {
        method: 'GET',
        headers
    })
        .then(response => response.json())
}

export function getMoviesByGenre(genre) {
    return fetch(BASE_URL + `discover/movie?with_genres=${genre}&language=en-US&page=1`, {
        method: 'GET',
        headers
    })
        .then(response => response.json())
}

export function getMoviesByType(type) {
    return fetch(BASE_URL + endpoints[type], {
        method: 'GET',
        headers
    })
        .then(response => response.json())
}