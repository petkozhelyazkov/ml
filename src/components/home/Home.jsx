import { useContext, useEffect, useState } from "react"
import { getMoviesByGenre, getMoviesByQuery, getTrendingMovies } from "../../apis/tmdb/tmdb";
import MovieCard from "../movie/MovieCard";
import { SearchContext } from "../../contexts/SearchContext";
import Search from "../Search/Search";

function Home() {
    const [movies, setMovies] = useState();
    const { query, genre } = useContext(SearchContext)

    useEffect(() => {
        if (query != '') {
            getMoviesByQuery(query)
                .then(x => {
                    setMovies(x.results)
                    // console.log(x);
                })
                .catch(x => console.log(x))
        } else {
            getTrendingMovies()
                .then(x => {
                    setMovies(x.results)
                    // console.log(x);
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

export default Home
