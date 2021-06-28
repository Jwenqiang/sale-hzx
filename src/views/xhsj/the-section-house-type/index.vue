<template lang="pug">
base-card#house-type(anim, theme='ycmt', title='2大主力户型')
  the-item(
    v-for='(item, i) of $_list',
    :info='item',
    :key='i',
    @clickImg='showGallery(i)'
  )/

  base-btn(title='查看更多户型', @click='state.formSection = "sec202103"')/

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
  name: 'YcmtHouseType',
  mixins: [mixins],
  components: { BaseCard, BaseBtn, TheItem, BaseGallery },

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
      return { ...item, img: this.$_publicPath + item.img }
    })
    this.$_items = items
  }
}
</script>
