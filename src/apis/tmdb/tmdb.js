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

export function getByQuery(query, mediaType, page = 1) {
    return fetch(BASE_URL + `search/${mediaType == 'shows' ? 'tv' : 'movie'}?query=${query}&language=en-US&page=${page}`, {
        method: 'GET',
        headers
    })
        .then(x => x.json())
}

export function getByType(type, mediaType, page = 1) {
    return fetch(BASE_URL + (mediaType == 'shows' ? tvEndpoints[type] : movieEndpoints[type]) + `?language=en-US&page=${page}`, {
        method: 'GET',
        headers
    })
        .then(x => x.json())
}

export function getByGenre(genre, mediaType, page = 1) {
    return fetch(BASE_URL + `discover/${mediaType == 'shows' ? 'tv' : 'movie'}?with_genres=${genre}&language=en-US&page=${page}`, {
        method: 'GET',
        headers
    })
        .then(x => x.json())
}

export function getById(id, mediaType) {
    return fetch(BASE_URL + `${mediaType == 'movie' ? 'movie' : 'tv'}/${id}}`, {
        method: 'GET',
        headers
    })
        .then(x => x.json())
}

export function getCredits(id, mediaType) {
    return fetch(BASE_URL + `${mediaType == 'movie' ? 'movie' : 'tv'}/${id}}/credits`, {
        method: 'GET',
        headers
    })
        .then(x => x.json())
}