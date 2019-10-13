// 模拟ajax请求的接口, 生成并返回模拟数据

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { LoginUsers, LoginData } from './data/user'
import { AllList } from './data/list'
export default {
  /**
   * mock start
   * reply的参数为 (status, data, headers)
   */
  start() {
    let mock = new MockAdapter(axios)
    mock.onGet('/login').reply(config => {
      //console.log(config)
      // if (config.data) {
      // 由于data: undefined，所以改为config.params
      if (config.params) {
        let { userName, password } = config.params
        return new Promise(resolve => {
          setTimeout(() => {
            let hasUser = LoginUsers.some(u => {
              if (
                u.userName === userName &&
                u.password === password
              ) {
                // user = JSON.parse(JSON.stringify(u))
                // user.password = undefined
                return true
              }
            })

            //resolve([状态值，{返回的数据}])
            if (hasUser) {
              resolve([
                200,
                {
                  code: '0',
                  data: LoginData,
                  desc: '操作成功'
                }
              ])
            } else {
              resolve([
                200,
                {
                  code: '1',
                  message: '用户名或密码不正确',
                  desc: 'error'
                }
              ])
            }
          }, 1000)
        })
      }
    })
    mock
      .onPost('/getAllDailyAndAttendance')
      .reply(config => {
        if (config.data) {
          let { userId } = JSON.parse(config.data)
          return new Promise(resolve => {
            if (userId) {
              resolve([
                200,
                {
                  code: '0',
                  data: AllList,
                  desc: '操作成功'
                }
              ])
            } else {
              resolve([
                200,
                {
                  code: '1',
                  message: '请传入用户id',
                  desc: 'error'
                }
              ])
            }
          })
        }
      })
  }
}
