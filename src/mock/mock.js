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
    //登录接口
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
    //获取考勤和日报接口
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
    //考勤打卡接口
    mock.onPost('/recodeAttendance').reply(config => {
      if (config.data) {
        let { punch } = JSON.parse(config.data)
        return new Promise(resolve => {
          if (punch) {
            resolve([
              200,
              {
                code: '0',
                data: '打卡成功',
                desc: '操作成功'
              }
            ])
          } else {
            resolve([
              200,
              {
                code: '1',
                message:
                  '打卡失败,未传入用户id或未指定打卡类型',
                desc: 'error'
              }
            ])
          }
        })
      }
    })
    //写日报接口
    mock.onPost('/recodeDaily').reply(config => {
      if (config.data) {
        let { Daily } = JSON.parse(config.data)
        return new Promise(resolve => {
          if (Daily) {
            resolve([
              200,
              {
                code: '0',
                data: '记录日报成功',
                desc: '操作成功'
              }
            ])
          } else {
            resolve([
              200,
              {
                code: '1',
                message:
                  '记录日报失败,未传入用户id或日报内容',
                desc: 'error'
              }
            ])
          }
        })
      }
    })
  }
}
