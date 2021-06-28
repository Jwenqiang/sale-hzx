<template lang="pug">
div(:class='$style.wrap')
  div(:class='$style.imgWrap')
    img(:class='$style.img', :data-src='info.src', @click='$emit("imgClick")')

  div(:class='$style.info')
    div(
      :class='$style.title',
      :style='{ backgroundImage: info.background, color: info.color }'
    ) {{ info.title }}
    div(:class='$style.desc') {{ info.desc }}
</template>

<script>
export default {
  name: 'TheSectionFeaturesItem',
  props: {
    info: Object
  }
}
</script>

<style lang="less" module>
.wrap {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0.23rem 0;
}

.img {
  width: 100%;

  &Wrap {
    flex-shrink: 0;
    margin-right: 0.16em;
    display: flex;
    align-items: center;
    width: 2.69rem;
    height: 1.69rem;
    overflow: hidden;
  }
}

.info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.title {
  font-size: 0.28rem;
  font-weight: 600;
  color: #703702;
  line-height: 0.4rem;

  margin-bottom: 0.19rem;
  padding: 0 0.11rem;
  border-radius: 0.03rem;
}

.desc {
  font-size: 0.22rem;
  font-weight: 400;
  color: #333;
  line-height: 0.4rem;
  white-space: pre-wrap;
}
</style>
