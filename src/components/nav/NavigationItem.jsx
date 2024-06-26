import { Link } from "react-router-dom";

export default function NavigationItem({
    children,
    to,
    label,
    onClick
}) {
    return (
        <>
            <Link onClick={onClick} to={to} className="flex items-center truncate w-full h-12 px-3 mt-2 rounded hover:text-gray-300" href="#">
                {children}
                {label && <span className="ml-2 mt-1 text-sm">{label}</span>}
            </Link>
        </>
    )
}