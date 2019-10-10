<template>
  <div class="list">
    <van-nav-bar title="我的考勤" />
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
          <span> {{ dailyList.date | dailyDate }}</span>
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
      }
    )
  },
  filters: {
    dailyDate(e) {
      var date = new Date(e)
      return date.getHours() + ':' + date.getMinutes()
    }
  }
}
</script>
<style>
.van-collapse {
  margin-top: 20px;
  background: #f8f8f8;
}
.van-collapse .van-cell {
  font-size: 22px;
  background: #f8f8f8;
}
.van-cell:not(:last-child)::after {
  border-bottom: 1px solid #fff;
}

.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border-color: #fff;
}
.van-collapse p {
  font-size: 20px;
}
.daily-icon {
  display: inline-block;
  background-size: 100%;
  width: 34px;
  height: 34px;
  vertical-align: text-bottom;
}
.daily-icon.type0 {
  background: url(../assets/images/type0.png) center;
}
.daily-icon.type1 {
  background: url(../assets/images/type1.png) center;
}
</style>
