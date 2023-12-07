import './Cast.css'

export default function Cast({ cast }) {
    return (
        <>
            <h1 className="text-3xl text-white font-semibold text-center p-2">Cast</h1>
            <div className='scrollbar flex flex-row w-4/5 items-center justify-center overflow-x-scroll gap-4 pb-2'>
                {cast?.map(x =>
                    x.profile_path &&
                    <div key={x.credit_id} className='flex relative min-w-[7rem] md:min-w-[8rem] max-w-[7rem] md:max-w-[8rem] h-full items-center text-center flex-col mx-1'>
                        <img className="rounded-xl" src={`https://image.tmdb.org/t/p/w500/${x.profile_path}`} alt="" />
                        <p className="absolute top-0 p-2 text-xs text-white font-semibold text-center">{x.name}</p>
                        <p className="absolute bottom-0 p-2 text-xs text-white font-semibold text-center">({x.character})</p>
                    </div>
                )}
            </div>
        </>
    )
}