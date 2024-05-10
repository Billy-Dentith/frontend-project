import { useContext, useState } from 'react'
import { UserContext } from '../contexts/UserContext';
import { deleteArticle } from '../api';
import ErrorPage from './ErrorPage';

const DeleteArticle = ({ articleAuthor, articleId, setRefreshPage }) => {
    const { user } = useContext(UserContext); 
    const [disabled, setDisabled] = useState(false);
    const [buttonText, setButtonText] = useState('Delete Article');

    const handleDeleteClick = () => {
        setDisabled(true);
        setButtonText( 'Deleting...')
        deleteArticle(articleId).then(() => {
            setDisabled(false);
            setButtonText('Delete');
        }).catch((err) => {
            setDisabled(false);
        })
    }

    if (articleAuthor === user) {
        return (
            <button id='article-delete-button' onClick={handleDeleteClick} disabled={disabled}>{buttonText}</button>
        )
    }
}

export default DeleteArticle;