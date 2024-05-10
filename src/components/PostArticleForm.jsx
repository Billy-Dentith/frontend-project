import { useContext, useEffect, useState } from "react";
import { getTopics, postArticle } from "../api";
import { UserContext } from "../contexts/UserContext";

const PostArticleForm = () => {
    const { user } = useContext(UserContext); 
    const [topics, setTopics] = useState([]);
    const [articleTitle, setArticleTitle] = useState('');
    const [articleTopic, setArticleTopic] = useState('coding');
    const [articleBody, setArticleBody] = useState('');
    const [articleImage, setArticleImage] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [buttonText, setButtonText] = useState('Submit');
    const [postStatus, setPostStatus] = useState('');

    useEffect(() => {
        getTopics().then((res) => {
            setTopics(res.topics);
        })
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        setButtonText('Submitting...');
        setDisabled(true);
        postArticle(user, articleTitle, articleBody, articleTopic, articleImage).then((res) => {
            setPostStatus('Article Posted!');
            setTimeout(() => {
                setPostStatus('')
            }, 5000)
            setDisabled(false);
            setButtonText('Submit');
            })
            .catch((err) => {
                setPostStatus('Unable to post article. Please try again later.')
                setTimeout(() => {
                    setPostStatus('');
                }, 5000)
                setDisabled(false);
            })
        }

    return (
        <>
            <h1 className="page-header">Create Post</h1>
            <form id="article-form" onSubmit={handleSubmit}>
                <label htmlFor="article-form-title">Title:</label>
                <input 
                    id="article-form-title" 
                    name="article-form-title" 
                    placeholder="Title" 
                    onChange={(e) => {
                        setArticleTitle(e.target.value);
                    }}
                    required></input>
                <label htmlFor="article-form-topic">Topic:</label>
                <select 
                    id="article-form-topic" 
                    name="article-form-topic"
                    onChange={(e) => {
                        setArticleTopic(e.target.value);
                    }}>
                        {topics.map((topic) => {
                            return (
                                <option key={topic.slug} value={topic.slug}>{topic.slug}</option>
                            )
                        })}
                    </select>
                <label htmlFor="article-form-body">Body:</label>
                <textarea 
                    id="article-form-body" 
                    name="article-form-body" 
                    placeholder="Write your article here..."
                    onChange={(e) => {
                        setArticleBody(e.target.value);
                    }}
                    required></textarea>
                <label htmlFor="article-form-img">Image URL:</label>
                <input 
                    id="article-form-img" 
                    name="article-form-img" 
                    placeholder="Image URL"
                    onChange={(e) => {
                        setArticleImage(e.target.value);
                    }}></input>
                <button disabled={disabled}>{buttonText}</button>
                <p>{postStatus}</p>
            </form>
        </>
    )
}

export default PostArticleForm; 