import { useContext, useEffect, useState } from "react";
import Comment from "./Comment";
import * as commentService from "../../apis/firebase/commentService";
import { AuthContext } from "../../contexts/AuthContext";

export default function CommentSection({
    movieId
}) {
    const [comments, setComments] = useState([])
    const { user } = useContext(AuthContext)

    useEffect(() => {
        commentService.getAll(movieId)
            .then(x => {
                console.log(x.comments);
                setComments(x.comments)
            })
    }, [])

    function onSubmit(e) {
        e.preventDefault()
        let { comment } = Object.fromEntries(new FormData(e.target).entries());

        let date = new Date().toDateString();
        let formattedDate = date.slice(date.indexOf(' ') + 1).replaceAll(' ', '. ')

        if (user.email) {
            setComments(x => ([...x, { comment, username: user.email, date: formattedDate }]))
            commentService.add(movieId, {
                comment,
                username: user.email,
                date: formattedDate
            });
        }
    }

    return (
        <>
            <section className="bg-white w-2/3 dark:bg-gray-900 py-8 lg:py-16 antialiased">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion ({comments?.length})</h2>
                    </div>
                    <form onSubmit={onSubmit} className="mb-6">
                        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <label htmlFor="comment" className="sr-only">Your comment</label>
                            <textarea name="comment" id="comment" rows="6"
                                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                placeholder="Write a comment..." required></textarea>
                        </div>
                        <button type="submit"
                            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            Post comment
                        </button>
                    </form>
                    {comments?.map((x, i) => <Comment key={i} date={x.date} comment={x.comment} username={x.username} />)}
                </div>
            </section>
        </>
    )
}