<template>
  <div :class="$style.wrap">
    <div :class="$style.main" ref="main" @click="next()">
      <div v-if="size" :class="$style.prize" ref="swiper" :style="style" />
    </div>
  </div>
</template>

<script>
// import { throttle } from 'lodash'
import prizeList from '../prize-list'

const easeSpeed = 5 // 加速度/减速度

export default {
  name: 'TheScrollPrize',
  props: {
    value: { type: Number, default: 0 }, // active index
    loop: { type: Boolean, default: true },
    speed: { type: Number, default: 10 }
  },

  data() {
    return {
      list: prizeList.call(this).map(item => ({ ...item, active: false })),
      offsetTop: 0,
      size: 0,
      scrollPos: 0,

      curSpeed: 0 // 实际速度
    }
  },

  computed: {
    style: ({ size, scrollPos, $_publicPath }) => {
      return {
        width: size + 'px',
        height: '100%',
        backgroundImage: `url(${$_publicPath}img/app-download/prize.png)`,
        backgroundPosition: '0 ' + scrollPos + 'px'
      }
    }
  },

  methods: {
    next() {
      this.$emit('input', this.value + 1)
    },

    // logSpeed: throttle(function () {
    //   console.log(this.id, ...arguments)
    // }, 100),

    animate() {
      const index = this.value
      const loop = this.loop
      const scrollPos = this.scrollPos
      const targetPos = this.size * -index + this.offsetTop

      // /** speed calculate */
      // const speed = parseInt(this.speed * 100)
      // let curSpeed = parseInt(this.curSpeed * 100)
      // if (curSpeed > speed) {
      //   curSpeed -= easeSpeed
      //   if (curSpeed <= speed) {
      //     curSpeed = speed
      //     this.$emit('toSpeed')
      //   }
      // } else if (curSpeed < speed) {
      //   curSpeed += easeSpeed
      //   if (curSpeed >= speed) {
      //     curSpeed = speed
      //     this.$emit('toSpeed')
      //   }
      // }
      // curSpeed = curSpeed / 100
      // this.curSpeed = curSpeed

      const speed = parseInt(this.speed * 100)
      let curSpeed = parseInt(this.curSpeed * 100)
      let to
      if (speed) {
        // 加减速度到非0
        if (curSpeed > speed) {
          curSpeed -= easeSpeed
          if (curSpeed <= speed) {
            curSpeed = speed
            this.$emit('toSpeed')
          }
        } else if (curSpeed < speed) {
          curSpeed += easeSpeed
          if (curSpeed >= speed) {
            curSpeed = speed
            this.$emit('toSpeed')
          }
        }
        curSpeed = curSpeed / 100
        this.curSpeed = curSpeed
        to = scrollPos - curSpeed
      } else {
        /**
         * 减速到 0
         */

        // 另一个实现方式，与加速不一致会导致速度突然变化，视觉上不流畅，暂不使用
        // let sp = (this.sp = this.sp || scrollPos) // start scroll position
        // let remaining = (this.rem = this.rem || scrollPos - targetPos) // remaining size
        // let reduceStartTime = (this.rst = this.rst || ts) // reduce start time

        // let pos = sp - (ts - reduceStartTime) * (remaining / 1000)
        // to = pos

        const size = this.size
        const remaining = scrollPos - targetPos
        const _speed = (remaining / 120) * 100
        const minSpeed = (size / 120) * 100
        curSpeed -= easeSpeed
        if (curSpeed < _speed) {
          curSpeed = curSpeed < minSpeed ? minSpeed : _speed
        }
        to = scrollPos - curSpeed / 100
        this.curSpeed = curSpeed / 100
      }

      let scrollEnd = false

      if (scrollPos > targetPos) {
        if (to < targetPos) {
          // 滚动完成
          if (loop) {
            this.$emit('input', index + 1)
          } else {
            to = targetPos
            scrollEnd = true
            this.handleScrollEnd()
            // window.cancelAnimationFrame(this.$_animNum)
          }
        }

        this.scrollPos = to
      } else {
        // <=
        if (loop) {
          this.$emit('input', index + 1)
        } else {
          this.scrollPos = targetPos
          scrollEnd = true
          this.handleScrollEnd()
          // window.cancelAnimationFrame(this.$_animNum)
        }
      }
      // console.log(Date.now())

      if (!scrollEnd)
        this.$_animNum = window.requestAnimationFrame(this.animate)
    },

    handleScrollEnd() {
      this.$emit('scrollEnd')
      // this.rst = this.rem = this.sp = 0
    },

    resetSize() {
      const width = this.$refs.main.clientWidth
      if (width != this.size) {
        // window.console.log('resetSize in scroll prize')
        const offsetTop = (this.$refs.main.clientHeight - width) / 2
        this.offsetTop = offsetTop
        this.scrollPos = offsetTop
        this.size = width
      }
    },

    async keepSize() {
      const timeout = 300
      let totalTimeout = 0
      while (totalTimeout < 9000) {
        totalTimeout += timeout
        this.resetSize()
        await new Promise(resolve => {
          setTimeout(resolve, timeout)
        })
      }
    }
  },

  beforeCreate() {
    const list = prizeList.call(this)
    this.$_prizeList = list
    this.$_len = list.length
  },

  mounted() {
    this.$nextTick(() => {
      this.keepSize()

      // this.initSwiper()
      window.requestAnimationFrame(this.animate)
    })
  }
}
</script>

<style lang="less" module>
.wrap {
  display: flex;
  justify-content: center;
}

.main {
  width: 1.73rem;
  height: 2.11rem;
  background-color: #fff;
  border-radius: 0.1rem;
  overflow: hidden;
}

.scroll {
  &Item {
    display: block;
    transition-property: transform;
    // transition-duration: 0.3s;
    transition-timing-function: linear;

    &Faster {
      transition-duration: 300ms;
    }

    &Normal {
      transition-duration: 1000ms;
    }

    &Slow {
      transition-duration: 1500ms;
    }
  }
}

.prize {
  background-repeat: repeat;
  background-size: cover !important;
  background-position: 0 0;
}
</style>
