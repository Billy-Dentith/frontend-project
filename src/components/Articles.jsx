import { useEffect, useState } from "react";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";

const Articles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        getArticles().then((res) => {
            setArticles(res.articles)
        })
    })

    return (
        <>
            <h1>Articles</h1>
            <ul className="article-list">
            {articles.map((article) => {
                return (
                    <li>
                        <ArticleCard>
                        <>
                            <img id= 'article-image' src={article.article_img_url}/>
                        </>
                        <div className="article-text">
                            <h3>{article.title}</h3>
                            <p><b>Author:</b> {article.author}</p>
                            <p id="topic"><b>Topic:</b> {article.topic}</p>
                            <p><b>Date Posted: </b>{article.created_at}</p>
                        </div>
                        </ArticleCard>
                    </li>
                )
            })}
            </ul>
        </>
    )
}

export default Articles;