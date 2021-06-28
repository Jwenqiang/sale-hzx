<template lang="pug">
div(:class='{ [$style.wrap]: true, [$style.wrapIOS]: $_device.ios }')
  div(:class='$style.main')
    div(:class='$style.info', @click='state.formSection = "sec202106"')
      van-icon(
        :name='`${$_publicPath}img/i/form.svg`',
        :class='$style.infoFormIcon',
        size='.38rem'
      )/
      span 获取楼盘资料

    base-btn(
      title='欢迎致电售楼处',
      v-tap='[handleClick]',
      :icon='`${$_publicPath}img/i/call.svg`',
      :show-arrow='false',
      :class='$style.btn'
    )/

    the-popup(v-if='showPopup', v-model='showPopup')/
</template>

<script>
import BaseBtn from '@/components/base-btn'
import mixins from '../mixins'
import CurrentDevice from 'current-device'
import ThePopup from './the-popup'

export default {
  name: 'TheYcmtFooterBar',
  mixins: [mixins],
  components: { BaseBtn, ThePopup },

  data() {
    return {
      showPopup: false
    }
  },

  methods: {
    handleClick() {
      if (CurrentDevice.mobile()) {
        location.href = 'tel:4006622712,1030'
      } else {
        this.showPopup = true
      }
    }
  }
}
</script>

<style lang="less" module>
.wrap {
  width: 100%;
  margin: 0 auto;
  max-width: 11.29rem;
  position: fixed;
  bottom: 0;
  padding: 0 0.38rem;
  background: linear-gradient(180deg, #7aa7de 0%, #4370a7 100%);
  overflow: hidden;

  &IOS {
    .ios-safe-area-padding-bottom();
  }
}

.main {
  display: flex;
  align-items: center;
  width: 100%;
  height: @ycmt-footer-bar-height;
}

.info {
  flex-shrink: 0;
  display: flex;
  margin-right: 0.56rem;
  flex-direction: column;
  align-items: center;

  font-size: 0.26rem;
  font-weight: 500;
  color: #fff;
  line-height: 0.37rem;

  &FormIcon {
    margin-bottom: 0.05rem;
  }
}

.btn {
  flex: 1;
  margin-top: 0 !important;
  margin-left: auto !important;
  height: 0.82rem !important;
  animation: scale 4s linear infinite;
}

@keyframes scale {
  0% {
    transform: scale(1);
  }
  12.5% {
    transform: scale(1.1);
  }
  25% {
    transform: scale(1);
  }
  37.5% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
