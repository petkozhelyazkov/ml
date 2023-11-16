export default function NavigationUser({
    children
}) {
    return (
        <a className="flex items-center justify-center w-full h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300" href="#">
            {children}
        </a>
    )
}