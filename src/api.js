import axios from 'axios';

const newsApi = axios.create({
    baseURL: 'https://news-app-8vge.onrender.com/api'
})

export const getArticles = async (sortBy, sortDirection, topicSlug) => {
    let queryStr = `/articles?`
    if (topicSlug) {
        queryStr += `topic=${topicSlug}&`
    }
    queryStr += `sort_by=${sortBy}&order=${sortDirection}`

    const response = await newsApi.get(queryStr)
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

export const postComment = async (user, articleId, commentBody) => {
    const response = await newsApi.post(`/articles/${articleId}/comments`, {
        'body': commentBody,
        'username': user
    });
    return response.data;
}

export const deleteComment = async (commentId) => {
    const response = await newsApi.delete(`/comments/${commentId}`)
}

export const getTopics = async () => {
    const response = await newsApi.get('/topics');
    return response.data;
}
