<template lang="pug">
//- 样板间列表配置

base-card(title='样板间', anim)
  div(:class='$style.wrap')
    van-swipe(:class='$style.swipe', @change='i => (cur = i)', ref='swipe')
      van-swipe-item(v-for='(item,index) of $_list', :key='item.title')
        div(:class='$style.imgWrap')
          img(
            :class='$style.img',
            :src='item.src',
            :title='item.title',
            @click='showGallery(index)'
          )/

      template(#indicator)
        div(:class='$style.indicator')
          van-icon(
            :class='$style.indicatorArrow',
            name='arrow-left',
            @click='jump(-1)'
          )/

          div(:class='$style.indicatorText') {{ activeItem.title }}

          van-icon(
            :class='$style.indicatorArrow',
            name='arrow',
            @click='jump(1)'
          )/

    div(:class='$style.btnWrap')
      base-btn(title='预约实地看房', @click='visibleDialog = true')/

    van-dialog(
      v-model='visibleDialog',
      title='提交资料',
      :get-container='getContainer',
      :show-confirm-button='false',
      close-on-click-overlay
    )
      base-form(btn-text='立即获取购房优惠')/

  base-gallery(v-model='visibleGallery', :items='$_items', :index='index')/
</template>

<script>
import BaseCard from '@/components/base-card'
import BaseBtn from '@/components/base-btn'
import BaseForm from '@/components/base-form'
import list from './list'
import BaseGallery from '@/components/base-gallery'

export default {
  name: 'HdylwCardPropertyRoom',
  components: { BaseCard, BaseBtn, BaseForm, BaseGallery },

  data() {
    return {
      cur: 0, // current
      visibleDialog: false,

      visibleGallery: false,
      index: 0
    }
  },

  computed: {
    activeItem: ({ cur, $_list }) => $_list[cur]
  },

  methods: {
    getContainer() {
      return this.$root.$el
    },

    /**
     * jump swipe
     */
    jump(typ) {
      let to = this.cur + typ
      if (to < 0) to = this.$_list.length - 1
      else if (to > this.$_list.length - 1) to = 0

      this.cur = to
      this.$refs.swipe.swipeTo(to)
    },

    showGallery(index) {
      this.index = index
      this.visibleGallery = true
    }
  },

  beforeCreate() {
    const _list = list.call(this)
    this.$_list = _list
    this.$_items = _list.map(item => ({
      src: item.src,
      w: item.w,
      h: item.h
    }))
  }
}
</script>

<style lang="less" module>
.wrap {
  padding: @card-padding-top 0.3rem @card-padding-top+
    @base-card-default-head-offset-top;
}

.img {
  display: block;
  margin: 0 auto;
  height: 100%;

  &Wrap {
    height: 3rem;
  }
}

.btnWrap {
  padding-top: 0.3rem;
}

.tip {
  text-align: center;
  color: #999;
  font-size: 18px;
  margin-top: 0.5rem;
}

.indicator {
  margin-top: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: @primary-color;
  font-size: 0.42rem;
  line-height: 1;

  &Arrow {
    padding: 0 0.26rem;
    cursor: pointer;
  }

  &Text {
    font-size: 0.24rem;
    padding: 0.1rem 0.2rem;
    border: 0.01rem solid @primary-color;
  }
}
</style>
