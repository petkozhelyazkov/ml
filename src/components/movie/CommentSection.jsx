import { useContext, useEffect, useRef, useState } from "react";
import Comment from "./Comment";
import * as commentService from "../../apis/firebase/commentService";
import { AuthContext } from "../../contexts/AuthContext";
import { AlertContext, alertType } from "../../contexts/AlertContext";
import uuid from "react-uuid";

export default function CommentSection({
    movieId
}) {
    const [comments, setComments] = useState([])
    const [editComment, setEditComment] = useState()
    const teRef = useRef()
    const { user } = useContext(AuthContext)
    const { showAlert } = useContext(AlertContext)

    useEffect(() => {
        commentService.get(movieId)
            .then(x => {
                setComments(x?.comments || [])
            })
            .catch(x => showAlert('Could not get comments!', alertType.error))
    }, [])

    function onEdit(comment) {
        teRef.current.value = comment.comment
        setEditComment(comment)
    }

    function onRemove(comment) {
        commentService.remove(movieId, comment)
            .then(x => {
                let newComments = comments.filter(x => x.id != comment.id)
                setComments(newComments);
            })
            .catch(x => showAlert('Something went wrong!', alertType.error))
    }

    function onSubmit(e) {
        e.preventDefault()
        let { comment } = Object.fromEntries(new FormData(e.target).entries());

        let date = new Date().toDateString();
        let formattedDate = date.slice(date.indexOf(' ') + 1).replaceAll(' ', '. ')

        if (editComment?.id) {
            commentService.edit(movieId, { ...editComment, comment })
                .then(x => {
                    let temp = comments.find(x => x.id == editComment.id)
                    temp.comment = comment
                    setEditComment({})
                    teRef.current.value = ''
                })
                .catch(x => showAlert('Something went wrong!', alertType.error))

            return;
        }

        if (user?.email) {
            let newComment = {
                comment,
                user: {
                    id: user.uid,
                    email: user.email,
                    displayName: user.displayName ? user.displayName : '',
                    imgUrl: user.imgUrl ? user.imgUrl : '',
                },
                date: formattedDate,
                id: uuid()
            }

            commentService.add(movieId, newComment)
                .then(x => {
                    if (comments?.length > 0) setComments(x => ([...x, newComment]))
                    else setComments(x => [newComment])
                })
                .catch(x => showAlert('Something went wrong!', alertType.error))
        } else {
            showAlert('You have to be logged in to leave a comment!', alertType.error)
        }

        teRef.current.value = ''
    }

    return (
        <>
            <section id='commentSection' className="bg-white w-2/3 rounded-xl dark:bg-gray-900 py-8 lg:py-16 antialiased">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion ({comments?.length})</h2>
                    </div>
                    <form onSubmit={onSubmit} className="mb-6">
                        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <label htmlFor="comment" className="sr-only">Your comment</label>
                            <textarea ref={teRef} name="comment" id="comment" rows="6"
                                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                placeholder="Write a comment..." required></textarea>
                        </div>
                        <button type="submit"
                            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            Post comment
                        </button>
                    </form>
                    {comments.length == 0
                        ? <span className="text-gray-500 text-xl inline-block w-full text-center">No comments yet!</span>
                        : comments?.map(x => <Comment key={x.id} removeComment={onRemove} editComment={onEdit} movieId={movieId} comment={x} currentUser={user} />)}
                </div>
            </section>
        </>
    )
}