import { Link } from 'react-router-dom'
import { removeLike, removeFavorite } from '../../apis/firebase/userService'
import { TERipple } from 'tw-elements-react'
import { useState } from 'react'

export default function Card({
    movie,
    user,
    type,
    updateUser
}) {
    function onRemove() {
        if (type == 'like') {
            removeLike(user.uid, movie.id)

            let newLiked = user.liked.filter(x => x.id != movie.id)
            updateUser({ liked: newLiked })
        } else if (type == 'favorite') {
            removeFavorite(user.uid, movie.id)

            let newFavorite = user?.favorite?.filter(x => x.id != movie.id)
            updateUser({ favorite: newFavorite })
        }
    }

    return (
        <>
            <div
                className="flex flex-col items-center h-36 rounded-lg w-[1020px] dark:bg-gray-900 md:flex-row">
                <img
                    className="h-full rounded-t-lg object-cover md:w-48 md:rounded-none md:rounded-l-lg"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt="" />
                <div className="flex w-full flex-col justify-start p-1 pl-4 pr-4">
                    <h5
                        className="mb-2 text-xl flex flex-row font-medium text-neutral-800 dark:text-neutral-50">
                        {movie.title || movie.name}
                        <p className="mt-2 ml-3 text-xs text-neutral-500 dark:text-neutral-300">
                            ({(movie.release_date || movie.first_air_date)?.slice(0, 4)})
                        </p>
                    </h5>
                    <p className="mb-4 w-full text-base text-neutral-600 dark:text-neutral-200">
                        {movie?.overview?.length > 95 ? movie.overview.slice(0, 95) + '...' : movie.overview}
                    </p>
                    <div className='flex flex-row justify-between pt-3 w-full border-t-2 border-gray-700'>
                        <div className="font-black flex gap-7">
                            <div className='flex'>
                                <span className="text-yellow-500 text-xl mt-1">IMDB: </span>
                                <span className="text-3xl flex gap-x-1 items-center text-gray-400">
                                    {movie?.vote_average?.toFixed(1)}
                                </span>
                            </div>
                            {(movie.runtime || movie.episode_run_time[0]) &&
                                <span className='text-gray-500 mt-1 font-light'>Duration: {movie?.runtime || movie?.episode_run_time[0]} min.</span>
                            }
                        </div>
                        <div className='flex gap-x-4'>
                            <Link className='text-gray-500 hover:text-gray-400' to={`/movie/${movie.id}`}>{'Details >'} </Link>
                        </div>
                    </div>
                </div>
                <div className=' h-[90%] border-l-2 border-gray-700 flex items-center justify-center'>
                    <TERipple>
                        <button onClick={onRemove} className=" text-gray-500 w-1/3 text-2xl px-5 py-2.5 text-center hover:text-gray-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className=" h-12 w-12"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </TERipple>
                </div>
            </div>
        </>
    )
}