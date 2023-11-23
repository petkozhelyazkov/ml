export default function Separator({
    children,
    label
}) {
    return (
        <div className="flex flex-col items-center mt-3 border-t border-gray-700">
            {label && <span className="mb-[-15px] mt-1 text-xs">{label}</span>}
            <div className="flex flex-col items-center">
                {children}
            </div>
        </div>
    )
}