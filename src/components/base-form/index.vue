<template lang="pug">
div(:class='{ [$style.wrap]: true, anim: animate }')
  slot(name='prepend')/

  van-field(
    v-model='name',
    label='姓名',
    colon,
    label-align='right',
    :label-class='$style.label',
    :border='false',
    size='large',
    placeholder='您的信息将严格保密',
    :class='$style.input'
  )/
  van-field(
    v-model='call',
    label='电话',
    colon,
    type='number',
    label-align='right',
    :label-class='$style.label',
    :border='false',
    size='large',
    placeholder='置业顾问提供一对一贴心服务',
    :class='$style.input'
  )/
  base-btn(:title='btnText', :class='$style.btn', @click='submit')/
</template>

<script>
import { delay } from 'lodash'
import BaseBtn from '@/components/base-btn'
import LoadingWithOverlay from '@/components/loading-with-overlay'
import { upLog } from '../../common/trace'

export default {
  name: 'BaseForm',
  components: { BaseBtn, LoadingWithOverlay },
  props: {
    sectionId: { type: String, default: '' },
    animate: Boolean,
    btnText: { type: String, default: '获取楼盘专享优惠' },
    handlerFormBody: Function
  },

  data() {
    return {
      name: '',
      call: ''
    }
  },

  methods: {
    async submit() {
      const loading = this.$toast.loading({
        message: '正在提交',
        forbidClick: true,
        duration: 0
      })

      const name = this.name.trim()
      const call = this.call.replace(/[\s-]+/, '')
      if (!name) return this.$toast('请填写您的姓名')
      if (!call || !/^1[3-9]\d{9}$/.test(call))
        return this.$toast('请填写正确的手机号码')

      const start = Date.now()

      const log = { typ: 'form' }
      try {
        const $route = this.$route
        const qr = $route.query
        const sem = qr.sem || qr.Sem || qr.SEM || ''
        const hmpl = qr.hmpl || qr.Hmpl || qr.HMPL || ''
        const { default: AxiosAsync } = await import('@/plug/axios')
        const Axios = await AxiosAsync()
        const meta = this.$route.meta
        const body = {
          Name: name,
          Mobile: call, //用户电话
          Message: meta.title, //可以为空  可以写楼盘名
          Url: window.location.href,
          EstateName: meta.title, //楼盘名称
          // CouponId: '',
          Sem: sem,
          Hmpl: hmpl,
          ProCode: meta.estateId, //楼盘ID
          IsNew: 1,
          UserSectionId: this.sectionId,
          CityName: meta.cityName
        }

        log.body = body

        const { data: res } = await Axios.post(
          'https://sz.centanet.com/partner/huihansubmit/api/XinFangProjectUserDataApi/XinFangPostCustomerData',
          this.handlerFormBody ? this.handlerFormBody(body) : body
        )

        log.res = res

        // 防止提交时间太短
        const time = Date.now() - start
        if (time < 500) await new Promise(resolve => delay(resolve, 500 - time))

        if (!res) {
          // 响应空数据
          throw new Error('请求错误')
        } else if (res.code !== 200 && res.code !== 0) {
          this.$toast(res.message || '未知状态')
          // 其他非 200 、非 1 code、非 0
          // throw new Error(res.Message || res.message)
        } else {
          this.$toast.success('提交成功')
          this.$emit('success')
        }
      } catch (err) {
        log.err = err.message
        this.$toast('请求错误')
        // const { Dialog: DialogImport } = await import('@/plug/vant')
        // const Dialog = await DialogImport()
        // Dialog.alert({
        //   title: '请求错误',
        //   message: err.message
        // })
        window.console.error(err)
        loading.close()
      }

      upLog(log)
    }
  }
}
</script>

<style lang="less" module>
.wrap {
  padding: var(--form-padding);
  background-color: #fff;
  border-radius: 0.06rem;
}

.input {
  display: flex;
  align-items: center;
  padding: 0.2rem 0 !important;
  background-color: #eee !important;
  margin-bottom: var(--form-input-space);
  border-radius: var(--form-input-radius);

  &:last-child {
    margin-bottom: 0;
  }
}

.btn {
  margin-top: var(--form-btn-submit-margin-top) !important;
}

.label {
  flex-shrink: 0;
  line-height: 1;
  width: @font-size-lg * 3 !important;
  white-space: nowrap;
}
</style>
