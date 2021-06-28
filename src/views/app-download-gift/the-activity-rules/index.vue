<template lang="pug">
//- 右上角活动规则
div(:class='$style.wrap')
  img(
    :class='$style.tag',
    v-tap='[open]',
    :src='$_publicPath + "img/app-download/tag-rules.png"'
  )/
  template(v-if='asyncLoaded')
    the-popup(v-model='visible')/
</template>

<script>
export default {
  name: 'ActivityRules',
  components: {
    ThePopup: () =>
      import(/* webpackChunkName: "actRulesPopup" */ './the-popup.vue')
  },

  data() {
    return {
      asyncLoaded: false,
      visible: false
    }
  },

  methods: {
    open() {
      if (!this.asyncLoaded) this.asyncLoaded = true
      this.visible = true
    }
  }
}
</script>

<style lang="less" module>
.tag {
  position: absolute;
  top: 0;
  right: 0.22rem;
  width: 0.7rem;
}

.popup {
  &Overlay {
    opacity: 0.6 !important;
  }
}
</style>
