import { useState } from 'react'
import { postComment } from '../api';
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const PostCommentForm = ({ currentArticleId, setRefreshPage }) => {
    const [commentBody, setCommentBody] = useState('');
    // const [commentUser, setCommentUser] = useState('');
    const [postStatus, setPostStatus] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [buttonText, setButtonText] = useState('Submit');
    const { user } = useContext(UserContext); 

    const handleSubmit = (e) => {
        e.preventDefault();
        setButtonText('Submitting...');
        setDisabled(true);
        postComment(user, currentArticleId, commentBody).then((res) => {
            setPostStatus('Comment Posted!')
            setTimeout(() => {
                setPostStatus('')
            }, 5000)
            setDisabled(false);
            setButtonText('Submit');
            setRefreshPage(true);
        })
        .catch((err) => {
            setPostStatus('Unable to post comment. Please try again later.')
            setTimeout(() => {
                setPostStatus('');
            }, 5000)
            setDisabled(false);
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
                <button disabled={disabled}>{buttonText}</button>
                <p>{postStatus}</p>
            </form>
        </>
    )
}

export default PostCommentForm;