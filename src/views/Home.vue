<template>
  <div class="home">
    <van-nav-bar title="云网科技" />
    <van-skeleton :row="2" avatar title :loading="loading">
      <div class="user">
        <div class="user-pic">
          <van-image
            round
            fit="cover"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </div>
        <div class="user-info">
          <p class="user-name">{{ this.user.userName }}</p>
          <p>
            <svg
              class="user-position"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4404"
              width="20"
              height="20"
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
              ></path></svg
            >研发中心-项目经理
          </p>
        </div>
      </div>
    </van-skeleton>
    <div class="van-doc-block__title">
      <van-cell
        title="今天是"
        is-link
        value="更多"
        to="/list"
      >
        <template slot="title">
          <span class="custom-title"
            >今天是 {{ 0 | formatDate }}</span
          >
        </template>
      </van-cell>
    </div>
    <div class="count">
      <div class="punch">
        <img src="@/assets/images/punch.png" alt="" />
        <span>打卡数：25</span>
      </div>
      <div class="daily">
        <img src="@/assets/images/daily.png" alt="" />
        <span>日报数：26</span>
      </div>
    </div>
    <div class="van-doc-block__title">
      <van-cell value="我的日报" />
    </div>
    <div class="mydaily">
      <template v-if="!this.data.daily">
        <div @click="dailyReportShow = true">
          <p>您今天还没有写日报~</p>
          <img src="@/assets/images/wd.png" alt="" />
        </div>
        <van-dialog
          v-model="dailyReportShow"
          show-cancel-button
          :beforeClose="beforeClose"
        >
          <textarea
            class="daily-report"
            v-model="daily"
            placeholder="请输入日报内容"
          >
          </textarea>
        </van-dialog>
      </template>
      <template v-else>
        <p class="mydaily-text">{{ this.data.daily }}</p>
      </template>
    </div>
    <div class="van-doc-block__title">
      <van-cell value="打卡记录" />
    </div>

    <van-skeleton :row="4" :loading="loading">
      <div class="mypunch">
        <template v-if="attendanceLength">
          <div
            class="punch-text"
            v-for="attendance in this.data[0].attendance"
            :key="attendance.id"
          >
            <p>
              {{ attendance.type | getType }}
              {{ attendance.date }}
            </p>
            <p class="punch-text-2">
              <img
                src="../assets/images/position.png"
                alt=""
              />
              {{ attendance.address }}
            </p>
          </div>
          <div
            class="punch-btn"
            v-if="attendanceLength == 1"
          >
            下班打卡
          </div>
        </template>
        <template v-else>
          <p>您今天还没有打卡哦~</p>
          <div class="punch-btn">上班打卡</div>
        </template>
      </div>
      <div class="mypunch " :class="{ baidumap: baidumap }">
        <p class="location">当前位置:{{ nowAddress }}</p>
        <baidu-map
          class="bm-view"
          :center="location"
          :zoom="zoom"
          @ready="handler"
        >
          <bm-geolocation
            anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
            :showAddressBar="true"
            :autoLocation="true"
          ></bm-geolocation>
        </baidu-map>
      </div>
    </van-skeleton>
  </div>
</template>

<script>
import { signIn, recodeDaily } from '@/api/api'
import { Image, Cell, Dialog } from 'vant'
// @ is an alias to /src

export default {
  data() {
    return {
      user: [],
      data: [],
      daily: '',
      location: {
        lng: 120.619,
        lat: 31.318
      },
      zoom: 14,
      nowAddress: '',
      baidumap: false,
      attendanceLength: 0,
      loading: true,
      dailyReportShow: false
    }
  },
  components: {
    [Image.name]: Image,
    [Cell.name]: Cell,
    [Dialog.Component.name]: Dialog.Component
  },
  created() {
    if (localStorage.getItem('Login')) {
      //登录了，留在当前页
    } else {
      this.$router.push('/login') // 未登录，跳登录页
    }
    this.user = JSON.parse(localStorage.getItem('User'))
  },
  mounted() {
    signIn({
      userName: this.user.userName,
      password: this.user.password
    }).then(res => {
      this.data = res.data.data
      if (res.data.code == 0) {
        //console.log(this.data[0])
        if (this.data[0].attendance.length) {
          this.attendanceLength = this.data[0].attendance.length
          if (this.attendanceLength == 2) {
            this.baidumap = true
          }
        }
        this.loading = false
      }
    })
  },
  methods: {
    handler() {
      let _this = this
      var geolocation = new window.BMap.Geolocation()
      geolocation.getCurrentPosition(r => {
        _this.location = {
          lng: r.longitude,
          lat: r.latitude
        }
      })
      /* 创建地址解析器的实例 */
      let geoCoder = new window.BMap.Geocoder()
      /* 利用坐标获取地址的详细信息 */
      geoCoder.getLocation(
        new window.BMap.Point(
          _this.location.lng,
          _this.location.lat
        ),
        res => {
          this.nowAddress = res.address
        }
      )
    },
    beforeClose(action, done) {
      if (action === 'confirm') {
        if (!this.daily) {
          this.$toast('请输入日报内容')
          done(false) //不关闭弹框
        } else {
          recodeDaily({
            userId: this.user.userId,
            content: this.daily
          }).then(res => {
            if (res.code == 0) {
              this.$toast(res.data)
            } else {
              console.log(res.message)
            }
          })
          this.data.daily = this.daily
          setTimeout(done, 500)
        }
      } else if (action === 'cancel') {
        done() //关闭
      }
    }
  },
  filters: {
    formatDate: function(e) {
      let date = new Date()
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? '0' + MM : MM
      let d = date.getDate()
      d = d < 10 ? '0' + d : d
      let h = date.getHours()
      h = h < 10 ? '0' + h : h
      let m = date.getMinutes()
      m = m < 10 ? '0' + m : m

      if (e) {
        return y + '年' + MM + '月' + d + '日' + h + ':' + m
      } else {
        return y + '年' + MM + '月' + d + '日'
      }
    },
    getType(value) {
      let result = value
      if (value == 0) {
        result = '上班'
      } else if (value == 1) {
        result = '下班'
      }
      return result
    }
  }
}
</script>
<style>
.van-skeleton {
  margin: 20px auto;
}
.van-hairline--bottom::after {
  border-bottom-width: 0;
}
.user {
  display: flex;
  margin: 5vw;
}
.user-pic {
  width: 138px;
  height: 138px;
}
.user-pic .van-image {
  height: 100%;
}
.user-info {
  margin-left: 5vw;
}
.user-info p {
  font-size: 22px;
}
.user-info .user-name {
  margin: 40px 0 20px;
  font-size: 30px;
}
.user-position {
  vertical-align: sub;
}

.van-doc-block__title .van-cell {
  background-color: #f8f8f8;
  font-size: 22px;
}
.count {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 17px 5vw 41px;
  line-height: 56px;
  font-size: 22px;
}
.count span {
  display: inline-block;
}
.count img {
  height: 56px;
  margin-right: 16px;
  vertical-align: top;
}
.mydaily {
  padding: 15px 5vw 25px;
  text-align: center;
  font-size: 22px;
}
.mydaily p {
  line-height: 50px;
}
.mydaily img {
  width: 56px;
}
.mydaily .mydaily-text {
  text-align: left;
}
.mypunch {
  padding-top: 16px;
  text-align: center;
}
.mypunch p {
  line-height: 70px;
}
.punch-btn {
  display: inline-block;
  width: 135px;
  height: 135px;
  line-height: 135px;
  margin-bottom: 18px;
  border: solid 2px #bdbdbd;
  border-radius: 50%;
}
.location {
  line-height: 58px;
  text-align: left;
  margin-left: 15px;
}
.bm-view {
  width: 100%;
  height: 300px;
}
.punch-text {
  text-align-last: left;
  padding: 10px 20px 0;
  font-size: 22px;
  line-height: 42px;
}
.punch-text p img {
  vertical-align: text-bottom;
  width: 26px;
}
.punch-text .punch-text-2 {
  position: relative;
  font-size: 19px;
  line-height: 35px;
  padding: 12px 0 2px;
}
.punch-text-2::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  /* prettier-ignore */
  height: 2PX;
  width: 55vw;
  background: #cbcbcb;
}
.baidumap {
  display: none;
}
.daily-report {
  box-sizing: border-box;
  width: 90%;
  height: 200px;
  line-height: 40px;
  margin: 30px 13px;
  padding: 10px 14px;
  border: 1px solid #bdbbbe;
}
</style>
