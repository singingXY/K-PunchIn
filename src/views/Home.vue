<template>
  <div class="home">
    home
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  created() {
    if (localStorage.getItem('Login')) {
      //登录了，留在当前页
    } else {
      this.$router.push('/login') // 未登录，跳登录页
    }
  }
}
</script>
