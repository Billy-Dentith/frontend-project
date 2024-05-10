import { useEffect, useState } from "react";
import { getArticlesComments, patchCommentVote } from "../api";
import CommentCard from "./CommentCard";
import PostCommentForm from "./PostCommentForm";
import DeleteComment from "./DeleteComment";

const Comments = ({currentArticleId}) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false); 
    const [isPostCommentShowing, setIsPostCommentShowing] = useState(false);
    const [votedComments, setVotedComments] = useState({})
    const [error, setError] = useState('')
    const [refreshPage, setRefreshPage] = useState(false); 

    useEffect(() => {
        getArticlesComments(currentArticleId).then((res) => {
            setComments(res.comments);
            setIsLoading(false);
        })
        .catch((err) => {
            setIsError(true);
        })
        setRefreshPage(false);
    }, [refreshPage])

    const handlePostCommentClick = () => {
        setIsPostCommentShowing((isPostCommentShowing) => !isPostCommentShowing)
    }

    const handleVote = (commentId, vote) => {
        const previousVote = votedComments[commentId] || 0;
        let newVote;
        if (previousVote === vote) {
            newVote = 0; 
        } else if (previousVote === 0) {
            newVote = vote; 
        } else {
            newVote = 0;
        }
        patchCommentVote(commentId, vote).then(() => {
            setComments((currComments) => {
                return currComments.map((comment) => {
                    if (comment.comment_id === commentId) {
                        return {...comment, votes: comment.votes - previousVote + newVote}
                    } 
                    return comment
                })
            })
            setVotedComments({
                ...votedComments, 
                [commentId]: newVote
            })
        }).catch((err) => {
            setError('Unable to process vote. Please try again later.')
        })
    }

    const isVoteDisabled = (commentId, vote) => {
        const previousVote = votedComments[commentId] || 0;
        return previousVote === vote;    
    }

    if (isError) {
        return <h2 className="comments-error-header">Server Error!</h2>
    }

    if (isLoading) {
        return (
            <h2 id="loading">Loading...</h2>
        )
    }

    return (
        <>
            <h2>Comments</h2>
            <button id="post-comment-button" onClick={handlePostCommentClick}>Post a comment</button>
            <div>
                {isPostCommentShowing && <PostCommentForm currentArticleId={currentArticleId} setRefreshPage={setRefreshPage}/>}
            </div>
            <ul className="comments-list">
            {comments.map((comment) => {
                return (
                    <li key={comment.comment_id}>
                        <CommentCard>
                            <div className="comment-body">
                                <p>{comment.body}</p>
                                <DeleteComment commentAuthor={comment.author} commentId={comment.comment_id} setRefreshPage={setRefreshPage}/>
                            </div>
                            <div className="comment-bottom">
                                <p>{comment.author}</p>
                                <section id="votes-counter">
                                    <button className="vote-button" disabled={isVoteDisabled(comment.comment_id, -1)} onClick={() => handleVote(comment.comment_id, -1)}>
                                        -
                                    </button>
                                    <p>{comment.votes}</p>
                                    <button className="vote-button" disabled={isVoteDisabled(comment.comment_id, 1)} onClick={() => handleVote(comment.comment_id, 1)}>
                                        +
                                    </button>
                                </section>
                                <p>{comment.created_at.replace('T', ' ').substring(0, 16)}</p>
                            </div>
                            <p id="error-message">{error}</p>
                        </CommentCard>
                    </li>
                )
            })}
            </ul>
        </>
    )
}

export default Comments; 