// 所有接口
import axios from 'axios'
// axios

export const signIn = params => {
  return axios.get(`/login`, { params })
}

export const recodeAttendance = params => {
  return axios
    .post(`/recodeAttendance`, params)
    .then(res => res.data)
}

export const recodeDaily = params => {
  return axios
    .post(`/recodeDaily`, params)
    .then(res => res.data)
}

export const getAllDailyAndAttendance = params => {
  return axios
    .post(`/getAllDailyAndAttendance`, params)
    .then(res => res.data)
}
