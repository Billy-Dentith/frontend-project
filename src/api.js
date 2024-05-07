import axios from 'axios';

const newsApi = axios.create({
    baseURL: 'https://news-app-8vge.onrender.com/api'
})

export const getArticles = async () => {
    const response = await newsApi.get('/articles')
    return response.data;
}