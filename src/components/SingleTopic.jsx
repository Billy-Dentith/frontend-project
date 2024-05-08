import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticlesByTopic } from "../api";
import ArticleCard from "./ArticleCard";

const SingleTopic = () => {
    const [articlesByTopic, setArticlesByTopic] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { slug } = useParams();

    useEffect(() => {
        getArticlesByTopic(slug).then((res) => {
            setArticlesByTopic(res.articles);
            setIsLoading(false);
        })
    }, [])
    
    if (isLoading) {
        return (
            <h2 id="loading">Loading...</h2>
        )
    }

    return (
        <>
            <h1 className="page-header">{`${slug} Articles`}</h1>
            <ul className="article-list">
            {articlesByTopic.map((article) => {
                let date = article.created_at.replace('T', ' ').substring(0, 16);
                return (
                    <li key={article.article_id}>
                        <Link to={`/articles/${article.article_id}`}>
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

export default SingleTopic;