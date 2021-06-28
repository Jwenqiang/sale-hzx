<template>
  <div :class="$style.wrap" @touchstart="handleTouchStart">
    <!-- 顶部 banner -->
    <the-head />

    <div :class="$style.main">
      <!-- APP 内 -->
      <the-app v-if="$_isApp" />
      <!-- 移动 WEB -->
      <the-web v-else />
    </div>

    <!-- 活动规则 -->
    <the-activity-rules />
  </div>
</template>

<script>
import TheHead from './the-head'
import CurrentDevide from 'current-device'
import { init as initApp, isApp } from '@/common/app'
import importVConsole from '@/plug/vconsole'
import { isDebug } from '@/config'
import { run as runGrowingIO } from '@/common/gio'

export default {
  name: 'appDownloadGift',
  components: {
    TheHead,
    'the-app': () => import('./the-app'),
    'the-web': () => import('./the-web'),
    TheActivityRules: () => import('./the-activity-rules')
  },

  methods: {
    handleTouchStart(evt) {
      if (String(evt.target.tagName).toUpperCase() === 'IMG')
        evt.preventDefault()
    }
  },

  beforeCreate() {
    // for debug
    const debug = false

    if (isDebug || debug) {
      importVConsole(true).catch(err => {
        this.$toast('加载 VConsole 错误 ' + err.message)
      })
    } else {
      runGrowingIO('track', 'clickmonitor', {
        location: this.$route.query.utm_source
      })
    }

    this.$_isDesktop = CurrentDevide.desktop()
    this.$_isTablet = CurrentDevide.tablet()
    this.$_isMobile = CurrentDevide.mobile()
    // this.$_isIOS = CurrentDevide.ios()
    this.$_isApp = isApp
    // this.$_isApp = true // for debug
    if (isApp) {
      initApp()
    }
  }
}
</script>

<style lang="less" module>
.wrap {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 7.5rem;
  min-height: 100%;
  text-align: center;
  background: var(--primary-background);
}

.main {
  margin-top: -0.6rem;
}
</style>
