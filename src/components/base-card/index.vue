<template lang="pug">
.base-card(:class='classes')
  .base-card-head
    .base-card-head-title
      slot(v-if='$slots.title', name='title')/
      template(v-else) {{ title }}

  .base-card-body
    slot/
</template>

<script>
export default {
  name: 'BaseCard',
  props: {
    title: String,
    anim: Boolean,
    theme: { type: String, default: 'default' }
  },

  computed: {
    classes: ({ anim, theme }) => {
      const cls = [`base-card-${theme}`]
      if (anim) cls.push('anim')
      return cls
    }
  }
}
</script>

<style lang="less">
@import '@/components/base-card/theme-default.less';

.base-card {
  margin: 0.56rem 0.3rem 0;
  background-color: #fff;

  &-body {
    background-color: #fff;
  }
}
</style>
