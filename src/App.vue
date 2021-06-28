<template lang="pug">
.app.vars-default(:class='varsClassName')
  photo-swipe(ref='pswp')/
  router-view/
</template>

<script>
import '@/plug/photo-swipe'
import PhotoSwipe from '@/components/photo-swipe'
import CurrentDevide from 'current-device'
import { log, upLog } from './common/trace'
import { isDebug } from './config'
log('CurrentDevide: ', JSON.stringify(CurrentDevide))

export default {
  name: 'App',
  components: { PhotoSwipe },
  computed: {
    varsClassName: ({ $route }) => {
      const name = $route.meta.varsRouteName || $route.name
      return name ? `vars-${name}` : null
    }
  },

  watch: {
    $route(to) {
      if (!isDebug) {
        const up = {
          an: this.$route.name,
          av: this.$route.meta.version,
          route: this.$route
        }
        const meta = document.querySelector('meta[name="commit"]')
        if (meta) {
          up.ac = meta.content
          up.isClean = meta.getAttribute('data-is-clean')
        }
        upLog(up)
      }

      if (to.meta.typ === 0) {
        // 楼盘单页
        this.$nextTick(() => {
          this.$el.scrollTop = 0
        })
      }
    }
  },

  mounted() {
    this.$root.$_pswp = this.$refs.pswp.$el
  }
}
</script>

<style lang="less">
.app {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
