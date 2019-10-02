<template>
  <div class="warp">
    <img
      src="@/assets/images/progress_icon_7.png"
      alt="s"
    />
    <p class="login-title">移动考勤</p>

    <div class="login">
      <van-field
        v-model="user.userName"
        clearable
        placeholder="手机号或邮箱"
        left-icon="/../../../assets/images/user.png"
      />
      <van-field
        v-model="user.password"
        type="password"
        placeholder="登录密码"
        left-icon="lock"
      />
      <div class="autoLogin">
        <van-checkbox
          v-model="autoLogin"
          checked-color="#0f84c7"
          >自动登录</van-checkbox
        >
      </div>
      <div class="login-btn">
        <van-button
          type="primary"
          size="large"
          @click.native.prevent="handleSubmit"
          color="#0f84c7"
          >登 录</van-button
        >
      </div>
    </div>
    <div class="container"></div>
  </div>
</template>

<script>
import { Field, Button, Checkbox } from 'vant'
import { signIn } from '@/api/api'
export default {
  name: 'Login',
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox
  },
  data() {
    return {
      user: {
        userName: '123',
        password: ''
      },
      autoLogin: true
    }
  },
  methods: {
    handleSubmit() {
      if (this.user.userName && this.user.password) {
        let para = {
          userName: this.user.userName,
          password: this.user.password
        }
        signIn(para).then(res => {
          // console.log(res)
          let data = res.data
          let { message, code } = data
          if (code == 0) {
            this.user = data.data.user
            this.$toast('登录成功')
            if (this.autoLogin) {
              // 储存登录状态
              localStorage.setItem('Login', true)
            }
            this.$router.push('/')
          } else {
            this.$toast.fail(message)
          }
        })
      } else {
        this.$toast.fail('请完整填写用户名与密码')
        return false
      }
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: #f7f7f7;
  z-index: -1;
}
.warp {
  margin-top: 60px;
  padding: 0 20px;
  text-align: center;
}
.login-title {
  font-size: 24px;
  margin: 10px 0 0 0;
}
.login {
  margin-top: 40px;
}
.login >>> .van-cell {
  font-size: 16px;
  margin-bottom: 10px;
  border-radius: 2px;
}
.login >>> .van-field__left-icon {
  margin-right: 10px;
}
.login >>> .van-field__left-icon .van-icon {
  font-size: 20px;
  color: #8a8a8a;
}
.login >>> .van-cell:not(:last-child)::after {
  border-bottom: 0;
}
.login-btn {
  margin-top: 30px;
}
</style>
