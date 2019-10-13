import Mock from 'mockjs'
const LoginUsers = [
  // 制造登录账号，便于模拟登陆测试
  {
    userName: '123',
    password: '123'
  }
]

const LoginData = []

LoginData.push(
  Mock.mock({
    daily: '',
    user: {
      userId: '111111',
      userName: '123',
      password: '123'
    },
    'attendance|0-2': [
      {
        'id|32': /[a-z0-9]/,
        longitude: '123.234',
        latitude: '123.456',
        address: Mock.Random.county(true),
        userId: '111111',
        'type|+1': 0,
        date:
          Mock.Random.date('yyyy-MM-dd') +
          ' ' +
          Mock.Random.time('HH:mm:ss')
      }
    ]
  })
)
export { LoginUsers, LoginData }
