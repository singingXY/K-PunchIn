<template>
  <div class="home">
    <van-nav-bar title="云网科技" />
    <div class="user">
      <van-image
        round
        fit="cover"
        width="69"
        height="69"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <div class="user-info">
        <p class="user-name">孙超</p>
        <p>
          <svg
            class="user-position"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4404"
            width="24"
            height="24"
          >
            <path
              d="M678.3 294.1l-306-1.4L258.5 818l251.8 141.9 262.9-143.4-94.9-522.4zM303.8 797.6l100.7-464.7 240.3 1.1 83.7 461.2-218 118.9-206.7-116.5z m73.1-530.1l298.9-0.7 40.6-151.4c3.3-12.2 0.7-25-7-35.1-7.7-10-19.4-15.8-32-15.8h-0.1l-304.9 0.5c-12.8 0-24.5 5.9-32.2 16.1-7.7 10.2-10.1 23.1-6.5 35.4l43.2 151z m-4.7-162.1c0.1-0.1 0.2-0.1 0.3-0.1l304.9-0.5c0.1 0 0.2 0 0.3 0.1 0.1 0.1 0.1 0.2 0.1 0.3L645.1 227l-238.1 0.5-34.9-121.8c0-0.2 0-0.2 0.1-0.3z"
              fill="#3c83c3"
              p-id="4405"
            ></path>
            <path
              d="M379.008 600.629l188.394-245.447 31.732 24.356L410.74 624.985z m26.862 122.414l188.393-245.447 31.732 24.356-188.393 245.447z m43.105 109.649L637.37 587.245l31.732 24.356-188.394 245.447z"
              fill="#3c83c3"
              p-id="4406"
            ></path>
          </svg>
          研发中心-项目经理
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Image } from 'vant'
// @ is an alias to /src

export default {
  components: {
    [Image.name]: Image
  },
  created() {
    if (localStorage.getItem('Login')) {
      //登录了，留在当前页
    } else {
      this.$router.push('/login') // 未登录，跳登录页
    }
  },
  methods: {}
}
</script>
<style>
.van-nav-bar {
  background: #f8f8f8;
}
.van-hairline--bottom::after {
  border-bottom-width: 0;
}
.user {
  display: flex;
  margin: 5vw;
}
.user-info {
  margin-left: 5vw;
}
.user-info p {
  font-size: 1rem;
}
.user-position {
}
</style>
