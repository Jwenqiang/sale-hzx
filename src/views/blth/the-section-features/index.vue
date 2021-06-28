<template lang="pug">
base-card#feature(anim, theme='ycmt', :class='$style.card', title='3大项目亮点')
  div(:class='$style.wrap')
    the-item(
      v-for='(item,i) of $_list',
      :info='item',
      :key='item.title',
      @imgClick='showGallery(i)'
    )/

    base-btn(title='了解楼盘详情', @click='state.formSection = "sec202102"')/

  base-gallery(v-model='visibleGallery', :items='$_items', :index='index')/
</template>

<script>
import BaseCard from '@/components/base-card'
import BaseBtn from '@/components/base-btn'
import TheItem from './the-item'
import list from './list'
import BaseGallery from '@/components/base-gallery'
import mixins from '../mixins'

export default {
  name: 'BlthFeatures',
  mixins: [mixins],
  components: { BaseCard, BaseBtn, TheItem, BaseGallery },

  data() {
    return {
      visibleGallery: false,
      index: 0
    }
  },

  methods: {
    showGallery(index) {
      this.index = index
      this.visibleGallery = true
    }
  },

  beforeCreate() {
    const items = []
    const _list = []

    const publicPath = this.$_publicPath
    for (const item of list) {
      items.push({ src: publicPath + item.hd, w: item.w, h: item.h })
      _list.push({
        ...item,
        src: publicPath + item.src
      })
    }

    this.$_list = _list
    this.$_items = items
  }
}
</script>

<style lang="less" module>
.card {
  & > :global(.base-card-body) {
    padding-top: 0.1rem;
    padding-bottom: 0.56rem;
    background-color: #fff;
  }
}

.wrap {
  padding: 0 @font-size-sm;
}
</style>
