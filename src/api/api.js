// 所有接口
import axios from 'axios'
// axios
//   .get('/users', { params: { searchText: 'John' } })
//   .then(function(response) {
//     console.log(response.data)
//   })
export const login = params => {
  return axios.get(`/login`, params).then(res => res.data)
}

export const getTodoList = params => {
  //封装一个函数，名为getTodoList
  return axios.get(`/todo/list`, {
    // 请求路径 ‘/todo/list’
    params: params
  })
}
export const addTodo = params => {
  return axios
    .post(`/todo/addTodo`, params)
    .then(res => res.data)
}
