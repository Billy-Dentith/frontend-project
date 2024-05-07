import { useEffect, useState } from "react";
import { getArticleById } from "../api";
import { useParams } from "react-router-dom";

const IndividualArticle = () => {
    const [currentArticle, setCurrentArticle] = useState('');
    const { article_id } = useParams();

    useEffect(() => {
        getArticleById(article_id).then((res) => {
            res.article.created_at = res.article.created_at.replace('T', ' ').substring(0, 16);
            setCurrentArticle(res.article);
        })
    }, [article_id])

    return (
        <div>
            <h1>{currentArticle.title}</h1>
            <h2>{currentArticle.topic}</h2>
            <p id="article-text">{currentArticle.author}</p>
            <p id="article-text">{currentArticle.created_at}</p>
            <img id="article-img" src={currentArticle.article_img_url}/>
            <p id="article-text">{currentArticle.body}</p>
            <div id="votes-comments">
                <h3 id="article-votes">Votes</h3>
                <h3 id="article-comments">Comments</h3>
            </div>
            <div id="votes-comments">
                <h3 id="article-votes">{currentArticle.votes}</h3>
                <h3 id="article-comments">{currentArticle.comment_count}</h3>
            </div>
        </div>
    )
}

export default IndividualArticle;