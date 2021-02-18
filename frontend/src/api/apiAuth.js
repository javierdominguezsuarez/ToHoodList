import apiClient from './apiClient';

const login = (username, password) => apiClient.post('login/', {username : username, password : password})
const register = (fields) => apiClient.post('registro/', fields)

export default {
    login,
    register,
}
