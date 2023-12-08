import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getById, getCredits } from "../../apis/tmdb/tmdb";
import './MovieDetails.css'
import MovieModal from "./MovieModal";
import Cast from "./Cast";
import Chip from "../search/Chip";
import CommentSection from "./CommentSection";
import { AuthContext } from "../../contexts/AuthContext";
import { favorite, like, removeFavorite, removeLike } from "../../apis/firebase/userService";
import getMediaType from "../../utils/getMediaType";
import { AlertContext, alertType } from "../../contexts/AlertContext";
import Spinner from "../Spinner";

export default function MovieDetails() {
    const location = useLocation();
    const { id } = useParams();
    const [movie, setMovie] = useState();
    const [imgLoading, setImgLoading] = useState(true)
    const [isLiked, setIsLiked] = useState(false)
    const { showAlert } = useContext(AlertContext)
    const [isFavorite, setIsFavorite] = useState(false)
    const [cast, setCast] = useState();
    const [mediaType, setMediaType] = useState();
    const { user, updateUser } = useContext(AuthContext)

    useEffect(() => {
        if (user) {
            if (user?.liked?.some(x => x.id == id)) {
                setIsLiked(true)
            }
            if (user?.favorite?.some(x => x.id == id)) {
                setIsFavorite(true)
            }
        }
    }, [user])

    useEffect(() => {
        document.documentElement.style.scrollBehavior = "unset";
        document.documentElement.scrollTop = 0;

        let tempMediaType = getMediaType(location.pathname).toLowerCase()
        setMediaType(tempMediaType)

        getById(id, tempMediaType)
            .then(x => {
                setMovie(x)
            })
            .catch(x => showAlert('Something went wrong!', alertType.error))
        getCredits(id, tempMediaType)
            .then(x => {
                setCast(x.cast)
            })
            .catch(x => showAlert('Something went wrong!', alertType.error))
    }, [])

    function onLike() {
        if (!user) {
            showAlert('Tou have to be logged in to like!', alertType.error)
            return
        }

        if (!user?.liked?.some(x => x.id == id)) {
            let temp = { id, mediaType }
            like(user.uid, temp)
                .then(x => {
                    updateUser(user.liked ? { liked: [...user.liked, temp] } : { liked: [temp] })
                })
                .catch(x => showAlert('Something went wrong!', alertType.error))

        } else {
            removeLike(user.uid, movie.id)
                .then(x => {
                    let newLiked = user.liked.filter(x => x.id != movie.id)
                    updateUser({ liked: newLiked })
                    setIsLiked(false)
                })
                .catch(x => showAlert('Something went wrong!', alertType.error))
        }
    }

    function onFavorite() {
        if (!user) {
            showAlert('Tou have to be logged in to favorite!', alertType.error)
            return
        }

        if (!user?.favorite?.some(x => x.id == id)) {
            let temp = { id, mediaType }
            favorite(user.uid, temp)
                .then(x => {
                    updateUser(user.favorite ? { favorite: [...user.favorite, temp] } : { favorite: [temp] })
                })
                .catch(x => showAlert('Something went wrong!', alertType.error))

        } else {
            removeFavorite(user.uid, movie.id)
                .then(x => {
                    let newFavorite = user.favorite.filter(x => x.id != movie.id)
                    updateUser({ favorite: newFavorite })
                    setIsFavorite(false)
                })
                .catch(x => showAlert('Something went wrong!', alertType.error))
        }
    }

    return (
        <>
            <main className="">
                <div className="dark:bg-gray-800 mb-20 h-full flex flex-col py-6 items-center ml-16">
                    <div className='relative w-4/5 h-[82vh] flex justify-center'>
                        <h1 className='text-gray-300 absolute bottom-0 p-10 text-2xl md:text-6xl font-bold text-center'>{movie?.title || movie?.name}</h1>
                        {imgLoading && <Spinner className='absolute top-[30vh]' />}
                        <img onLoad={() => setImgLoading(false)} className='h-full w-full rounded-t-xl' src={"https://image.tmdb.org/t/p/original/" + movie?.backdrop_path} />
                        <div className="flex absolute gap-6 top-5 right-5">
                            <button onClick={onLike} className="">
                                <span className="text-red-500 [&>svg]:h-11 [&>svg]:w-11">
                                    <svg
                                        className={isLiked ? 'fill-red-500' : ''}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                </span>
                            </button>
                            <button onClick={onFavorite} className="">
                                <span className="text-yellow-400 [&>svg]:h-11 [&>svg]:w-11">
                                    <svg
                                        className={isFavorite ? 'fill-yellow-400' : ''}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="bg-gray-900 w-4/5 flex flex-col rounded-b-xl mb-6 divide-y-[1px] divide-gray-600 px-6">
                        <div className="mt-8 text-gray-300 text-center text-xl">
                            <p>{movie?.overview}</p>
                        </div>
                        <div className="flex flex-row justify-evenly w-full mt-10 pt-8 mb-10">
                            <div className="flex flex-col text-gray-300">
                                <span className="w-2/3 mb-2">Production: {
                                    movie?.production_companies
                                        ? movie?.production_companies?.map(({ name }) => name).join(', ')
                                        : 'N/A'
                                }
                                </span>
                                <span>
                                    Release date: {
                                        mediaType == 'movie'
                                            ? movie?.release_date
                                            : movie?.first_air_date
                                    }
                                </span>
                            </div>
                            <div className="font-black flex w-1/3 text-center flex-col">
                                <span className="text-yellow-500 text-center text-xl">IMDB SCORE ({movie?.vote_count})</span>
                                <span className="text-3xl gap-x-1 text-center text-gray-400">
                                    {movie?.vote_average.toFixed(1)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        {movie?.genres.map((x, i) =>
                            <Chip key={i} label={x.name} />
                        )}
                    </div>
                    <Cast cast={cast} />
                    <CommentSection movieId={id} />
                </div>
                <MovieModal />
            </main>
        </>
    )
}