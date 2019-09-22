// 所有接口
import axios from 'axios'
// axios

export const Login = params => {
  //console.log(params)
  return axios.get(`/login`, { params }).then(res => {
    //console.log(res.data)
    res.data
  })
}

export const getUserList = params => {
  return axios.get(`/user/list`, { params: params })
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
