<template lang="pug">
div(:class='$style.wrap')
  div(:class='$style.main')
    div(:class='$style.info') {{ info.type.toLocaleUpperCase() }}户型 建面{{ info.area }}㎡
    img(
      :class='$style.img',
      :src='`${$_publicPath}img/hdylw/type-${info.type}.jpg`',
      @click='$emit("click")'
    )/

    //- 悬浮标签
    div(:class='$style.tags')
      div(
        v-for='item of info.tags',
        :class='$style.tagsItem',
        :key='info.type + item'
      ) {{ item }}
</template>

<script>
export default {
  name: 'TheCardHouseTypeItem',
  props: {
    info: Object
  }
}
</script>

<style lang="less" module>
.wrap {
  display: flex;
  justify-content: center;
  border-radius: 0.04rem;
}

.main {
  position: relative;
}

.img {
  display: block;
  max-width: 100%;
}

.info {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.1rem 0.8rem 0.12rem 0.19rem;
  border-radius: 0rem 0rem 1rem 0rem;
  background: #285a95;
  opacity: 0.8;

  font-size: 0.24rem;
  font-weight: 400;
  color: #fff;
  line-height: 0.33rem;
}

.tags {
  margin-top: 0.39rem;
  display: flex;
  flex-wrap: wrap;

  &Item {
    margin: 0 0.1rem 0.1rem 0;
    padding: 0.04rem 0.08rem;
    border: 0.01rem solid #999;

    font-size: 0.22rem;
    font-weight: 400;
    color: #666;
    line-height: 0.3rem;
  }
}
</style>
