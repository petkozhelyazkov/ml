import { useContext, useEffect } from "react"
import { ModalContext } from "../../contexts/ModalContext";
import { Link } from "react-router-dom";
import './MovieModal.css'

import {
    TEModal,
    TEModalDialog
} from "tw-elements-react";

export default function MovieModal({
    showModal,
    setModal,
    mediaType
}) {
    const { movie } = useContext(ModalContext)

    function hideModal() {
        setModal(false)
    }

    return (
        <TEModal className="scroll" show={showModal} setShow={setModal}>
            <TEModalDialog>
                <div
                    className="scroll pointer-events-auto relative w-3/4 translate-y-[-50px] translate-x-[50px]">
                    <div className='flex items-center justify-center h-screen bg-transparent'>
                        <div className='mx-auto bg-white rounded-xl shadow-xl'>
                            <div className="grid max-w-sm shadow-sm flex-col">
                                <img
                                    className="rounded-t-xl w-full h-80 justify-center grid object-cover"
                                    src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`} />
                                <div className="group p-6 grid bg-gray-900 z-10">
                                    <a className="text-gray-400 font-bold sm:text-2xl line-clamp-2">
                                        {movie?.title || movie?.name}
                                    </a>
                                    <span className="text-gray-400 pt-2 font-semibold">
                                        {(movie?.release_date || movie?.first_air_date)?.substring(0, 4)}
                                    </span>
                                    <div className="h-28">
                                        <span className="line-clamp-4 py-2 text-gray-400 font-light bg-gray-900 leading-relaxed">
                                            {movie?.overview}
                                        </span>
                                    </div>
                                    <div className="grid-cols-2 flex items-center group justify-between">
                                        <div className="font-black flex flex-col">
                                            <span className="text-yellow-500 text-xl">IMDB SCORE</span>
                                            <span className="text-3xl flex gap-x-1 items-center text-gray-400">
                                                {movie?.vote_average.toFixed(1)}
                                            </span>
                                        </div>
                                        <div>
                                            <Link onClick={hideModal} type="button" to={`/${movie?.mediaType == 'shows' ? 'show' : 'movie'}/${movie?.id}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                More</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </TEModalDialog>
        </TEModal>
    )
}

