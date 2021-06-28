<template lang="pug">
base-card(title='项目详情', anim)
  div(:class='$style.wrap')
    .anim(:class='$style.imgWrap')
      img(
        :class='$style.img',
        :src='`${$_publicPath}img/hdylw/detail.jpg`',
        @click='visibleGallery = true'
      )/

    .anim(:class='$style.name') 恒大悦珑湾

    div(:class='$style.info')
      div(:class='$style.infoItem')
        div(:class='$style.infoItemName') 均价
        div(:class='$style.infoItemValue') 2.6万元/平起

      div(:class='$style.infoItem')
        div(:class='$style.infoItemName') 总价
        div(:class='$style.infoItemValue') 181-292万元

      div(:class='$style.infoItem')
        div(:class='$style.infoItemName') 类型
        div(:class='$style.infoItemValue') 住宅

    div(:class='$style.btnWrap')
      base-btn(
        title='获取项目价格信息',
        :class='$style.btn',
        @click='visibleDialog = true'
      )/

    van-dialog(
      v-model='visibleDialog',
      title='提交资料',
      :get-container='getContainer',
      :show-confirm-button='false',
      close-on-click-overlay
    )
      base-form(btn-text='立即获取购房优惠')/

  base-gallery(v-model='visibleGallery', :items='$_items')/
</template>

<script>
import BaseBtn from '@/components/base-btn'
import BaseCard from '@/components/base-card'
import BaseForm from '@/components/base-form'
import BaseGallery from '@/components/base-gallery'

export default {
  name: 'HdylwCardDetails',
  components: { BaseCard, BaseBtn, BaseForm, BaseGallery },

  data() {
    return {
      visibleDialog: false,
      visibleGallery: false
    }
  },

  methods: {
    getContainer() {
      return this.$root.$el
    }
  },

  beforeCreate() {
    this.$_items = [
      {
        src: this.$_publicPath + 'img/hdylw/detail.jpg',
        w: 649,
        h: 360
      }
    ]
  }
}
</script>

<style lang="less" module>
.wrap {
  padding: @card-padding-top 0 0.65rem;
}

.img {
  display: block;
  width: 100%;

  &Wrap {
    padding: 0 0.2rem;
  }
}

.name {
  margin: 0.4rem 0.2rem 0;
  height: 0.38rem;
  font-size: 0.38rem;
  font-weight: 500;
  color: #333333;
  line-height: 0.38rem;

  transform-origin: left center;
}

.info {
  display: flex;
  margin-top: 0.41rem;

  &Item {
    text-align: center;
    flex: 1 1 (1rem / 3);

    & + & {
      border-left: 0.01rem solid #fce1b6;
    }

    &Name {
      font-size: 0.28rem;
      font-weight: 400;
      color: #666666;
      line-height: 0.28rem;
    }

    &Value {
      margin-top: 0.16rem;
      font-size: 0.32rem;
      font-weight: 500;
      color: #fc5449;
      line-height: 0.32rem;
    }
  }
}

.btn {
  &Wrap {
    padding: 0.4rem 0.34rem 0;
  }
}
</style>
