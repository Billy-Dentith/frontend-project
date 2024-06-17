import { useState, useEffect } from "react";
import { getTopics } from "../api";
import { Link } from "react-router-dom";
import LottieLoading from "./LottieLoading";

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
        return <h1 className="error-header">Server Error!</h1>
    }

    if (isLoading) {
        return (
            // <LottieLoading />
            <h2 id="loading">Loading...</h2>
        )
    }

    return (
        <>
            <h1 className="page-header">Topics</h1>
            <ul className="topics-list">
            {topics.map((topic) => {
                return (
                    <li key={topic.slug}>
                        <Link to={`/topics/${topic.slug}`} className="topics-card">
                            <h2>{topic.slug}</h2>
                            <p>{topic.description}</p>
                        </Link>
                    </li>
                )
            })}
            </ul>
        </>
    )
}

export default Topics;