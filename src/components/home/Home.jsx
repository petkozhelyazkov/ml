import { useEffect, useState } from "react"
import { getTrendingMovies } from "../../apis/tmdb/tmdb";
import MovieCard from "../movie/MovieCard";

function Home() {
    const [movies, setMovies] = useState();

    useEffect(() => {
        getTrendingMovies()
            .then(x => {
                setMovies(x.results)
                console.log(x);
            })
            .catch(x => console.log(x))

    }, [])
    return (
        <>
            <main className="ml-20 bg-slate-600">
                <div className="grid grid-cols-8 gap-1">
                    {movies?.map(x => <MovieCard key={x.id} movie={x} />)}
                </div>
            </main>
        </>
    )
}

export default Home
