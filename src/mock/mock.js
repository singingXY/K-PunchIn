// 模拟ajax请求的接口, 生成并返回模拟数据

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
//import mock from 'mockjs'
import { LoginUsers } from './data/user'
export default {
  /**
   * mock start
   * reply的参数为 (status, data, headers)
   *
   */
  start() {
    let mock = new MockAdapter(axios)
    mock.onGet('/login').reply(config => {
      // console.log(config.params)
      // if (config.data) {
      //   let { username, password } = JSON.parse(config.data)
      if (config.params) {
        let { username, password } = config.params

        return new Promise((resolve, reject) => {
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

            //resolve([状态值，{返回的数据}])
            if (hasUser) {
              resolve([
                200,
                { code: 0, msg: '登录成功', user }
              ])
            } else {
              resolve([
                200,
                { code: 1, msg: '账号或密码错误' }
              ])
            }
          }, 1000)
        })
      }
    })
  }
}
