import { useEffect, useState } from "react";
import { Link, useSearchParams, useParams } from 'react-router-dom'
import { getArticles } from "../api";
// import ArticleCard from "./ArticleCard";
import ErrorPage from "./ErrorPage";
// import LottieLoading from "./LottieLoading";

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [sortBy, setSortBy] = useState('created_at');
    const [sortDirection, setSortDirection] = useState('desc');
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false); 
    const { slug } = useParams();
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
            getArticles(sortBy, sortDirection, slug).then((res) => {
                setSearchParams({ 
                    sort_by: sortBy, 
                    order: sortDirection 
                }, { replace: true });
                setArticles(res.articles);
                setIsLoading(false);
                setIsError(false);
            })
            .catch((err) => {
                setIsError(true);
            })
    }, [slug, sortBy, sortDirection])

    if (isError) {
        return (
            <ErrorPage>
                <h1 id="error">Article / Topic not found...</h1>
            </ErrorPage>
        )
    }

    if (isLoading) {
        return (
            // <LottieLoading />
            <h2 id="loading">Loading...</h2>
        )
    }

    return (
        <>
            <h1 className="page-header">{`${slug || 'All'} Articles`}</h1>
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
                    <li className="article-list-item" key={article.article_id}>
                        {/* <ArticleCard> */}
                        <Link to={`/articles/${article.article_id}`} className="article-card">
                        <img id= 'article-card-image' src={article.article_img_url}/>
                        <div className="article-card-text">
                            <h3>{article.title}</h3>
                            <p><b>Author:</b> {article.author}</p>
                            <p id="topic"><b>Topic:</b> {article.topic}</p>
                            <p><b>Posted on: </b>{date.split(' ')[0].split('-').reverse().join('-')} at {date.split(' ')[1]}</p>
                        </div>
                        <div className="article-card-votes">
                            <h3>Votes</h3>
                            <p>{article.votes}</p>
                            <h3>Comments</h3>
                            <p>{article.comment_count}</p>
                        </div>
                        </Link>
                        {/* </ArticleCard> */}
                    </li>
                )
            })}
            </ul>
        </>
    )
}

export default Articles;