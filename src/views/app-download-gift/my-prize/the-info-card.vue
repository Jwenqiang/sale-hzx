<template>
  <!-- 收件信息卡片 -->
  <div>
    <the-card>
      <template v-if="adrInfo && adrInfo.Name">
        <div :class="$style.head">
          <span :class="$style.headTitle">收件信息</span>
          <a
            href="javascript:;"
            :class="$style.headBtnEdit"
            @click="visibleForm = true"
            >重新编辑</a
          >
        </div>
        <div :class="$style.body">
          <div :class="$style.adrItem">
            <span :class="$style.adrItemLabel">姓名：</span>
            <span>{{ adrInfo.Name }}</span>
          </div>
          <div :class="$style.adrItem">
            <span :class="$style.adrItemLabel">手机号：</span>
            <span>{{ adrInfo.AddrMobile }}</span>
          </div>
          <div :class="$style.adrItem">
            <span :class="$style.adrItemLabel">收货地址：</span>
            <span>{{ adrInfo.Address }}</span>
          </div>
        </div>
      </template>

      <div v-else :class="$style.empty">
        <van-button round :class="$style.emptyBtn" @click="visibleForm = true"
          >填写收货地址</van-button
        >
      </div>
    </the-card>

    <van-popup
      v-model="visibleForm"
      :close-on-click-overlay="false"
      :class="$style.popup"
      :get-container="popupContainer"
    >
      <div :class="$style.popupWrap">
        <img
          :src="`${$_publicPath}img/app-download/form-adr-bg.png`"
          :class="$style.popupHeadBackground"
        />
        <div :class="$style.popupMain">
          <van-field
            :class="$style.popupInput"
            label="收货人"
            maxlength="10"
            label-width="1.08rem"
            v-model="inputAdr.Name"
          />
          <van-field
            :class="$style.popupInput"
            label="手机号码"
            maxlength="11"
            label-width="1.08rem"
            v-model="inputAdr.AddrMobile"
          />
          <van-field
            :class="$style.popupInput"
            label="填写地区"
            maxlength="50"
            label-width="1.08rem"
            v-model="inputAdr.District"
          />
          <van-field
            :class="$style.popupInput"
            label="详细地址"
            maxlength="100"
            label-width="1.08rem"
            placeholder="街道、小区及门栋号"
            v-model="inputAdr.Address"
          />
          <base-btn :class="$style.popupSubmit" @click="handleSubmit()"
            >提交</base-btn
          >
          <div :class="$style.popupTip">
            中原地产保障您的隐私安全，联系方式不会外泄。<br />您填写的收件信息将作为邮寄奖品使用，请确保信息的准确性。
          </div>
        </div>

        <div :class="$style.popupClose">
          <img
            @click="visibleForm = false"
            :class="$style.popupCloseImg"
            :src="`${$_publicPath}img/i/close.png`"
          />
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import TheCard from './the-card'
import BaseBtn from '../components/base-btn'
// import { isDebug } from '@/config'
import { SendAddress } from '../lib/request'

export default {
  name: 'TheInfoCard',
  components: { TheCard, BaseBtn },
  props: {
    adrInfo: Object
  },

  data() {
    return {
      // loading: false,
      visibleForm: false,
      inputAdr: { ...(this.adrInfo || {}) }
    }
  },

  methods: {
    popupContainer() {
      return this.$root.$el
    },

    /**
     * 设置异步为可能需要后端请求验证做准备
     */
    async validate() {
      const input = this.inputAdr
      const name = String(input.Name || '').trim()
      const mobile = String(input.AddrMobile).trim()
      const adr = String(input.Address || '').trim()
      const district = String(input.District || '').trim()
      if (!/^1[3-9]\d{9}$/.test(mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      } else if (!name) {
        this.$toast('收货人姓名不能为空')
        return false
      } else if (!district) {
        this.$toast('收货地区不能为空')
        return false
      } else if (!adr) {
        this.$toast('收货地址不能为空')
        return false
      }

      return true
    },

    async handleSubmit() {
      // // for debug
      // this.$emit('updated', {
      //   Name: Math.random(),
      //   Mobile: Date.now() + '0',
      //   AddrMobile: Math.random(),
      //   District: Math.random(),
      //   Address: Math.random(),
      //   PrizeName: '中原找房纸巾盒111',
      //   PrizeId: 1,
      //   WinPrizeTime: '2021年03月10日',
      //   ExpressNo: '12128762847638',
      //   ExpressCompany: '顺丰快递',
      //   Status: true
      // })
      // this.visibleForm = false

      const validate = await this.validate()
      if (!validate) return

      this.loading = true
      this.$toast.loading({
        message: '正在提交',
        forbidClick: true
      })

      try {
        const { Msg } = await SendAddress(this.inputAdr)
        this.$toast(Msg)
        this.$emit('updated', this.inputAdr)
        this.visibleForm = false
      } catch (err) {
        this.$_error(err)
        this.$toast(err.message)
      }

      this.loading = false
    }
  }
}
</script>

<style lang="less" module>
.head {
  display: flex;
  padding: 0.2rem 0.22rem;
  border-bottom: 0.01rem solid #ccc;
  line-height: 1;

  &Title {
    font-size: 0.3rem;
    font-weight: normal;
    color: #333;
  }

  &BtnEdit {
    margin-left: auto;
    font-size: 0.28rem;
    font-weight: normal;
    color: #ff8e0c;
  }
}

.body {
  text-align: left;
  padding: 0.22rem;
}

.adr {
  &Item {
    font-size: 0.28rem;
    color: #333;
    line-height: 0.48rem;

    &Label {
      color: #666;
    }
  }
}

/** 空地址 */
.empty {
  padding: 0.9rem 0;

  &Btn {
    color: #ff8e0c;
    font-size: 0.28rem;
    border-color: #ff7917;
  }
}

/** 填写地址弹框 */
.popup {
  width: 90%;
  max-width: 6rem;
  background-color: transparent;

  &HeadBackground {
    display: block;
    width: 100%;
  }

  &Wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-repeat: no-repeat;
    background-size: contain;
  }

  &Main {
    width: 100%;
    padding: 0 0.25rem;
    background-color: #fff;
  }

  &Input {
    background-color: #ededed !important;
    border-radius: 0.5rem;
    padding: 0 0.26rem !important;
    line-height: 0.6rem !important;
    height: auto !important;
    font-size: 0.24rem !important;

    & + & {
      margin-top: 0.2rem;
    }

    :global(.van-field__control)::placeholder {
      text-align: right;
      font-size: 0.24rem;
      font-weight: 500;
      color: #ccc;
    }
  }

  &Submit {
    margin: 0.3rem auto 0;
    width: 3.75rem !important;
    color: #a12a05;
  }

  &Tip {
    padding: 0.28rem 0;
    font-size: 0.16rem;
    font-weight: 100;
    color: #999;
    text-align: center;
  }

  &Close {
    margin-top: 0.68rem;

    &Img {
      display: block;
      width: 0.69rem;
      height: 0.69rem;
    }
  }
}
</style>
