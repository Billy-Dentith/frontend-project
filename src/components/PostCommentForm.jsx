import { useState } from 'react'
import { postComment } from '../api';
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const PostCommentForm = ({ currentArticleId }) => {
    const [commentBody, setCommentBody] = useState('');
    const [commentUser, setCommentUser] = useState('');
    const [isPosted, setIsPosted] = useState('');
    const [disabled, setDisabled] = useState(false);
    const { user } = useContext(UserContext); 

    const handleSubmit = (e) => {
        e.preventDefault();
        postComment(user, currentArticleId, commentBody).then((res) => {
            setIsPosted('Comment Posted!')
            setDisabled(true)
            setTimeout(() => {
                setDisabled(false);
            }, 60000);
        })
        .catch((err) => {
            setIsPosted('Unable to post comment. Please try again later.')
        })
    }

    return (
        <>
            <form id="comment-form" onSubmit={handleSubmit}>
                {/* <h3>Comment: </h3> */}
                <label htmlFor="body">Comment Body: </label>
                <textarea 
                    id="body" 
                    name="body" 
                    placeholder='Write your comment here...'
                    onChange={(e) => {
                        setCommentBody(e.target.value)
                    }}
                    value={commentBody}
                    required
                ></textarea>
                <button disabled={disabled}>Submit!</button>
                <p>{isPosted}</p>
            </form>
        </>
    )
}

export default PostCommentForm;