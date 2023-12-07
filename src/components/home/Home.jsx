import { useContext, useEffect, useState } from "react"
import * as tmdb from "../../apis/tmdb/tmdb";
import MovieCard from "../movie/MovieCard";
import { SearchContext } from "../../contexts/SearchContext";
import Search from "../search/Search";
import { useLocation } from "react-router-dom";
import MovieModal from "../movie/MovieModal";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../Spinner";
import ScrollToTop from "../ScrollToTop";

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [showModal, setShowModal] = useState();
    const { query, genre, mediaType, page, updatePage } = useContext(SearchContext)
    const location = useLocation();

    useEffect(() => {
        updatePage(1)
        setMovies([])
    }, [location, query])

    useEffect(() => {
        if (query != '') {
            tmdb.getByQuery(query, mediaType, page)
                .then(x => {
                    console.log(x);
                    setMovies(y => y.concat(x.results))
                })
                .catch(x => console.log(x))
        } else {
            let path = location.pathname
            let temp = path == '/' ? 'trending' : path.slice(path.lastIndexOf('/') + 1)
            let tempMediaType = path.slice(1, path.lastIndexOf('/'))

            console.log(page);

            tmdb.getByType(temp, mediaType || tempMediaType, page)
                .then(x => {
                    console.log(x);
                    setMovies(y => y.concat(x.results))
                })
                .catch(x => console.log(x))
        }
    }, [query, location, page])

    useEffect(() => {
        tmdb.getByGenre(genre, mediaType, page)
            .then(x => {
                setMovies(y => y.concat(x.results))
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
                    <div>
                        <InfiniteScroll
                            className="grid grid-cols-8 gap-6 pt-8 overflow-hidden"
                            dataLength={movies?.length}
                            next={() => { updatePage(page + 1) }}
                            hasMore={page < 50}
                            scrollThreshol={0.9}
                        >

                            {movies?.map((x, i) => <MovieCard setModal={setModal} key={i} movie={x} mediaType={mediaType} />)}
                        </InfiniteScroll>
                        <ScrollToTop />
                    </div>
                </div>
            </main>
            <MovieModal showModal={showModal} setModal={setModal} />
        </>
    )
}
