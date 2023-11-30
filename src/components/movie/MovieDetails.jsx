import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById, getMovieCredits } from "../../apis/tmdb/tmdb";
import './MovieDetails.css'
import MovieModal from "./MovieModal";
import Cast from "./Cast";
import Chip from "../Search/Chip";
import CommentSection from "./CommentSection";

export default function MovieDetails() {
    var { id } = useParams();
    const [movie, setMovie] = useState();
    const [credits, setCredits] = useState();

    useEffect(() => {
        getMovieById(id)
            .then(x => {
                setMovie(x)
                // console.log(x);
            })
        getMovieCredits(id)
            .then(x => {
                setCredits(x)
                // console.log(x);
            })
    }, [])

    return (
        <>
            <main className="">
                <div className="dark:bg-gray-800 mb-52 h-full flex flex-col py-10 items-center ml-16">
                    <div className='relative w-4/5 h-[82vh] flex justify-center'>
                        <h1 className='text-white absolute bottom-0 p-10 text-2xl md:text-6xl font-bold text-center'>{movie?.title}</h1>
                        <img className='h-full w-full' src={"https://image.tmdb.org/t/p/original/" + movie?.backdrop_path} />
                    </div>
                    <div className="mt-8 w-4/5 text-white text-xl">
                        <p>{movie?.overview}</p>
                    </div>
                    <div className="flex flex-row">
                        {movie?.genres.map((x, i) =>
                            <Chip key={i} genre={x.name} />
                        )}
                    </div>
                    <Cast cast={credits?.cast} />
                    <CommentSection movieId={id} />
                </div>
                <MovieModal />
            </main>
        </>
    )
}