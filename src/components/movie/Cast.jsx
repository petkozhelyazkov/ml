import './Cast.css'

export default function Cast({ cast }) {
    return (
        <>
            <h1 className="text-3xl text-gray-300 w-4/5 rounded-t-xl bg-gray-900 font-semibold text-center p-5 mt-6">Cast</h1>
            <div className='px-4 w-4/5 bg-gray-900 mb-10 flex items-center rounded-b-xl'>
                <div className='scrollbar rounded-b-xl flex flex-row bg-gray-900 w-full items-center mb-10 overflow-x-scroll gap-4 pb-2'>
                    {cast?.length > 0
                        ? cast?.map(x =>
                            x.profile_path &&
                            <div key={x.credit_id} className='flex mb-5 relative min-w-[7rem] md:min-w-[8rem] max-w-[7rem] md:max-w-[8rem] h-full items-center text-center flex-col mx-1'>
                                <img className="rounded-xl" src={`https://image.tmdb.org/t/p/w500/${x.profile_path}`} alt="" />
                                <p className="absolute top-0 p-2 text-xs text-white font-semibold text-center">{x.name}</p>
                                <p className="absolute bottom-0 p-2 text-xs text-white font-semibold text-center">({x.character})</p>
                            </div>
                        )
                        : <span className='text-xl text-gray-400'>Could not find information about cast.</span>
                    }
                </div>
            </div>
        </>
    )
}