import Mock from 'mockjs'
const LoginUsers = [
  // 制造登录账号，便于模拟登陆测试
  {
    id: 1,
    userName: '123',
    password: '123',
    name: '王某某'
  }
]

const Users = []

for (let i = 0; i <= 50; i++) {
  Users.push(
    Mock.mock({
      // 根据数据模板生成模拟数据
      id: Mock.Random.guid(), // 随机生成一个id
      name: Mock.Random.cname(), // 随机生成一个常见的中文姓名。
      addr: Mock.mock('@county(true)'), // @county(true)为数据模板
      'age|18-60': 1, // 'age|18-60': 1 为数据模板
      birth: Mock.Random.date(), // 随机生成日期
      sex: Mock.Random.integer(0, 1) // 随机生成整数, min:0, max1,
    })
  )
}
export { LoginUsers, Users }
