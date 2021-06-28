<template lang="pug">
div(:class='{ [$style.wrap]: true, [$style.wrapLast]: info.isLast }')
  div(:class='$style.main')
    div(:class='$style.content')
      div(:class='$style.imgWrap')
        img(
          :class='$style.img',
          :data-src='info.img',
          @click='$emit("clickImg")'
        )/

      div(:class='$style.info')
        div(:class='$style.title') {{ info.title }}
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
  flex: 0 0 50%;
  margin-bottom: 0.3rem;

  &Last {
    margin-bottom: 0;
  }
}

.main {
  height: 100%;
  padding: 0 0.12rem;
}

.content {
  background-color: #fff;
  border-radius: 0.08rem;
  overflow: hidden;
  height: 100%;
}

.img {
  display: block;
  width: 100%;
  width: 100%;

  &Wrap {
    flex-shrink: 0;
    display: flex;
    align-items: center;
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
  font-weight: 400;
  color: #fff;
  line-height: 0.4rem;

  padding: 0 0.11rem;
  background-color: #48a59b;
  border-radius: 0rem 0.08rem 0rem 0rem;

  transform: translate3d(0, -100%, 0);
}

.desc {
  margin-top: -0.25rem;
  padding: 0rem 0.2rem 0.25rem;
  font-size: 0.22rem;
  font-weight: 400;
  color: #333;
  line-height: 0.4rem;
  text-justify: inter-character;
  text-align: justify;
}
</style>
