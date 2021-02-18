import apiClient from './apiClient';

const getTodo = () => apiClient.get('notas/')
const addTodo = (content) => apiClient.post('notas/', {content : content})
const removeTodo = (id) => apiClient.delete('notas/' + id)
const patchTodo = (todo) => apiClient.patch('notas/' + todo.id + "/", todo)

export default {
    getTodo,
    addTodo,
    removeTodo,
    patchTodo
}