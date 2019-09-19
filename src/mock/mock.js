// 模拟ajax请求的接口, 生成并返回模拟数据

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
//import mock from 'mockjs'
import { LoginUsers } from './data/user'
export default {
  /**
   * mock start
   */
  start() {
    let mock = new MockAdapter(axios)
    mock.onGet('/login').reply(config => {
      let { username, password } = JSON.parse(config.data)
      //return new Promise((resolve, reject) => {
      return new Promise(resolve => {
        let user = null
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (
              u.username === username &&
              u.password === password
            ) {
              user = JSON.parse(JSON.stringify(u))
              user.password = undefined
              return true
            }
          })

          if (hasUser) {
            resolve([
              200,
              { code: 200, msg: '请求成功', user }
            ])
          } else {
            resolve([
              200,
              { code: 500, msg: '账号或密码错误' }
            ])
          }
        }, 1000)
      })
    })
  }
}
