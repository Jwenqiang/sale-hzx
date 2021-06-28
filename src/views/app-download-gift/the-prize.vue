<template>
  <div class="app-download-prize" :style="styles" />
</template>

<script>
export default {
  name: 'AppDownloadPrizeItem',
  props: {
    index: { type: Number, default: 0 },
    size: { type: Number }
  },

  data() {
    return {
      computedSize: this.size
    }
  },

  computed: {
    styles: ({ size, computedSize, $_publicPath, index }) => {
      const styles = {
        height: computedSize + 'px',
        backgroundImage: `url(${$_publicPath}img/app-download/prize.png)`,
        backgroundPosition: `0 ${-index * 100}%`
      }
      if (size) {
        styles.width = size + 'px'
        styles.height = size + 'px'
      }
      return styles
    }
  },

  methods: {
    /**
     * 根据尺寸重设样式
     * @returns 返回尺寸和原尺寸出现差异
     */
    resetSize() {
      if (this.size) return false

      const width = this.$el.clientWidth
      // window.console.log(
      //   `resetSize, width: ${width}, computedSize: ${this.computedSize}`
      // )
      if (width !== this.computedSize) {
        this.computedSize = width
        return true
      }

      return false
    },

    async keepSize() {
      const timeout = 300
      let totalTimeout = 0
      // let changed = false
      while (/** !changed && */ totalTimeout <= 9000) {
        this.resetSize()
        await new Promise(resolve => {
          setTimeout(() => {
            // changed = this.resetSize()
            totalTimeout += timeout
            resolve()
          }, timeout)
        })
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.keepSize()
    })
  }
}
</script>

<style lang="less">
.app-download-prize {
  position: relative;
  width: 100%;
  // overflow: hidden;
  background-size: cover !important;

  &-img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>
