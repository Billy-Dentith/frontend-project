import { useState, useEffect } from "react";
import { getTopics } from "../api";
import TopicsCard from "./TopicsCard";
import { Link } from "react-router-dom";

const Topics = () => {
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false); 

    useEffect(() => {
        getTopics().then((res) => {
            setTopics(res.topics)
            setIsLoading(false);
        })
        .catch((err) => {
            setIsError(true);
        })
    }, [])

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
            <h1 className="page-header">Topics</h1>
            <ul className="article-list">
            {topics.map((topic) => {
                return (
                    <li key={topic.slug}>
                        <Link to={`/topics/${topic.slug}`}>
                        <TopicsCard>
                            <h2>{topic.slug}</h2>
                            <p>{topic.description}</p>
                        </TopicsCard>
                        </Link>
                    </li>
                )
            })}
            </ul>
        </>
    )
}

export default Topics;