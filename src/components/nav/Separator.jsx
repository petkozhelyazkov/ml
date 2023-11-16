export default function Separator({
    children
}) {
    return (
        <div className="flex flex-col items-center mt-3 border-t border-gray-700">
            {children}
        </div>
    )
}