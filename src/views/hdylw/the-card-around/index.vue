<template lang="pug">
base-card(title='周边设施', anim)
  div(:class='$style.wrap')
    //- tabs
    div(:class='$style.tag')
      div(
        v-for='(item, index) of $_config',
        :class='$style.tagItemWrap',
        :key='`t${item.title}`',
        @click='jump(index)'
      )
        div(
          :class='{ [$style.tagItem]: true, [$style.tagItemActive]: cur === index }'
        ) {{ item.title }}

    van-swipe(:show-indicators='false', @change='i => (cur = i)', ref='swipe')
      van-swipe-item(v-for='(item, index) of $_config', :key='item.title')
        the-item(:info='item', @clickImg='showGallery(index)')/

  base-gallery(v-model='visibleGallery', :items='$_items', :index='index')/
</template>

<script>
import BaseCard from '@/components/base-card'
import TheItem from './the-item'
import config from './config'
import BaseGallery from '@/components/base-gallery'

export default {
  name: 'HdylwCardAround',
  components: { BaseCard, TheItem, BaseGallery },

  data() {
    return {
      cur: 0,

      visibleGallery: false,
      index: 0
    }
  },

  methods: {
    jump(index) {
      if (index < 0 || index > this.$_config.length) return

      this.cur = index
      this.$refs.swipe.swipeTo(index)
    },

    showGallery(index) {
      this.index = index
      this.visibleGallery = true
    }
  },

  beforeCreate() {
    const conf = config.call(this)
    this.$_config = conf
    this.$_items = conf.map(item => ({
      src: item.cover,
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

.tag {
  display: flex;
  align-items: center;
  cursor: pointer;

  &Item {
    padding: 0.02rem 0.12rem;
    border-radius: 0.02rem;
    color: @primary-color;
    border: 0.01rem solid @primary-color;

    /** text */
    font-size: 0.28rem;
    font-weight: 400;
    line-height: 0.4rem;

    /** active item */
    &Active {
      background: @primary-color;
      color: #fff;
    }

    &Wrap {
      flex: 1;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
