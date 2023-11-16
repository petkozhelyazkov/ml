const headers = {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_TMDB_AUTHORIZATION
}

export function getTrendingMovies() {
    return fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', {
        method: 'GET',
        headers
    })
        .then(response => response.json())
}