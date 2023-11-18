import './Search.css'
import Chip from './Chip'
import { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../../contexts/SearchContext'

const genres = [
    { "id": 28, "genre": "Action" },
    { "id": 12, "genre": "Adventure" },
    { "id": 35, "genre": "Comedy" },
    { "id": 80, "genre": "Crime" },
    { "id": 99, "genre": "Documentary" },
    { "id": 18, "genre": "Drama" },
    { "id": 14, "genre": "Fantasy" },
    { "id": 36, "genre": "History" },
    { "id": 27, "genre": "Horror" },
    { "id": 9648, "genre": "Mystery" },
    { "id": 10749, "genre": "Romance" },
    { "id": 878, "genre": "Science Fiction" },
    { "id": 53, "genre": "Thriller" },
    { "id": 10752, "genre": "War" },
]

export default function Search() {
    const { updateCriteria } = useContext(SearchContext)
    const [query, setQuery] = useState('')

    useEffect(() => {
        const debounce = setTimeout(() => {
            updateCriteria({ query: query })
        }, 2000)

        return () => clearTimeout(debounce)
    }, [query])

    function onChange(e) {
        setQuery(e.target.value)
    }

    return (
        <div className='gradient w-full h-48 flex flex-col justify-center items-center'>
            <div className="mb-3 w-1/3">
                <input
                    onChange={onChange}
                    type="search"
                    className="relative m-0 block w-full
                            bg-gray-700 text-white min-w-0
                            flex-auto rounded border border-solid
                            first-letter: border-neutral-300 bg-clip-padding 
                            px-3 py-[0.25rem] text-base font-normal
                            leading-[1.6] outline-none transition
                            duration-200 ease-in-out focus:z-[3]
                            focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)]
                            focus:outline-none dark:border-neutral-600
                            dark:text-neutral-200 dark:placeholder:text-neutral-200"
                    placeholder="Search" />
            </div>
            <div className='w-1/2 flex flex-wrap justify-center px-2'>
                {genres.map(x => <Chip updateCriteria={updateCriteria} key={x.id} {...x} />)}
            </div>

        </div>
    )
}