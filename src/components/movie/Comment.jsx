export default function Comment({
    username,
    comment,
    date
}) {
    return (
        <>
            <article className="p-6 text-base border-t border-gray-200 dark:border-gray-700 bg-white rounded-lg dark:bg-gray-900">
                <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                            <img
                                className="mr-2 w-6 h-6 rounded-full"
                                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                alt="Michael Gough" />{username}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400"><time pubdate='true' dateTime="2022-02-08"
                            title="February 8th, 2022">{date}</time></p>
                    </div>
                </footer>
                <p className="text-gray-500 dark:text-gray-400">{comment}</p>
            </article>
        </>
    )
}