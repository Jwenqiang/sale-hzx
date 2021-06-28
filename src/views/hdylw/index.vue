<template lang="pug">
//- 单页 - 恒大悦珑湾

div(:class='$style.wrap')
  div(:class='$style.main')
    img(:class='$style.banner', :src='`${$_publicPath}img/hdylw/banner.png`')/

    img(
      :class='$style.bannerPC',
      :src='`${$_publicPath}img/hdylw/banner-pc.png`'
    )

    //- 头部表单
    div(:class='$style.formWrap')
      base-form(animate, :class='$style.form')/

    //- 详情
    the-card-details/

    //- 特色
    the-card-features/

    //- 户型
    the-card-house-type/

    //- 样板间
    the-card-property-room/

    //- 周边
    the-card-around/

    //- 底部表单
    div(:class='$style.formWrap')
      base-form(animate, :class='$style.form')
        template(#prepend)
          div(:class='$style.footerFormTip')
            p 留下您的联系方式
            p 我们优秀的置业顾问将尽快联系您

    div(:class='$style.footer')
      div(:class='$style.footerCall') 4008192680转93401
      van-button(
        :icon='`${$_publicPath}img/i/c.png`',
        url='tel:4008192680,93401',
        round,
        :class='$style.footerBtn',
        size='small'
      ) 欢迎致电咨询
      div(:class='$style.footerCompanyName') 中原集团管理有限公司
</template>

<script>
import { throttle } from 'lodash'
import '@/plug/photo-swipe'

import BaseForm from '@/components/base-form'
import TheCardFeatures from './the-card-features'
import TheCardDetails from './the-card-details'
import TheCardHouseType from './the-card-house-type/index.vue'
import TheCardPropertyRoom from './the-card-property-room/index.vue'
import TheCardAround from './the-card-around/index.vue'

export default {
  name: 'Hdylw',
  components: {
    BaseForm,
    TheCardDetails,
    TheCardFeatures,
    TheCardHouseType,
    TheCardPropertyRoom,
    TheCardAround
  },

  methods: {
    handleScroll: throttle(function () {
      const doms = this.$_doms
      const offset = this.$_offset
      const overs = []
      doms.forEach((dom, index) => {
        const scrollTop =
          this.$root.$el.scrollTop ||
          document.documentElement.scrollTop ||
          document.body.scrollTop
        if (dom.offsetTop - scrollTop < offset) {
          dom.className = dom.className + ' anim-in'
          overs.push(index)
        }
      })

      for (let i = overs.length - 1; i >= 0; i--) {
        doms.splice(i, 1)
      }
    }, 200)
  },

  mounted() {
    const doms = []
    this.$el.querySelectorAll('.anim').forEach(dom => doms.push(dom))
    this.$_doms = doms

    this.$_offset = (window.innerHeight / 6) * 5

    this.$nextTick(() => {
      setTimeout(() => {
        this.$root.$el.addEventListener('scroll', this.handleScroll)
        this.handleScroll()
      }, 100)
    })
  },

  beforeDestroy() {
    this.$root.$el.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="less" module>
.main {
  width: 100%;
  margin: 0 auto;
  max-width: 11.29rem;
  background-color: #0c215e;
  .ios-safe-area-padding-bottom();
}

.banner {
  display: block;
  width: 100%;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.45rem 0 0.55rem;
  text-align: center;

  &Call {
    padding: 0 0.3rem;
    height: 0.45rem;
    font-size: @font-size-md;
    font-weight: 400;
    color: #ffffff;
    line-height: 1.8;
  }

  &CompanyName {
    margin-top: 0.11rem;
    padding: 0 0.3rem;
    height: 0.33rem;
    font-size: 0.24rem;
    font-weight: 400;
    color: #ffffff;
    line-height: 0.33rem;
  }

  &Btn {
    margin: 0.2rem 0 !important;
    font-size: 0.28rem !important;
    padding: 0.1rem 0.2rem !important;
  }

  &FormTip {
    margin-bottom: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.3rem;
    color: @primary-color;
    text-align: center;
    font-weight: 400;
    letter-spacing: 1px;

    :global(p) {
      margin: 0;
    }
  }
}

.form {
  &Wrap {
    padding: 0.4rem 0.3rem 0;
    box-shadow: 0rem 0.02rem 0.04rem 0.02rem rgba(0, 0, 0, 0.2);
  }
}

.banner {
  &PC {
    display: none;
    width: 100%;
  }

  @media screen and (min-width: 750px) {
    display: none;

    &PC {
      display: block;
    }
  }
}
</style>
