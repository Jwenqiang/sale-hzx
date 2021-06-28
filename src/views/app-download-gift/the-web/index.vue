<template>
  <!--
    WEB 页面结构：
    .wrap
      .main // 主要活动区
        .form // 表单区域
          .formTip(v-if="登记完成") // 登记完成
          .formInput(v-else) // 未登记，进行表单登记

          .formSubmit // 大按钮，申请参与或参与活动

        .mainFoot // 下方区域容器
          .steps // 参与流程
          .prize // 奖品列表

    -->
  <div :class="$style.wrap">
    <div :class="$style.main">
      <!-- 背景图 -->
      <img
        :class="$style.mainBg"
        :src="$_publicPath + 'img/app-download/bg-m-web.png'"
      />

      <!-- 表单登记 -->
      <div :class="$style.form">
        <div v-if="isLogin" :class="$style.formTip">
          <div>恭喜你获得参与资格<br />请前往中原找房APP参与活动</div>
          <div :class="$style.formTipNormal">活动入口：个人中心－线下有礼</div>
        </div>

        <div v-else :class="$style.formInput">
          <van-field
            v-model="mobile"
            type="number"
            placeholder="请输入您的手机号"
            :class="[$style.input, $style.inputMobile]"
          />

          <div :class="$style.formBlock">
            <van-field
              v-model="captcha"
              placeholder="请输入短信验证码"
              :class="[$style.input, $style.inputCaptcha]"
            />
            <van-button
              type="danger"
              :class="$style.formBtnCaptcha"
              @click="getCaptcha()"
            >
              <span>获取验证码</span>
              <span v-if="captchaDelay">({{ captchaDelay }}s)</span>
            </van-button>
          </div>
        </div>

        <img
          :class="$style.formSubmit"
          :src="btnSubmitSrc"
          @touchstart="handleTouchEvent"
          @touchend="handleTouchEvent"
          @touchcancel="handleTouchEvent"
          @mousedown="handleTouchEvent"
          @mouseup="handleTouchEvent"
        />
      </div>

      <!-- 下方区域 -->
      <div :class="$style.mainFoot">
        <!-- 参与流程 -->
        <the-steps />

        <!-- 奖品列表 -->
        <the-prize-list />
      </div>
    </div>
  </div>
</template>

<script>
import TheSteps from './the-steps'
import ThePrizeList from '../the-prize-list'
import preloadImage from '../lib/preload-img'
import { isDebug } from '@/config'
import wxShare from '../lib/wx-share'
import {
  CheckIsColleague,
  RegisterInfoByPhone,
  SendSmsCodeAsync,
  SubmitUserInfo
} from '../lib/request'
import { trackClickMonitor } from '../lib/config'
import { upLog } from '../../../common/trace'

export default {
  name: 'TheWeb',
  components: { TheSteps, ThePrizeList },

  data() {
    return {
      isLogin: false,
      mobile: '',
      captcha: '',
      captchaDelay: 0, // 下次验证码发送剩余时间

      touching: false
    }
  },

  computed: {
    btnSubmitSrc: ({ touching, isLogin, $_btnMap }) =>
      $_btnMap[isLogin][0 + touching]
  },

  methods: {
    reduceCaptchDelay() {
      const delay = this.captchaDelay - 1
      if (delay > 0) {
        setTimeout(this.reduceCaptchDelay, 1000)
        this.captchaDelay = delay
      } else {
        this.captchaDelay = 0
      }
    },

    /**
     * 获取验证码
     */
    async getCaptcha() {
      try {
        if (this.captchaDelay > 0) {
          this.$toast('验证码发送太快了')
          return
        }

        /**
         * validate mobile
         */
        const mobile = this.mobile.trim()
        if (!mobile || !/^1[2-9]\d{9}$/.test(mobile)) {
          this.$toast({ message: '请输入正确的手机号码' })
          return
        }

        /**
         * validate colleague
         */
        const is = await CheckIsColleague(mobile)
        if (is) {
          this.$toast('内部员工不能参与活动哦！')
          return
        }

        const toastLoading = this.$toast.loading({
          message: '发送中',
          forbidClick: true,
          duration: 0
        })

        /**
         * check mobile exists
         */
        const { Src: isExists } = await RegisterInfoByPhone(mobile)
        if (isExists) {
          toastLoading.clear()
          this.$toast({ message: '活动仅限新用户参与哦！' })
          return
        }

        /**
         * send sms code
         */
        const { data } = await SendSmsCodeAsync(mobile)
        toastLoading.clear()

        if (data) {
          this.$toast('验证码已发送')
          this.captchaDelay = 60
          this.reduceCaptchDelay()
        } else {
          this.$toast('发送失败，请重试')
        }
      } catch (err) {
        this.$_error(err)
        this.$toast('网络错误')
      }
    },

    /**
     * 提交
     */
    async handleSubmit() {
      // // for debug
      // if (document.title) {
      //   this.isLogin = true
      //   return
      // }

      /**
       * 已登记
       */
      if (this.isLogin) {
        this.$toast('即将前往App参与活动')
        location.href = `https://datayi.cn/oBWX8Yd?source=appxiazaiyouli&type=${this.$route.query.utm_source}&content=xzyl&note=20210419`
        return
      }

      /**
       * 未登记
       */
      const mobile = this.mobile.trim()
      const captcha = this.captcha.trim()
      if (!mobile || !/^1[2-9]\d{9}$/.test(mobile)) {
        this.$toast({ message: '请输入正确的手机号码' })
        return
      } else if (!captcha) {
        this.$toast({ message: '请输入正确的验证码' })
        return
      }

      this.$toast.loading({
        message: '登记中',
        forbidClick: true,
        duration: 0
      })

      try {
        const query = this.$route.query
        const { Msg } = await SubmitUserInfo(
          mobile,
          captcha,
          query.utm_source || ''
        )
        this.isLogin = true
        this.$toast(Msg)
      } catch (err) {
        this.$toast({ message: err.message })
      }
    },

    /**
     * 按钮点击事件
     */
    handleTouchEvent(evt) {
      const typ = evt.type
      this.touching = typ === 'touchstart' || typ === 'mousedown'

      if (typ === 'touchend' || typ === 'mouseup') {
        if (isDebug && evt.ctrlKey) {
          // for debug
          this.isLogin = true
        } else {
          // for production
          this.handleSubmit()

          // gio
          if (!this.isLogin) trackClickMonitor.call(this, '获取资格', false)
        }
      }

      return false
    }
  },

  beforeCreate() {
    const poublicPath = this.$_publicPath
    // 对应结构见上方 computed.btnSubmitSrc 代码
    const btnMap = {
      true: [
        poublicPath + 'img/app-download/web-submit.png',
        poublicPath + 'img/app-download/web-submit-press.png'
      ],
      false: [
        poublicPath + 'img/app-download/web-submit-app.png',
        poublicPath + 'img/app-download/web-submit-app-press.png'
      ]
    }
    preloadImage(btnMap[false][1])
    preloadImage(btnMap[true][0])
    preloadImage(btnMap[true][1])
    this.$_btnMap = btnMap
  },

  created() {
    // 微信分享
    wxShare().catch(err => {
      upLog({ typ: 'initWxShare', err: err.message })
    })
  }
}
</script>

<style lang="less" module>
@import '../index';

.main {
  position: relative;
  padding: 0 0.26rem;

  &Bg {
    display: block;
    width: 100%;
  }

  &Foot {
    .mainFoot();
  }
}

/** 表单填写 */
.form {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 1.06rem;
  left: 0;
  width: 100%;
  height: 4.86rem;

  /** 登记完成、表单输入 */
  &Tip,
  &Input {
    height: 2.82rem;
  }

  &Tip {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 0.4rem;
    font-weight: 600;
    color: #ed162b;
    line-height: 0.5rem;

    /** 活动入口小字 */
    &Normal {
      margin-top: 0.2rem;
      font-size: 0.26rem;
      font-weight: 400;
      color: #333;
    }
  }

  /** 登记表单输入 */
  &Input {
    padding: 0.36rem 1.15rem;
    width: 100%;
  }

  &Block {
    display: flex;
    align-items: stretch;
    margin-top: 0.4rem;
  }

  &BtnCaptcha {
    flex-shrink: 0;
    width: 2.3rem;
    white-space: nowrap;
    height: auto !important;
    background-image: linear-gradient(-30deg, #f33648, #f33648);
    border-radius: 0.1rem !important;
    box-shadow: 0 -0.02rem 0.05rem rgba(0, 0, 0, 0.5);
  }

  &Submit {
    display: block;
    margin-top: auto;
    width: 2.5rem;
    user-select: none;
    cursor: pointer;
  }
}

/** 页面输入框 */
.input {
  padding: 0 0.21rem !important;
  line-height: 0.8rem !important;
  border-radius: 0.1rem;
  font-size: 0.3rem;
  font-weight: 400;

  :global(.van-field__control) {
    &::placeholder {
      color: #febb1e;
    }
  }

  &Captcha {
    margin-right: 0.19rem;
  }
}
</style>
