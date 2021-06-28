<template lang="pug">
base-card#recommend(anim, theme='ycmt' title="更多楼盘推荐")
  div(:class='$style.wrap')
    a(
      v-for='item of $_list',
      :key='item.id',
      :class='$style.imgWrap',
      :href='item.link'
    )
      img(:class='$style.img', :data-src='item.img')/
</template>

<script>
import BaseCard from '@/components/base-card'
import list from './list'
import { withRouteQueryToLink } from '@/common'

export default {
  name: 'YcmtRecommend',
  components: { BaseCard },

  data() {
    return {
      cur: 0
    }
  },

  methods: {},

  beforeCreate() {
    this.$_list = list.map(item => ({
      ...item,
      img: this.$_publicPath + item.img,
      link: withRouteQueryToLink(item.link, this.$route.query)
    }))
  }
}
</script>

<style lang="less" module>
.img {
  display: block;
  margin: 0 auto;
  width: 100%;
  max-width: 7.18rem;
  border-radius: 0.08rem;
  overflow: hidden;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;

  &Wrap {
    display: block;
  }
}
</style>
