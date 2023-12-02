import {
    TEDropdown,
    TEDropdownToggle,
    TEDropdownMenu,
    TEDropdownItem,
    TERipple,
} from "tw-elements-react";

export default function Comment({
    comment,
    currentUser,
    editComment,
    removeComment
}) {
    function onEdit() {
        editComment(comment)
    }

    function onRemove(e) {
        e.preventDefault();
        removeComment(comment)
    }

    return (
        <>
            <article className="p-6 text-base border-t border-gray-200 dark:border-gray-700 bg-white rounded-lg dark:bg-gray-900">
                <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                            <img
                                className="mr-2 w-6 h-6 rounded-full"
                                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                alt="Michael Gough" />{comment?.username}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400"><time pubdate='true' dateTime="2022-02-08"
                            title="February 8th, 2022">{comment?.date}</time></p>
                    </div>
                    {comment?.username == currentUser?.email &&
                        <TEDropdown className="flex justify-center">
                            <TERipple rippleColor="light">
                                <TEDropdownToggle className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                    <span>
                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                        </svg>
                                    </span>
                                </TEDropdownToggle>
                            </TERipple>
                            <TEDropdownMenu className="py-1 text-sm text-gray-700 dark:text-gray-200">
                                <TEDropdownItem>
                                    <a href="#commentSection" onClick={onEdit} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white0">
                                        Edit
                                    </a>
                                </TEDropdownItem>
                                <TEDropdownItem>
                                    <a href="" onClick={onRemove} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Remove
                                    </a>
                                </TEDropdownItem>
                            </TEDropdownMenu>
                        </TEDropdown>
                    }
                </footer>
                <p className="text-gray-500 dark:text-gray-400">{comment?.comment}</p>
            </article>
        </>
    )
}