# k-punchin

Punch In/Out

* 技术栈: 基于vue.js + vue-cli + vue-router + vuex + axios + less 重写vue版cnode社区，使用webpack打包

### 目录结构

```
K-PunchI
├─ dist                             // 输出目录
├─ node_modules                     // Node.js 模块
├─ package-lock.json                // 项目配置文件
├─ package.json                     // 项目配置文件
├─ public                           // 项目html首页位置
├─ src                              // 源码目录
│  ├─ App.vue
│  ├─ api
│  ├─ assets
│  ├─ main.js
│  ├─ mock
│  │  ├─ data
│  │  │ ├─ list.js
│  │  │ └─ user.js
│  │  ├─ index.js
│  │  └─ mock.js
│  ├─ router.js
│  └─ views
│     ├─ Home.vue
│     ├─ List.vue
│     └─ Login.vue
├─ babel.config.js                  // ES6语法编译配置
└─ vue.config.js                    // 自定义配置
```

## Project setup

``` bash
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
