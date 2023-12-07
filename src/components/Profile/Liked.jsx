import { useContext, useEffect, useState } from "react"
import { getById } from "../../apis/tmdb/tmdb"
import Card from "./Card"
import { AuthContext } from "../../contexts/AuthContext"

export default function Liked({
    data
}) {
    const [movies, setMovies] = useState()
    const { user, updateUser } = useContext(AuthContext)

    useEffect(() => {
        Promise.all(data?.map(x => getById(x.id, x.mediaType))).then(x => {
            setMovies(x)
            console.log(x);
        })
    }, [data])

    return (
        <div className="flex flex-col gap-6">
            {movies?.map(x => <Card user={user} updateUser={updateUser} key={x.id} type='like' movie={x} />)}
        </div>
    )
}