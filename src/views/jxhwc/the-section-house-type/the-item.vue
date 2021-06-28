<template lang="pug">
div(:class='$style.wrap')
  div(:class='$style.imgWrap')
    img(:class='$style.img', :data-src='info.img', @click='$emit("clickImg")')/

  div(:class='$style.info')
    div(:class='$style.title') {{ info.title }}
    div(:class='$style.desc') {{ info.desc }}
    base-btn(
      title='咨询该户型',
      size='normal',
      :class='$style.btn',
      show-arrow,
      @click='state.formSection = "sec202103"'
    )/

  //- 连接样式
  div(:class='$style.connectWrap')
    div(:class='$style.connect')
      div(:class='$style.connectItemWrap')
        div(:class='[$style.connectItem, $style.connectItemLeft]')/
      div(:class='$style.connectItemWrap')
        div(:class='[$style.connectItem, $style.connectItemLeft]')/
</template>

<script>
import BaseBtn from '@/components/base-btn'
import mixins from '../mixins'

export default {
  name: 'TheSectionFeaturesItem',
  mixins: [mixins],
  components: { BaseBtn },
  props: {
    info: Object
  }
}
</script>

<style lang="less" module>
.wrap {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.23rem;
  background-color: #fff;
  border-radius: @base-card-ycmt-border-radius;

  &:first-child > .connectWrap {
    display: none;
  }

  & + & {
    margin-top: 0.42rem;
  }
}

.img {
  width: 100%;

  &Wrap {
    flex-shrink: 0;
    margin-right: 0.16em;
    display: flex;
    align-items: center;
    width: 2.4rem;
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
  background: linear-gradient(270deg, #ffffff 0%, #ffd2a4 100%);
  border-radius: 0.03rem;
}

.desc {
  font-size: 0.22rem;
  font-weight: 400;
  color: #333;
  line-height: 0.3rem;
  white-space: pre-wrap;
}

.btn {
  padding: 0 0.2rem !important;
  width: auto;
  margin-top: 0.4rem !important;
  margin-left: 0 !important;
}

/**
 * 两个块之间的链接
 */
@height: 0.78rem;
.connect {
  display: flex;
  justify-content: space-between;
  padding: 0 0.58rem;

  &Wrap {
    position: absolute;
    left: 0;
    top: -(@height*0.75);
    width: 100%;
  }

  &Item {
    z-index: 1;
    width: 0.12rem;
    height: 0.74rem;
    background-color: #fff;
    border-radius: 0.06rem;

    &Wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 0.12rem;
      height: @height;

      &:before,
      &:after {
        content: ' ';
        z-index: 0;
        position: absolute;
        left: 0;

        display: block;
        width: 0.12rem;
        height: 0.12rem;
        background-color: var(--primary-color);
        border-radius: 50%;
      }

      &:before {
        top: 0;
        transform: translate3d(0, -(100%/6), 0) scale3d(1.3, 1.3, 1.3);
      }

      &:after {
        bottom: 0;
        transform: translate3d(0, (100%/6), 0) scale3d(1.3, 1.3, 1.3);
      }
    }
  }
}
</style>
