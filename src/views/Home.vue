<template>
  <div class="home">
    <van-nav-bar title="云网科技" />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
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
