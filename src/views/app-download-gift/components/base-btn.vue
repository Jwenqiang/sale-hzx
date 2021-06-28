<template>
  <div :class="$style.wrap" @click="$emit('click')">
    <img
      :src="$_publicPath + 'img/app-download/btn-bg-h4px-tiny.png'"
      :class="$style.img"
    />
    <div :class="$style.content"><slot /></div>
  </div>
</template>

<style lang="less" module>
.wrap {
  z-index: 1;
  position: relative;
  display: block;
  width: 100%;
  font-size: @font-size-lg;
  line-height: 1;
  cursor: pointer;
  color: #a12a05;
}

.img {
  display: block;
  width: 100%;
}

.content {
  z-index: 1;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  .flex();
  align-items: center;
  justify-content: center;
}
</style>
