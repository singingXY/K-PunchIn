<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
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
import { login } from '../api/api'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button
  },
  data() {
    return {
      login: []
    }
  },
  created() {
    login({}).then(res => {
      console.log(res)
      const data = res.data
      this.login = data
    })
  },
  methods: { handleSubmit() {} }
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
