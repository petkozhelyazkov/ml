import { useContext, useState } from "react"
import "./MovieCard.css"

import {
    TERipple
} from "tw-elements-react";

import MovieModal from "./MovieModal";
import { MovieContext } from "../../contexts/MovieContext";

export default function MovieCard({ movie }) {
    const { updateMovie } = useContext(MovieContext)
    const [showModal, setShowModal] = useState();

    function setModal(x) {
        setShowModal(x)
    }

    function onModalOpen() {
        updateMovie(movie)
    }

    return (
        <>
            <div onClick={onModalOpen} className="block w-36 h-62 rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-900">
                <TERipple rippleColor="white">
                    <button
                        onClick={() => setShowModal(true)}
                        type="button"
                        className="block bg-transparent bg-cover bg-no-repeat overflow-hidden rounded-t-lg leading-normal 
                        transition duration-150 ease-in-out
                        hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
                        focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                        <img
                            className="rounded-t-lg w-full h-full"
                            src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                            alt="" />
                    </button>
                </TERipple>
                <div className="flex items-center p-1 pt-2 justify-center z-10">
                    <p className="text-center text-sm truncate leading-tight text-neutral-800 dark:text-neutral-50">
                        {movie.title}
                    </p>
                </div>
            </div>
            <MovieModal showModal={showModal} setModal={setModal} />
        </>
    )
}