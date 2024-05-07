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
    const response = await newsApi.get(`/articles/${articleId}/comments`);
    return response.data;
}

export const patchVote = async (articleId, vote) => {
    const response = await newsApi.patch(`/articles/${articleId}`, {
        inc_votes: vote
    }
    );
    return response.data; 
}

export const postComment = async (articleId, commentBody) => {
    const response = await newsApi.post(`/articles/${articleId}/comments`, {
        'body': commentBody,
        'username': "tickle122"
    });
    return response.data;
}