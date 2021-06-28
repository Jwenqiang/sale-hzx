<template>
  <van-popup
    :value="value"
    :close-on-click-overlay="false"
    @click-overlay="handleClose()"
    :class="$style.popup"
  >
    <div :class="$style.wrap">
      <div :class="$style.title">扫码拨号</div>
      <div :class="$style.tip">微信扫码，免费致电售楼处</div>
      <img
        src="https://sz.centanet.com/wxqcode/129355_0755_1023_4006622712.jpg"
        :class="$style.qrImg"
      />
      <base-btn :class="$style.btn" title="我知道了" @click="handleClose()" />
    </div>
  </van-popup>
</template>

<script>
import BaseBtn from '@/components/base-btn'

export default {
  name: 'FooterPopup',
  components: { BaseBtn },
  props: {
    value: Boolean
  },

  methods: {
    popupContainer() {
      return this.$root.$el
    },

    handleClose() {
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="less" module>
.popup {
  border-radius: 0.05rem;
  width: 100%;
  max-width: 3.5rem;
}

.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.3rem;

  .btn {
    font-size: 0.2rem;
    height: auto;
    padding: 0.12rem 0 !important;
    max-width: 60%;
  }
}

.title {
  margin-bottom: 0.12rem;
  font-size: 0.3rem;
  font-weight: 500;
}

.tip {
  margin-bottom: 0.3rem;
  font-size: 0.16rem;
}

.qrImg {
  display: block;
  width: 1.5rem;
}
</style>
