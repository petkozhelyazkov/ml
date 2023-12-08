import './Search.css'
import { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../../contexts/SearchContext'
import { movieGenres, tvGenres } from '../../utils/genres'
import Chip from './Chip'

export default function Search() {
    const { updateQuery, updateGenre, mediaType } = useContext(SearchContext)
    const [query, setQuery] = useState('')

    useEffect(() => {
        const debounce = setTimeout(() => {
            updateQuery(query)
        }, 1000)

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
                {
                    mediaType == 'Movies'
                        ? movieGenres.map(x => <Chip updateGenre={updateGenre} key={x.id} {...x} />)
                        : tvGenres.map(x => <Chip updateGenre={updateGenre} key={x.id} {...x} />)
                }
            </div>

        </div>
    )
}