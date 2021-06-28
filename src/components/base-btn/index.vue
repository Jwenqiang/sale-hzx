<template lang="pug">
van-button(
  type='primary',
  :class='$style.btn',
  :size='size',
  :icon='icon',
  :url='url',
  @click='$emit("click")'
)
  span {{ title }}
  div(v-if='showArrow', :class='$style.iconArrow')/
</template>

<script>
export default {
  name: 'BaseBtn',
  props: {
    title: String,
    showArrow: Boolean,
    size: { type: String, default: 'large' },
    icon: String,
    url: String
  }
}
</script>

<style lang="less" module>
.btn {
  display: block !important;
  margin: 0.3rem auto 0 !important;
  width: 100%;
  padding: 0.23rem 0 !important;
  max-width: 6.5rem;

  width: 100%;
  max-width: 5.84rem;
  background: var(--btn-primary-background);
  box-shadow: var(--btn-primary-box-shadow);
  border-radius: var(--btn-primary-radius) !important;
  border: var(--btn-primary-border) !important;
  border-image: var(--btn-primary-border-image) !important;

  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  user-select: none;
  -moz-user-focus: none;
  -moz-user-select: none;

  &:active {
    border-style: none;

    &::before {
      opacity: 0;
    }
  }

  .iconArrow {
    margin-left: 0.12rem;
    width: 1.2em;
    height: 1.2em;
    background-image: url(~@root/public/img/i/arrow.svg);
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    position: relative;
    top: 0.03em;
  }

  :global(.van-button__text) {
    display: flex;
    align-items: center;
  }
}
</style>
