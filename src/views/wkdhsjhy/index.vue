<template lang="pug">
//- 单页 - 万科都会四季花园

div(:class='$style.wrap')
  div(:class='$style.main', v-lazy-container='{ selector: "img[data-src]" }')
    img(
      :class='$style.banner',
      :data-src='`${$_publicPath}img/wkdhsjhy/banner.jpg`'
    )/

    img(
      :class='$style.bannerPC',
      :data-src='`${$_publicPath}img/wkdhsjhy/banner-pc.jpg`'
    )/

    div(:class='$style.formWrap')
      base-form(section-id='sec-top')/

    //- 项目详情
    the-detail/

    //- 三大项目亮点
    the-section-features/

    //- 主力户型
    the-section-house-type/

    //- 样板房
    the-section-property-room/

    //- 4大成熟配套
    the-section-around/

    //- 更多楼盘推荐
    the-section-recommend/

    p(:class='$style.footerText') 中原集团管理有限公司

    the-footer-bar/

    the-form-popup/
</template>

<script>
import '@/components/base-card/theme-hcmy/index.less'
import { throttle } from 'lodash'
import TheSectionFeatures from './the-section-features'
import TheSectionPropertyRoom from './the-section-property-room'
import TheSectionAround from './the-section-around'
import TheSectionRecommend from './the-section-recommend'
import TheSectionHouseType from './the-section-house-type'
import TheFooterBar from './the-footer-bar'
import TheFormPopup from './the-form/popup'
import BaseForm from '@/components/base-form'
import TheDetail from './the-detail'

export default {
  name: 'Wkdhsjhy',
  components: {
    TheSectionFeatures,
    TheSectionPropertyRoom,
    TheSectionAround,
    TheSectionRecommend,
    TheSectionHouseType,
    TheFooterBar,
    TheFormPopup,
    BaseForm,
    TheDetail
  },

  data() {
    return { activeNav: '' }
  },

  methods: {
    handleScroll: throttle(function () {
      const doms = this.$_doms
      const offset = this.$_offset
      const overs = []
      const scrollTop =
        this.$root.$el.scrollTop ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      doms.forEach((dom, index) => {
        if (dom.offsetTop - scrollTop < offset) {
          dom.className = dom.className + ' anim-in'
          overs.push(index)
        }
      })

      for (let i = overs.length - 1; i >= 0; i--) {
        doms.splice(i, 1)
      }

      const navs = this.$_navs
      if (navs) {
        for (const { $, name } of navs) {
          if ($.offsetTop - scrollTop < this.$_navOffset) {
            this.activeNav = name
          }
        }
      }
    }, 200)
  },

  mounted() {
    const doms = []
    document.querySelectorAll('.anim').forEach(dom => doms.push(dom))
    this.$_doms = doms

    this.$_navOffset = window.innerHeight / 3
    this.$_offset = (window.innerHeight / 6) * 5

    this.$nextTick(() => {
      setTimeout(() => {
        this.$root.$el.addEventListener('scroll', this.handleScroll)
        this.handleScroll()
      }, 100)
    })

    const refNav = this.$refs.nav
    if (refNav) {
      const navs = this.$refs.nav.$_list.map(item => {
        return {
          name: item.name,
          $: document.querySelector('#' + item.name)
        }
      })
      this.$_navs = navs
    }
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
  background-color: var(--primary-color);
  padding-bottom: @ycmt-footer-bar-height;
}

.banner {
  display: block;
  width: 100%;

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

.form {
  box-shadow: 0rem 0.02rem 0.04rem 0.02rem rgba(0, 0, 0, 0.2);

  &Wrap {
    padding: 0.4rem 0.3rem 0;
  }
}

.footerText {
  margin: 0.47rem 0;
  text-align: center;
  font-size: 0.3rem;
  font-weight: 400;
  color: #fff;
  line-height: 0.42rem;
}
</style>
