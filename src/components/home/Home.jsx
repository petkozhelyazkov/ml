import { useContext, useEffect, useState } from "react"
import { getMoviesByGenre, getMoviesByQuery, getMoviesByType } from "../../apis/tmdb/tmdb";
import MovieCard from "../movie/MovieCard";
import { SearchContext } from "../../contexts/SearchContext";
import Search from "../Search/Search";
import { useLocation } from "react-router-dom";

export default function Home() {
    const [movies, setMovies] = useState();
    const { query, genre, type } = useContext(SearchContext)
    const location = useLocation();

    useEffect(() => {
        if (query != '') {
            getMoviesByQuery(query)
                .then(x => {
                    setMovies(x.results)
                })
                .catch(x => console.log(x))
        } else {
            getMoviesByType('trending')
                .then(x => {
                    setMovies(x.results)
                })
                .catch(x => console.log(x))
        }
    }, [query])

    useEffect(() => {
        getMoviesByGenre(genre)
            .then(x => {
                setMovies(x.results)
            })
            .catch(x => console.log(x))
    }, [genre])

    useEffect(() => {
        let path = location.pathname
        let type = path == '/' ? 'trending' : path.slice(path.lastIndexOf('/') + 1)

        getMoviesByType(type)
            .then(x => {
                setMovies(x.results)
            })
            .catch(x => console.log(x))


    }, [location])

    return (
        <>
            <Search />
            <main className="ml-16 flex justify-center dark:bg-gray-800">
                <div className="grid grid-cols-8 gap-6 pt-8">
                    {movies?.map(x => <MovieCard key={x.id} movie={x} />)}
                </div>
            </main>
        </>
    )
}
