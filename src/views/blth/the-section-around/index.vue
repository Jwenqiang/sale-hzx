<template lang="pug">
base-card#around(title='4大成熟配套', anim, theme='ycmt', :class='$style.card')
  div(:class='$style.wrap')
    the-item(
      v-for='(item,i) of $_list',
      :info='item',
      :key='item.title',
      @clickImg='showGallery(i)'
    )/

  base-gallery(v-model='visibleGallery', :items='$_items', :index='index')/
</template>

<script>
import BaseCard from '@/components/base-card'
import TheItem from './the-item'
import list from './list'
import BaseGallery from '@/components/base-gallery'
import mixins from '../mixins'

export default {
  name: 'YcmtAround',
  mixins: [mixins],
  components: { BaseCard, TheItem, BaseGallery },

  data() {
    return {
      cur: 0,

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
    this.$_list = list.map(item => {
      items.push({ src: this.$_publicPath + item.imgHD, w: item.w, h: item.h })
      item.img = this.$_publicPath + item.img
      return item
    })
    this.$_items = items
  }
}
</script>

<style lang="less" module>
.card {
  margin-left: 0;
  margin-right: 0;
}

.wrap {
  display: flex;
  flex-wrap: wrap;
  padding: 0 0.18rem;
}
</style>
