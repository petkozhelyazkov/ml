const BASE_URL = 'https://api.themoviedb.org/3/'

const headers = {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_TMDB_AUTHORIZATION
}


export function getTrendingMovies() {
    return fetch(BASE_URL + 'trending/movie/day?language=en-US', {
        method: 'GET',
        headers
    })
        .then(response => response.json())
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