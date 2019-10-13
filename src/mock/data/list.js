import Mock from 'mockjs'

const AllList = []

for (let i = 0; i <= 20; i++) {
  AllList.push(
    Mock.mock({
      date: Mock.Random.date('yyyy-MM-dd'),
      'list|2': [
        {
          'id|32': /[a-z0-9]/,
          longitude: '123.234',
          latitude: '123.456',
          address: Mock.Random.county(true),
          userId: '123',
          'type|+1': 0,
          date: Mock.Random.date('T') / 1000
        }
      ],
      content: Mock.Random.cparagraph()
    })
  )
}

export { AllList }
