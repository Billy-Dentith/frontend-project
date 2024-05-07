import { useEffect, useState } from "react";
import { getArticleById } from "../api";
import { useParams } from "react-router-dom";
import SingleArticleCard from "./SingleArticleCard";
import Comments from "./Comments";

const IndividualArticle = () => {
    const { article_id } = useParams();
    const [currentArticle, setCurrentArticle] = useState('');
    const [isCommentsShowing, setIsCommentsShowing] = useState(false); 
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getArticleById(article_id).then((res) => {
            res.article.created_at = res.article.created_at.replace('T', ' ').substring(0, 16);
            setCurrentArticle(res.article);
            setIsLoading(false);
        })
    }, [article_id])

    const handleCommentsClick = () => {
        setIsCommentsShowing((isCommentsShowing) => !isCommentsShowing); 
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
                    <h3>{currentArticle.votes}</h3>
                </section>
                <button id="article-comments" onClick={handleCommentsClick}>
                    <h3>Comments</h3>
                    <h3>{currentArticle.comment_count}</h3>
                </button>
            </div>
            <div>
                {isCommentsShowing && <Comments currentArticleId={currentArticle.article_id}/>}
            </div>
        </SingleArticleCard>
    )
}

export default IndividualArticle;