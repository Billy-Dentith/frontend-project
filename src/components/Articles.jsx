import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false); 

    useEffect(() => {
        getArticles().then((res) => {
            setArticles(res.articles);
            setIsLoading(false);
        })
        .catch((err) => {
            setIsError(true);
        })
    })

    if (isError) {
        return <h2>Error!</h2>
    }

    if (isLoading) {
        return (
            <h2 id="loading">Loading...</h2>
        )
    }

    return (
        <>
            <h1>Articles</h1>
            <ul className="article-list">
            {articles.map((article) => {
                let date = article.created_at.replace('T', ' ').substring(0, 16);
                return (
                    <li key={article.article_id}>
                        <Link to={`/${article.article_id}`}>
                        <ArticleCard>
                        <>
                            <img id= 'article-image' src={article.article_img_url}/>
                        </>
                        <div className="article-text">
                            <h3>{article.title}</h3>
                            <p><b>Author:</b> {article.author}</p>
                            <p id="topic"><b>Topic:</b> {article.topic}</p>
                            <p><b>Date Posted: </b>{date}</p>
                        </div>
                        </ArticleCard>
                        </Link>
                    </li>
                )
            })}
            </ul>
        </>
    )
}

export default Articles;