<template lang="pug">
base-card(title='主力户型', anim)
  div(:class='$style.wrap')
    //-
      顶部标签 tags
      结构:
        .tags
          .tagWrap
            .tag
            ...
          .tagWrap
          ...
    div(:class='$style.tags')
      div(:class='$style.tagWrap', @click='activeType = -1')
        div(
          :class='{ [$style.tag]: true, [$style.tagActive]: activeType === -1 }'
        ) 全部

      div(
        v-for='(item, index) of $_config',
        :class='$style.tagWrap',
        :key='`k-${item.type}`',
        @click='activeType = index'
      )
        div(
          :class='{ [$style.tag]: true, [$style.tagActive]: activeType === index }'
        ) {{ item.type.toLocaleUpperCase() }}户型

    //-
      户型列表
    div(
      :class='{ [$style.itemWrap]: true, [$style.itemWrapIsSingle]: activeType >= 0 }'
    )
      the-item.anim(
        v-for='(item, index) of $_config',
        v-show='activeType < 0 || activeType === index',
        :class='$style.item',
        :key='item.type',
        :info='item',
        @click='showGallery(index)'
      )/

    //- 了解更多按钮
    div(:class='$style.btnWrap')
      base-btn(title='了解更多户型信息', @click='visibleDialog = true')/

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
import TheItem from './the-item'
import BaseBtn from '@/components/base-btn'
import BaseForm from '@/components/base-form'
import BaseGallery from '@/components/base-gallery'

import config from './config'

export default {
  name: 'HdylwCardHouseType',
  components: { BaseCard, TheItem, BaseBtn, BaseForm, BaseGallery },

  data() {
    return {
      activeType: -1,
      visibleDialog: false,

      visibleGallery: false,
      index: 0
    }
  },

  methods: {
    getContainer() {
      return this.$root.$el
    },

    showGallery(index) {
      this.index = index
      this.visibleGallery = true
    }
  },

  beforeCreate() {
    const conf = config.call(this)
    this.$_config = conf
    this.$_items = conf.map(item => item.img)
  }
}
</script>

<style lang="less" module>
.wrap {
  padding: @card-padding-top 0.3rem @card-padding-top * 1.3;
}

/** item wrap */
.item {
  flex: 0 0 70%;

  & + & {
    margin-left: 0.5rem;
  }

  &Wrap {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 0.4rem;

    /** tab 单选状态 */
    &IsSingle {
      & > .item {
        margin: 0 auto;
        flex-basis: 90%;
      }
    }
  }
}

.btnWrap {
  padding-top: 0.12rem;
}

.tag {
  /** tags */
  &s {
    display: flex;
    margin-bottom: 0.6rem;
    overflow-x: auto;
    overflow-y: hidden;
  }

  /** tag wrap */
  &Wrap {
    flex: 1;
    padding: 0 0.1rem;
    cursor: pointer;
  }

  /** tag item */
  padding: 0.04rem 0.1rem;
  border: 1px solid #999;
  font-size: 0.28rem;
  text-align: center;
  color: #666;
  white-space: nowrap;

  &Active {
    background-color: @primary-color;
    color: #fff;
  }
}
</style>
