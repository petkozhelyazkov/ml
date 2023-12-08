import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { getById } from "../../apis/tmdb/tmdb"

const Card = lazy(() => import('./Card'))
const Spinner = lazy(() => import('../Spinner'))

export default function MovieList({
    data,
    type
}) {
    const { user, updateUser } = useContext(AuthContext)
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all(data?.map(x => getById(x.id, x.mediaType)))
            .then(y => {
                y.forEach(z => {
                    z.mediaType = data.find(x => x.id == z.id).mediaType
                })

                setMovies(y)
                setLoading(false)
            })
            .catch(x => showAlert('Something went wrong!', alertType.error))
    }, [data])

    return (
        <div className="flex flex-col gap-6">
            {loading
                ? <Spinner />
                : movies.length == 0 ? <span className=" text-gray-500">{type == 'like' ? 'You have not liked anything yet!' : 'You have not favorited anything yet!'}</span>
                    : movies?.map(x => <Card user={user} updateUser={updateUser} key={x.id} type={type} movie={x} />)
            }

        </div>
    )
}