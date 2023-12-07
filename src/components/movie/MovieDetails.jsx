import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getById, getCredits } from "../../apis/tmdb/tmdb";
import './MovieDetails.css'
import MovieModal from "./MovieModal";
import Cast from "./Cast";
import Chip from "../search/Chip";
import CommentSection from "./CommentSection";
import { AuthContext } from "../../contexts/AuthContext";
import { favorite, like } from "../../apis/firebase/userService";

export default function MovieDetails() {
    const location = useLocation();
    const { id } = useParams();
    const [movie, setMovie] = useState();
    const [credits, setCredits] = useState();
    const [mediaType, setMediaType] = useState();
    const { user, updateUser } = useContext(AuthContext)

    useEffect(() => {
        let temp = location.pathname.slice('1', location.pathname.lastIndexOf('/'))
        setMediaType(temp)

        getById(id, temp)
            .then(x => {
                console.log(x);
                setMovie(x)
            })
        getCredits(id, temp)
            .then(x => {
                setCredits(x)
                console.log(x);
            })
    }, [])

    function onLike() {
        if (!user?.liked?.some(x => x.id == id)) {
            console.log('liked')
            let temp = { id, mediaType }
            like(user.uid, temp)
            updateUser(user.liked ? { liked: [...user.liked, temp] } : { liked: [temp] })
        }
    }

    function onFavorite() {
        if (!user?.favorite?.some(x => x.id == id)) {
            console.log('favorite');
            let temp = { id, mediaType }
            favorite(user.uid, temp)
            updateUser(user.favorite ? { favorite: [...user.favorite, temp] } : { favorite: [temp] })
        }
    }

    return (
        <>
            <main className="">
                <div className="dark:bg-gray-800 mb-52 h-full flex flex-col py-10 items-center ml-16">
                    <div className='relative w-4/5 h-[82vh] flex justify-center'>
                        <h1 className='text-white absolute bottom-0 p-10 text-2xl md:text-6xl font-bold text-center'>{movie?.title || movie?.name}</h1>
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
                    <button onClick={onLike} className=" bg-slate-400">Like</button>
                    <button onClick={onFavorite} className=" bg-slate-400">favorite</button>
                </div>
                <MovieModal />
            </main>
        </>
    )
}