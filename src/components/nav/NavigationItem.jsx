export default function NavigationItem({
    children
}) {
    return (
        <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:text-gray-300" href="#">
            {children}
        </a>
    )
}