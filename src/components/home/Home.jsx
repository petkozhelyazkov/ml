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
import getMediaType from "../../utils/getMediaType";

export default function Home() {
    const [mediaTypeDisplay, setMediaTypeDisplay] = useState()
    const [movies, setMovies] = useState([]);
    const [showModal, setShowModal] = useState();
    const [loading, setLoading] = useState(true);
    const { query, genre, updateMediaType, page, updatePage } = useContext(SearchContext)
    const location = useLocation();

    useEffect(() => {
        updatePage(1)
        setMovies([])
        setLoading(true)

        let mt = getMediaType(location.pathname)

        setMediaTypeDisplay(mt)
        updateMediaType(mt || 'Movies')
    }, [location, query])

    useEffect(() => {
        let path = location.pathname
        let temp = (path == '/' || path == '/movies' || path == '/shows') ? 'trending' : path.slice(path.lastIndexOf('/') + 1)
        let mediaType = getMediaType(path).toLowerCase()

        if (query != '') {
            tmdb.getByQuery(query, mediaType, page)
                .then(x => {
                    setMovies(y => y.concat(x.results.filter(x => x.overview && x.vote_average && x.poster_path)))
                    setLoading(false);
                    console.log(x);
                })
                .catch(x => console.log(x))
        } else if (location.pathname.includes('genre')) {
            tmdb.getByGenre(genre, mediaType, page)
                .then(x => {
                    setMovies(y => y.concat(x.results.filter(x => x.overview && x.vote_average && x.poster_path)))
                    setLoading(false)
                })
                .catch(x => console.log(x))
        }
        else {

            tmdb.getByType(temp, mediaType, page)
                .then(x => {
                    setMovies(y => y.concat(x.results.filter(x => x.overview && x.vote_average && x.poster_path)))
                    setLoading(false)
                })
                .catch(x => console.log(x))
        }
    }, [location, query, page])

    const setModal = (x) => setShowModal(x)

    return (
        <>
            <Search />
            <main className="flex justify-center ml-14 dark:bg-gray-800">
                <div className="flex flex-col mt-8">
                    <div className="flex justify-center font-bold text-3xl text-gray-300">
                        {mediaTypeDisplay}
                    </div>
                    {(movies.length == 0 && !loading) &&
                        <div className=" mt-32 font-bold text-3xl text-gray-500">No matches found!</div>
                    }
                    {loading &&
                        <div className="flex justify-center mt-32">
                            <Spinner />
                        </div>
                    }
                    <div className="flex items-center">
                        <InfiniteScroll
                            className="flex flex-wrap justify-center px-16 pt-10"
                            dataLength={movies?.length}
                            next={() => { updatePage(page + 1) }}
                            hasMore={page < 50}
                            scrollThreshol={0.9}
                        >
                            {movies?.map((x, i) => <MovieCard setModal={setModal} mediaType={mediaTypeDisplay.toLowerCase()} key={i} movie={x} />)}
                        </InfiniteScroll>
                        <ScrollToTop />
                    </div>
                </div>
            </main>
            <MovieModal showModal={showModal} setModal={setModal} />
        </>
    )
}
