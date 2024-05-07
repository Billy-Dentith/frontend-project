import { useEffect, useState } from "react";
import { getArticlesComments } from "../api";
import CommentCard from "./CommentCard";

const Comments = ({currentArticleId}) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getArticlesComments(currentArticleId).then((res) => {
            setComments(res.comments);
            setIsLoading(false);
        })
    }, [comments])

    if (isLoading) {
        return (
            <h2 id="loading">Loading...</h2>
        )
    }

    return (
        <>
            <h2>Comments</h2>
            <ul className="comments-list">
            {comments.map((comment) => {
                return (
                    <li key={comment.comment_id}>
                        <CommentCard>
                            <p>{comment.body}</p>
                            <div id="comment-bottom">
                                <p>{comment.author}</p>
                                <p>{comment.votes}</p>
                                <p>{comment.created_at.replace('T', ' ').substring(0, 16)}</p>
                            </div>
                        </CommentCard>
                    </li>
                )
            })}
            </ul>
        </>
    )
}

export default Comments; 