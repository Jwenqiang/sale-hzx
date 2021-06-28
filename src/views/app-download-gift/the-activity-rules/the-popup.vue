<template lang="pug">
van-popup(
  :value='value',
  :class='$style.popup',
  :overlay-class='$style.popupOverlay',
  @click-overlay='handleClose()'
)
  div(:class='$style.wrap')
    div(
      :class='$style.main',
      :style='{ backgroundImage: `url(${$_publicPath}img/app-download/activity-rules-bg.png)` }'
    )
      div(:class='$style.desc')
        div 1、活动时间：即日起至2021年12月31日。
        div 2、活动期间下载注册中原找房App，添加专属经纪人，即获抽奖机会。
        div 3、本活动仅限通过活动海报扫码下载的新用户。每位新用户只能参与1次，且不支持老用户参与。
        div 4、实物奖励发放：实物礼品将于中奖后的15个工作日内安排寄出；活动期间，用户未填写收件信息或填写不完整，视为放弃奖励。因收货信息填写错误导致没有收到礼品的，礼品不补发。礼品收货地仅限深圳市，外地地址均不安排礼品配送。
        div 5、未尽事宜可详询活动主办方中原地产代理（深圳）有限公司。

      base-btn(:class='$style.btnConfirm', @click='handleClose()') 我知道了

    //- 关闭按钮 图标
    div(
      :class='$style.closeWrap',
      v-tap='[handleClose]',
      @click='handleClose()'
    )
      img(:src='$_publicPath + "img/i/close.png"', :class='$style.close')/
</template>

<script>
import BaseBtn from '../components/base-btn'

export default {
  name: 'ActivityRulesPopup',
  components: { BaseBtn },
  props: {
    value: Boolean
  },

  methods: {
    handleClose() {
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="less" module>
.popup {
  width: 100%;
  background-color: transparent;
}

.wrap {
  width: 100%;
  max-width: 7.5rem;
  margin: 0 auto;
  padding: 0.3rem 0.63rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main {
  padding: 1.61rem 0.49rem 0;
  background-color: #fff;
  border-radius: 0.1rem;
  background-repeat: no-repeat;
  background-size: contain;
}

.desc {
  padding: 0.45rem 0.28rem;
  font-size: 0.26rem;
  font-weight: 400;
  text-align: left;
  color: #666;
  height: 5.64rem;
  overflow: auto;
  line-height: 0.48rem;
  border-radius: 0.1rem;
  box-shadow: 0 0 0.3rem #ccc;
  background-color: #fff;
}

.btnConfirm {
  margin: 0.3rem auto 0.45rem !important;
  width: 3.75rem;
  color: #a12a05;
}

.close {
  display: block;
  width: 100%;
  // height: 100%;

  &Wrap {
    margin-top: 0.78rem;
    width: 0.69rem;
    // height: 0.69rem;

    @media screen and (min-width: 750px) {
      display: none;
    }
  }
}

.popup {
  &Overlay {
    background-color: rgba(0, 0, 0, 0.6);
  }
}
</style>
