import { useContext, useState } from 'react'
import { UserContext } from '../contexts/UserContext';
import { deleteComment } from '../api';

const DeleteComment = ({ commentAuthor, commentId, setRefreshPage }) => {
    const { user } = useContext(UserContext); 
    const [disabled, setDisabled] = useState(false);
    const [buttonText, setButtonText] = useState('Remove');

    const handleDeleteClick = () => {
        setDisabled(true);
        setButtonText( 'Removing...')
        deleteComment(commentId).then(() => {
            setDisabled(false);
            setButtonText('Remove');
            setRefreshPage(true);
        }).catch((err) => {
            setDisabled(false);
        })
    }

    if (commentAuthor === user) {
        return (
            <button id='delete-button' onClick={handleDeleteClick} disabled={disabled}>{buttonText}</button>
        )
    }
}

export default DeleteComment;