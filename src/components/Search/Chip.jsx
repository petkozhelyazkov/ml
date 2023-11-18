import { TERipple } from "tw-elements-react"

export default function Chip({
    genre,
    id,
    updateCriteria
}) {
    function onClick() {
        updateCriteria({ genre: id })
    }

    return (
        <div
            onClick={onClick}
            className="
            [word-wrap: break-word]
            my-[5px] mr-4 flex h-10
            cursor-pointer items-center
            justify-between rounded-3xl
            bg-[#eceff1] px-[12px]
            py-0 text-[13px] font-bold normal-case
            leading-loose text-[#4f4f4f]
            shadow-none transition-[opacity]
            duration-300 ease-linear hover:!shadow-none
            dark:bg-gray-900
            dark:text-neutral-200 active:bg-slate-800">
            <TERipple color='white'>
                <span> {genre}</span>
            </TERipple>
        </div>
    )
}