import { useEffect, useState } from "react";
import { Link, useSearchParams } from 'react-router-dom'
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [sortBy, setSortBy] = useState('created_at');
    const [sortDirection, setSortDirection] = useState('desc');
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false); 
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        getArticles(sortBy, sortDirection).then((res) => {
            setArticles(res.articles);
            setIsLoading(false);
            setSearchParams({ 
                sort_by: sortBy, 
                order: sortDirection 
            });
        })
        .catch((err) => {
            setIsError(true);
        })
    }, [sortBy, sortDirection])

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
            <h1 className="page-header">Articles</h1>
            <form className="sort-form">
                <select 
                    name="sort-by" 
                    id="sort-by-select" 
                    onChange={(e) => {
                        setSortBy(e.target.value);
                    }}>
                    <option value='created_at'>Date</option>
                    <option value='votes'>Votes</option>
                    <option value='comment_count'>Comment Count</option>
                </select>
                <select 
                    name="direction" 
                    id="direction-select" 
                    onChange={(e) => {
                        setSortDirection(e.target.value);
                    }}>
                    <option value='desc'>Descending</option>
                    <option value='asc'>Ascending</option>
                </select>
            </form>
            <ul className="article-list">
            {articles.map((article) => {
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

export default Articles;