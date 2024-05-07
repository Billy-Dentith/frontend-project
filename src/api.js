import axios from 'axios';

const newsApi = axios.create({
    baseURL: 'https://news-app-8vge.onrender.com/api'
})

export const getArticles = async () => {
    const response = await newsApi.get('/articles')
    return response.data;
}

export const getArticleById = async (articleId) => {
    const response = await newsApi.get(`/articles/${articleId}`);
    return response.data;
}

export const getArticlesComments = async (articleId) => {
    const response = await newsApi.get(`articles/${articleId}/comments`);
    return response.data;
}