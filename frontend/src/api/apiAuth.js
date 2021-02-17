import apiClient from './apiClient';

const login = (email, password) => apiClient.post('login/', {email : email, password : password})
const register = (fields) => apiClient.post('registro/', fields)

export default {
    login,
    register,
}
