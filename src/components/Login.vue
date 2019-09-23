<template>
  <div class="hello">
    <img
      src="./../assets/images/progress_icon_7.png"
      alt="s"
    />

    <div class="login">
      <van-cell-group>
        <van-field
          v-model="login.username"
          required
          clearable
          label="用户名"
          placeholder="请输入用户名"
        />

        <van-field
          v-model="login.password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
        />
      </van-cell-group>
      <van-button
        type="primary"
        size="large"
        @click.native.prevent="handleSubmit"
        >登 录</van-button
      >
    </div>
  </div>
</template>

<script>
import { CellGroup, Field, Button } from 'vant'
import { signIn } from '../api/api'
export default {
  name: 'Login',
  components: {
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button
  },
  data() {
    return {
      login: {
        username: 'admin',
        password: '123456'
      }
    }
  },
  methods: {
    handleSubmit() {
      if (this.login.username && this.login.password) {
        let para = {
          username: this.login.username,
          password: this.login.password
        }
        signIn(para).then(res => {
          // console.log(res)
          // const data = res.data
          // this.login = data
          let { msg, code } = res.data
          if (code !== 200) {
            this.$toast.fail(msg)
          } else {
            this.$toast.success(msg)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
