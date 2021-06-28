<template>
  <div :class="{ [$style.wrap]: true, [$style.in]: visible }">
    <div :class="$style.main">
      <img
        :class="{ [$style.cover]: true, [$style.coverLoaded]: coverLoaded }"
        :src="house.FullImagePath"
        @load="handleImageLoad()"
      />
      <slot name="desc" :class="$style.desc" />
    </div>
    <div :class="$style.footer">
      <van-field
        v-model="mobile"
        type="number"
        maxlength="11"
        :class="$style.footerField"
        placeholder="请输入您的手机号码"
        :border="false"
      />
      <van-button :class="$style.footerBtn" @click="submit()"
        >预约咨询</van-button
      >
    </div>
  </div>
</template>

<script>
import { throttle } from 'lodash'
import { upLog } from '@/common/trace'
import { incoming } from '../lib/request'
import { isDebug } from '@/config'
import { track } from '@/common/dmp'

export default {
  name: 'Card',
  props: {
    house: Object
  },

  data() {
    return {
      mobile: '',
      visible: false,
      coverLoaded: false
    }
  },

  computed: {
    // 是否新房
    isNew: ({ $route }) => $route.name.includes('new')
  },

  methods: {
    async submit() {
      const mobile = this.mobile.trim()
      if (!mobile || !/^1[2-9]\d{9}$/.test(mobile)) {
        this.$toast('请输入正确的手机号码')
        return
      }

      this.$toast.loading({ message: '正在提交', duration: 0 })

      try {
        const house = this.house
        const qr = this.$route.query
        const isNew = this.isNew
        const sem = String(qr.Sem || qr.SEM || qr.sem || '').trim()

        const opts = {
          EmpNo: '',
          EstateName: isNew
            ? house.EstName || '新房'
            : house.EstateName || '二手房',
          Hmpl: isNew ? 'xf' : 'esf',
          Sem: sem,
          Source: '',
          Url: window.location.href,
          HuXing: '',
          IsNew: 0 + isNew,
          IsPay: 0 + !!sem,
          LaiYuan: isNew ? 'xinfang' : 'ershoufang',
          Message: `腾讯推广专题-${isNew ? '新房' : '二手房'}(推广二组)${
            isNew ? '' : '-' + house.Title
          }`,
          Mobile: mobile,
          MuDi: '',
          Name: isDebug ? '前端测试' : '',
          ProCode: house.EstId || house.EstateCode,
          ProType: '推广专题',
          Region1: '',
          Region2: '',
          YuSuanJiaGe: ''
        }
        upLog({ t: '20210512', house, opts })

        // 进线
        const res = await incoming(opts)
        upLog({ t: '20210512', house, res: res })

        // DMP
        if (res?.data) {
          track('RESERVATION', { typ: isNew ? '新房' : '二手房' }) // 预约
        }

        const msg = res?.message
        this.$toast(msg)
      } catch (err) {
        upLog({ err: err.message })
      }
    },

    handleImageLoad() {
      this.coverLoaded = true
    }
  },

  mounted() {
    this.$_handleScroll = throttle(() => {
      const offsetTop = this.$el.offsetTop
      const scrollTop = this.$root.$el.scrollTop
      if (offsetTop < this.$root.$el.scrollTop + window.innerHeight * 0.9) {
        this.visible = true
      } else if (offsetTop > scrollTop + window.innerHeight) {
        this.visible = false
      }
    }, 50)
    this.$root.$el.addEventListener('scroll', this.$_handleScroll)
    queueMicrotask(this.$_handleScroll)
  },

  beforeDestroy() {
    this.$root.$el.removeEventListener('scrol', this.$_handleScroll)
  }
}
</script>

<style lang="less" module>
.wrap {
  padding: 0.2rem;
  font-size: 0.2rem;
  background-color: #fff;
  border-radius: 0.2rem;
  opacity: 0;
  transform: translate3d(0.2rem, 0, 0);
  transition: transform 0.5s ease, opacity 1s ease;

  .footer {
    display: flex;
    border-top: 1px solid #f2f2f2;
    padding-top: 0.2rem;

    &Field {
      padding: 0;
      flex-grow: 1;
      border: 0.02rem solid #f01b1b;
      border-radius: 0.1rem;

      // input fom
      :global(.van-field__control) {
        display: block;
        padding: 0 0.2rem;
        font-size: 0.28rem;
        line-height: 2.2;
      }
    }

    &Btn {
      align-self: stretch;
      height: auto;
      flex-shrink: 0;
      margin-left: 0.23rem;
      padding: 0 0.33rem;
      border-radius: 0.1rem;
      background: linear-gradient(0deg, #ff0000, #ff6042);
      color: #fff;
    }
  }
}

.in {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.main {
  display: flex;
  align-items: stretch;
  margin-bottom: 0.2rem;
}

.cover {
  width: 2.4rem;
  flex-shrink: 0;
  display: block;
  margin-right: 0.18rem;
  background-image: url('~@root/public/img/load0.jpg');
  background-position: center top;
  background-size: cover;
  max-height: 1.8rem;

  &Loaded {
    align-self: flex-start;
    background-image: none;
    height: auto;
  }
}

.desc {
  flex: 1;
}
</style>
