<template>
  <!-- 跑马灯 -->
  <div :class="$style.wrap">
    <div
      :class="$style.anim"
      :style="{ animationDuration: mobiles.length * 3 + 's' }"
    >
      <div v-for="i of marquees" :class="$style.marquee" ref="marquee" :key="i">
        <div v-for="item of mobiles" :class="$style.text" :key="item.id">
          {{ item.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetAllPrizeUser } from '../lib/request'

export default {
  name: 'TheMarquee',
  data() {
    return {
      marquees: [0, 1],

      mobiles: [
        { id: Math.random(), text: '用户 185****5533获得健身杯' },
        { id: Math.random(), text: '用户 137****5082获得毛毡记事本' }
      ]
    }
  },

  methods: {
    /**
     * 跑马灯数据加载
     */
    async refresh() {
      const { Src } = await GetAllPrizeUser()
      this.mobiles = Src.Mobiles.map(txt => ({
        id: Math.random(),
        text: ' ' + txt + ' '
      }))
    }
  },

  created() {
    this.refresh()
  }
}
</script>

<style lang="less" module>
.wrap {
  position: relative;
  margin-top: 1.15rem;
  padding: 0.09rem 0.24rem;
  background: #e89305;
  border: 0.01px solid #ffe88e;
  border-radius: @border-radius-max;
  height: 0.41rem;
  display: flex;
  justify-content: flex-start;
  white-space: nowrap;
  overflow: hidden;

  /** font style */
  font-size: 0.24rem;
  font-weight: 400;
  color: #f5f5f5;
  line-height: 1;
}

.marquee {
  flex-shrink: 0;
  display: flex;
}

.text {
  padding-left: 0.5rem;
}

.anim {
  display: flex;
  animation: anim 120s linear infinite;

  @keyframes anim {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(-50%, 0, 0);
    }
  }
}
</style>
