<template>
  <div class="list">
    <van-nav-bar
      left-arrow
      title="我的考勤"
      @click-left="onClickLeft"
    />
    <van-collapse v-model="activeNames">
      <van-collapse-item
        :title="daily.date"
        v-for="daily in daily"
        :key="daily.date"
      >
        <p
          v-for="dailyList in daily.list"
          :key="dailyList.id"
        >
          <span
            class="daily-icon"
            :class="'type' + dailyList.type"
          ></span>
          <span class="daily-time">{{
            dailyList.date | dailyDate
          }}</span>
          {{ dailyList.address }}
        </p>
        {{ daily.content }}
      </van-collapse-item>
    </van-collapse>
  </div>
</template>
<script>
import { getAllDailyAndAttendance } from '@/api/api'
import { Cell, Collapse, CollapseItem } from 'vant'
export default {
  data() {
    return {
      user: [],
      activeNames: [],
      daily: []
    }
  },
  components: {
    [Cell.name]: Cell,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('User'))
    let userId = this.user.userId
    getAllDailyAndAttendance({ userId: userId }).then(
      res => {
        this.daily = res.data
        console.log(this.daily)
      }
    )
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
  },
  filters: {
    dailyDate(e) {
      var date = new Date(e)
      return date.getHours() + ':' + date.getMinutes()
    }
  }
}
</script>
<style scoped>
.list >>> .van-nav-bar .van-icon {
  color: #99a;
}
.list >>> .van-collapse {
  margin-top: 20px;
  background: #f8f8f8;
}
.list >>> .van-collapse .van-cell {
  font-size: 22px;
  background: #f8f8f8;
}
.list >>> .van-cell:not(:last-child)::after {
  border-bottom: 1px solid #fff;
}

.list >>> .van-hairline--top-bottom::after,
.list >>> .van-hairline-unset--top-bottom::after {
  border-color: #fff;
}
.list >>> .van-collapse p {
  font-size: 20px;
  line-height: 34px;
  margin-bottom: 7px;
}
.daily-time {
  display: inline-block;
  color: #333;
  font-size: 22px;
  margin: 0 18px 0 7px;
}
.daily-icon {
  display: inline-block;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 0 center;
  width: 34px;
  height: 34px;
  vertical-align: middle;
}
.daily-icon.type0 {
  background-image: url(../assets/images/type0.png);
}
.daily-icon.type1 {
  background-image: url(../assets/images/type1.png);
}
</style>
