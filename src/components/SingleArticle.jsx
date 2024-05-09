import { useEffect, useState } from "react";
import { getArticleById, patchVote } from "../api";
import { useParams, Link } from "react-router-dom";
import SingleArticleCard from "./SingleArticleCard";
import Comments from "./Comments";

const SingleArticle = () => {
    const { article_id } = useParams();
    const [currentArticle, setCurrentArticle] = useState('');
    const [isCommentsShowing, setIsCommentsShowing] = useState(false); 
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [voteChange, setVoteChange] = useState(0);
    const [error, setError] = useState('')

    useEffect(() => {
        getArticleById(article_id).then((res) => {
            res.article.created_at = res.article.created_at.replace('T', ' ').substring(0, 16);
            setCurrentArticle(res.article);
            setIsLoading(false);
        }).catch((err) => {
            setIsError(true);
            setIsLoading(false);
        });
    }, [article_id])

    const handleCommentsClick = () => {
        setIsCommentsShowing((isCommentsShowing) => !isCommentsShowing); 
    }

    const handleVote = (vote) => {
        patchVote(currentArticle.article_id, vote).then(() => {
            setCurrentArticle((currArticle) => {
                return {...currArticle, votes: currArticle.votes + vote}
            })
            setVoteChange((currVote) => currVote + vote)
        }).catch((err) => {
            setError('Unable to process vote. Please try again later.')
        })
    }

    if (isError) {
        return (
            <div className="error-page">
                <h1 id="error">Article not found...</h1>
                <h2>Click the button below to view all of our articles:</h2>
                <Link to={'/articles'}>
                    <div id="redirect-button">
                        <h2>View All Articles</h2>
                    </div>
                </Link>  
            </div>
        )
    }
    if (isLoading) {
        return (
            <h2 id="loading">Loading...</h2>
        )
    }

    return (
        <SingleArticleCard>
            <h1>{currentArticle.title}</h1>
            <h2>{currentArticle.topic}</h2>
            <p id="article-text">{currentArticle.author}</p>
            <p id="article-text">{currentArticle.created_at}</p>
            <img id="article-img" src={currentArticle.article_img_url}/>
            <p id="article-text">{currentArticle.body}</p>
            <div id="votes-comments">
                <section id="article-votes">
                    <h3>Votes</h3>
                    <section id="votes-counter">
                        <button className="vote-button" disabled={voteChange === -1} onClick={() => handleVote(-1)}>
                            -
                        </button>
                        <p className="article-numbers">{currentArticle.votes}</p>
                        <button className="vote-button" disabled={voteChange === 1} onClick={() => handleVote(1)}>
                            +
                        </button>
                    </section>
                    <p>{error}</p>
                </section>
                <button id="article-comments" onClick={handleCommentsClick}>
                    <h3>Comments</h3>
                    <p className="article-numbers">{currentArticle.comment_count}</p>
                </button>
            </div>
            <div>
                {isCommentsShowing && <Comments currentArticleId={currentArticle.article_id}/>}
            </div>
        </SingleArticleCard>
    )
}

export default SingleArticle;