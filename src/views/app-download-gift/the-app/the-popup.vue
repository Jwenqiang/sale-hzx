<template>
  <!-- Popup 抽奖提示-->
  <van-popup
    :value="value"
    :class="$style.popup"
    :close-on-click-overlay="false"
    @click-overlay="handleClose()"
  >
    <div :class="$style.wrap">
      <img :src="$_bgMap[type]" :class="$style.bgImg" />
      <base-btn :class="$style.confirmBtn" @click="handleClick()">{{
        btnText
      }}</base-btn>

      <!-- 关闭按钮 图标 -->
      <img
        v-tap="[handleClose]"
        :src="$_publicPath + 'img/i/close.png'"
        :class="$style.close"
      />
    </div>
  </van-popup>
</template>

<script>
import BaseBtn from '../components/base-btn'
import { defaultAppShareObject, trackClickMonitor } from '../lib/config'
import { openShare } from '@/common/app'

export default {
  name: 'AppDownloadPopup',
  components: { BaseBtn },
  props: {
    value: Boolean,
    type: Number,
    btnText: String
  },

  methods: {
    handleClose() {
      this.$emit('input', false)
    },

    /**
     * 按钮点击
     */
    handleClick() {
      // gio
      // trackClickMonitor.call(this, '分享-' + this.$_textMap[this.type])
      trackClickMonitor.call(this, '分享按钮点击', false)

      openShare({ shareInfo: defaultAppShareObject })
    }
  },

  beforeCreate() {
    this.$_bgMap = [
      require('@root/public/img/app-download/popup_no_permission_tiny.png'),
      require('@root/public/img/app-download/popup_thanks_tiny.png'),
      require('@root/public/img/app-download/popup_took_tiny.png')
    ]
    this.$_textMap = ['不符合参与资格', '没有中奖', '已参加过']
  }
}
</script>

<style lang="less" module>
.popup {
  background-color: transparent;
  width: 80%;
  max-width: 7rem;
}

.wrap {
  position: relative;
  // .flex-column-center();
}

.bgImg {
  display: block;
  width: 100%;
}

.tipText {
  margin-bottom: 0.8rem;
  font-size: 0.26rem;
  color: #555;
  text-align: center;
}

/** 确认按钮（立即分享） */
.confirmBtn {
  margin: 0 auto !important;
  width: 60%;
  transform: translate3d(0, -150%, 0);
}

/** 关闭按钮 */
.close {
  margin: 0 auto;
  display: block;
  width: 0.69rem;
  height: 0.69rem;
}
</style>
