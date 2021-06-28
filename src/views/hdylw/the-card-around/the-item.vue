<template lang="pug">
div(:class='$style.wrap')
  img(:class='$style.cover', :src='info.cover', @click='$emit("clickImg")')/
  div(:class='$style.desc') {{ info.desc }}
</template>

<script>
export default {
  name: 'HdylwCardAroundItem',
  props: {
    info: Object
  }
}
</script>

<style lang="less" module>
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;

  & + & {
    margin-top: 0.35rem;
  }
}

.cover {
  margin-top: 0.34rem;
  display: block;
  width: 100%;
}

.desc {
  margin-top: 0.38rem;

  font-size: 0.28rem;
  font-weight: 400;
  color: #666;
  line-height: 0.4rem;
  letter-spacing: 1px;
  word-break: break-all;
}
</style>
