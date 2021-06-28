<template lang="pug">
van-overlay(:show='visible', :class-name='$style.overlay')
  van-loading 正在提交...
</template>

<script>
export default {
  name: 'LoadingWithOverlay',
  props: {
    visible: Boolean
  }
}
</script>

<style lang="less" module>
.overlay {
  z-index: 3000 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
