// 所有接口
import axios from 'axios'
// axios

export const Login = params => {
  //console.log(params)
  return axios
    .get(`/login`, { params })
    .then(res => {
      //console.log(res)
      res.data
    })
    .catch(error => {
      reject(error)
    })
}

export const getUserList = params => {
  return axios.get(`/user/list`, { params: params })
}
export const getTodoList = params => {
  return axios.get(`/todo/list`, {
    params: params
  })
}
export const addTodo = params => {
  return axios
    .post(`/todo/addTodo`, params)
    .then(res => res.data)
}
