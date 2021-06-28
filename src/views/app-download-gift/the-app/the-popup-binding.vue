<template>
  <!-- 绑定经纪人 popup -->
  <van-popup
    :value="value"
    :class="$style.popup"
    :close-on-click-overlay="false"
    @click-overlay="handleClose()"
    @opened="$_opened = true"
  >
    <div :class="$style.wrap">
      <img :src="$_bgImg" :class="$style.imgBg" @touchend="goToBingding()" />

      <!-- 确认按钮 -->
      <base-btn :class="$style.confirmBtn" @click="goToBingding()"
        >立即添加</base-btn
      >

      <!-- 关闭按钮 图标 -->
      <img
        v-tap="[handleClose]"
        @click="handleClose()"
        :src="$_publicPath + 'img/i/close.png'"
        :class="$style.close"
      />
    </div>
  </van-popup>
</template>

<script>
import BaseBtn from '../components/base-btn'
import goToBingding from '../lib/go-to-binding'

export default {
  name: 'AppDownloadPopup',
  components: { BaseBtn },
  props: {
    value: Boolean,
    btnText: String
  },

  methods: {
    handleClose() {
      // 判断防止点击后立刻触发事件导致关闭
      if (this.$_opened) {
        this.$_opened = false
        this.$emit('input', false)
      }
    },

    /**
     * 跳转到绑定经纪人
     */
    goToBingding() {
      this.$emit('input', false)
      goToBingding()
    }
  },

  beforeCreate() {
    this.$_bgImg = require('@root/public/img/app-download/bg-binding.png')
  }
}
</script>

<style lang="less" module>
.popup {
  background-color: transparent;
  width: 90%;
  max-width: 7rem;
}

.wrap {
  /** 确认按钮（立即添加） */
  & > .confirmBtn {
    margin: 0 auto !important;
    width: 60%;
    transform: translate3d(0, -60%, 0);
  }
}

/** 背景图片 */
.imgBg {
  display: block;
  width: 100%;
}

.main {
  width: 100%;
  padding: 0.3rem 0.25rem 0.8rem;
  background-color: #fff;
  border-radius: 0.08rem;
  background-image: linear-gradient(0deg, #e01115, #fe6601);

  &Tip {
    margin-bottom: 0.3rem;
    font-size: 0.38rem;
  }
}

.content {
  /** 出口装饰 */
  &Port {
    padding: 0.2rem;
    background: #6f1000;
    background-image: linear-gradient(0deg, #fe6601, lighten(#fe6601, 10%));
    border-radius: 0.1rem;

    &:before {
      content: '';
      display: block;
      height: 0.2rem;
      background-color: #333;
    }
  }

  /** 表单区域 */
  &Form {
    position: relative;
    margin: -0.4rem 0.3rem 0.3rem;
    padding: 0.5rem 0.2rem;
    border-radius: 0.02rem 0.02rem 0.15rem 0.15rem;
    background-color: #fff;

    /** 顶部黑-透明渐变 */
    &:before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 0.2rem;
      content: '';
      display: block;
      background-image: linear-gradient(0deg, transparent, rgba(0, 0, 0, 0.3));
    }

    &Title {
      font-size: 0.35rem;
      font-weight: 500;
    }

    &Input {
      margin-top: 0.3rem;
      font-size: 0.32rem;
      font-weight: 500;
      text-align: center;
      border: 1px solid #eee;
      border-radius: 0.1rem;
      padding: 0 0.15rem !important;
      line-height: 0.7rem !important;

      :global(.van-field__control) {
        text-align: center;
        // &::placeholder {
        //   font-size
        // }
      }
    }

    &Btn {
      padding: 0.2rem 0;
      border-radius: 0.05rem;
      font-size: 0.25rem;

      &Confirm {
        margin-top: 0.35rem;
      }

      &Cancel {
        margin-top: 0.1rem;
      }
    }
  }
}

.tipText {
  margin-bottom: 0.8rem;
  font-size: 0.26rem;
  color: #555;
  text-align: center;
}

/** 关闭按钮 */
.close {
  margin: 0 auto;
  display: block;
  width: 0.69rem;
  height: 0.69rem;
}
</style>
