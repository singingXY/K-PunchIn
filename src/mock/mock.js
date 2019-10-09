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
      // console.log(config)
      // if (config.data) {
      //   let { userName, password } = JSON.parse(config.data)
      // 由于data: undefined，所以改为config.params
      if (config.params) {
        let { userName, password } = config.params
        return new Promise(resolve => {
          // let user = null
          setTimeout(() => {
            let hasUser = LoginUsers.some(u => {
              if (
                u.userName === userName &&
                u.password === password
              ) {
                //user = JSON.parse(JSON.stringify(u))
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
                  data: {
                    daily: '',
                    user: {
                      userId: '111111',
                      userName: '123',
                      password: '123'
                    },
                    attendance: [
                      {
                        id:
                          '551a82b8ea624562a0e7d416664648a1',
                        longitude: '123.234',
                        latitude: '123.456',
                        address: '文曲路',
                        userId: '111111',
                        type: '0',
                        date: '2018-08-23 07:13:14'
                      },
                      {
                        id:
                          '5b486c33405c401d846531a16d586562',
                        longitude: '123.234',
                        latitude: '123.456',
                        address: '文曲路',
                        userId: '111111',
                        type: '1',
                        date: '2018-08-23 07:12:39'
                      }
                    ]
                  },
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
                  data: [
                    {
                      date: '2018-08-23',
                      list: [
                        {
                          id:
                            '0b97a21d57644311aa9dd25c1d5b2666',
                          longitude: '123.234',
                          latitude: '123.456',
                          address: '文曲路',
                          userId: '123',
                          type: '1',
                          date: 1534994990000
                        },
                        {
                          id:
                            '4e7629c35fe341d58d5dc112aae8dce5',
                          longitude: '123.234',
                          latitude: '123.456',
                          address: '文曲路',
                          userId: '123',
                          type: '0',
                          date: 1534994963000
                        }
                      ],
                      content: '上班打卡'
                    },
                    {
                      date: '2018-08-25',
                      list: [
                        {
                          id:
                            '0b97a21d57644311aa9dd25c1d5b2666',
                          longitude: '123.234',
                          latitude: '123.456',
                          address: '文曲路',
                          userId: '123',
                          type: '1',
                          date: 1534994990000
                        },
                        {
                          id:
                            '4e7629c35fe331d58d5dc112aae8dce5',
                          longitude: '123.234',
                          latitude: '123.456',
                          address: '文曲路',
                          userId: '123',
                          type: '0',
                          date: 1534994963000
                        }
                      ],
                      content: '上班打卡2'
                    }
                  ],
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
