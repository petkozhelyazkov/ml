import { useContext, useEffect, useState } from "react"
import * as tmdb from "../../apis/tmdb/tmdb";
import MovieCard from "../movie/MovieCard";
import { SearchContext } from "../../contexts/SearchContext";
import Search from "../Search/Search";
import { useLocation } from "react-router-dom";
import MovieModal from "../movie/MovieModal";
import { AuthContext } from "../../contexts/AuthContext";

export default function Home() {
    const [movies, setMovies] = useState();
    const [showModal, setShowModal] = useState();
    const { query, genre, mediaType } = useContext(SearchContext)
    const location = useLocation();

    useEffect(() => {
        if (query != '') {
            tmdb.getByQuery(query, mediaType)
                .then(x => {
                    setMovies(x.results)
                })
                .catch(x => console.log(x))
        } else {
            let path = location.pathname
            let temp = path == '/' ? 'trending' : path.slice(path.lastIndexOf('/') + 1)
            let tempMediaType = path.slice(1, path.lastIndexOf('/'))

            tmdb.getByType(temp, mediaType || tempMediaType)
                .then(x => {
                    setMovies(x.results)
                })
                .catch(x => console.log(x))
        }
    }, [query, location])

    useEffect(() => {
        tmdb.getByGenre(genre, mediaType)
            .then(x => {
                setMovies(x.results)
            })
            .catch(x => console.log(x))
    }, [genre])

    const setModal = (x) => setShowModal(x)

    return (
        <>
            <Search mediaType={mediaType} />
            <main className="ml-16 flex justify-center dark:bg-gray-800">
                <div className="flex flex-col mt-8">
                    <div className="flex justify-center font-bold text-3xl dark:text-neutral-50">
                        {
                            location.pathname == '/'
                                ? 'Movies'
                                : location.pathname.slice(1, location.pathname.lastIndexOf('/')).charAt(0).toUpperCase()
                                + location.pathname.slice(1, location.pathname.lastIndexOf('/')).slice(1)}
                    </div>
                    <div className="grid grid-cols-8 gap-6 pt-8">
                        {movies?.map(x => <MovieCard setModal={setModal} key={x.id} movie={x} mediaType={mediaType} />)}
                    </div>
                </div>
            </main>
            <MovieModal showModal={showModal} setModal={setModal} />
        </>
    )
}
