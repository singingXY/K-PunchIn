# k-punchin

Punch In/Out

- 技术栈: vue.js + vue-cli + vue-router + axios + mockjs + vant
- 员工上下班打卡、日报，统一管理小工具

### 目录结构

```
K-PunchI
├─ dist                             // 输出目录
├─ node_modules                     // Node.js 模块
├─ package-lock.json                // 项目配置文件
├─ package.json                     // 项目配置文件
├─ public                           // 项目html首页位置
├─ src                              // 源码目录
│  ├─ App.vue                       // 页面入口文件
│  ├─ api/api.js                    // 请求接口文件
│  ├─ assets                        // 图片资源文件夹
│  ├─ main.js                       // 程序入口文件，加载各种公共组件
│  ├─ mock                          // mock相关文件夹
│  │  ├─ data                       // 模拟数据文件夹
│  │  │  ├─ list.js                 // 考勤列表数据
│  │  │  └─ user.js                 // 主页数据及用户数据
│  │  ├─ index.js                   // 导入mock.js内容并导出
│  │  └─ mock.js                    // 定义请求回传的数据
│  ├─ router.js                     // 配置页面路由
│  └─ views                         // 页面组件
│     ├─ Home.vue                   // 主页
│     ├─ List.vue                   // 考勤列表
│     └─ Login.vue                  // 登录页
├─ babel.config.js                  // ES6语法编译配置
└─ vue.config.js                    // 自定义配置
```

## Project setup

```bash
# clone repo
git clone git@github.com:singingXY/K-PunchIn.git

# install dependencies
npm install

# Compiles and hot-reloads for development
npm run serve

# Compiles and minifies for production
npm run build

# Run your tests
npm run test

# Lints and fixes files
npm run lint
```
