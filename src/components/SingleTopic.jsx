import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { getArticlesByTopic } from "../api";
import ArticleCard from "./ArticleCard";

const SingleTopic = () => {
    const [articlesByTopic, setArticlesByTopic] = useState('');
    const [sortBy, setSortBy] = useState('created_at');
    const [sortDirection, setSortDirection] = useState('desc');
    const [isLoading, setIsLoading] = useState(true);
    const { slug } = useParams();
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        getArticlesByTopic(slug, sortBy, sortDirection).then((res) => {
            setArticlesByTopic(res.articles);
            setIsLoading(false);
            setSearchParams({ 
                sort_by: sortBy, 
                order: sortDirection 
            });
        })
    }, [sortBy, sortDirection])
    
    if (isLoading) {
        return (
            <h2 id="loading">Loading...</h2>
        )
    }

    return (
        <>
            <h1 className="page-header">{`${slug} Articles`}</h1>
            <form className="sort-form">
                <select 
                    name="sort-by" 
                    id="sort-by-select" 
                    onChange={(e) => {
                        setSortBy(e.target.value)
                    }}>
                    <option value='created_at'>Date</option>
                    <option value='votes'>Votes</option>
                    <option value='comment_count'>Comment Count</option>
                </select>
                <select 
                    name="direction" 
                    id="direction-select" 
                    onChange={(e) => {
                        setSortDirection(e.target.value)
                    }}>
                    <option value='desc'>Descending</option>
                    <option value='asc'>Ascending</option>
                </select>
            </form>
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