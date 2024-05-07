import axios from 'axios';

export const getArticles = async () => {
    const response = await axios.get(
        'https://news-app-8vge.onrender.com/api/articles'
    )
    return response.data;
}