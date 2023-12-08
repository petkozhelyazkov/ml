export default function Spinner({
    className
}) {
    return (
        <div className={"text-gray-500 mt-10 " + className}>
            <div
                className="text-center h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
            >
            </div>
        </div>
    )
}