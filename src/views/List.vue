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
          {{ dailyList }}
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
  methods: {}
}
</script>
<style>
.van-collapse {
  margin-top: 20px;
  background: #f8f8f8;
}
.van-collapse .van-cell {
  font-size: 22px;
}
.van-collapse p {
  font-size: 20px;
}
</style>
