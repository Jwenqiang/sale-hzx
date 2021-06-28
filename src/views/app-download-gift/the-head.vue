<template>
  <div :class="$style.wrap">
    <img
      :src="`${$_publicPath}img/app-download/banner.jpg`"
      :class="$style.banner"
    />
    <div :class="$style.exptime">活动时间：即日起至2021年12月31号截止</div>
  </div>
</template>

<style lang="less" module>
.banner {
  display: block;
  width: 100%;
}

/** banner 下方过期时间 */
.exptime {
  position: absolute;
  top: 2.96rem;
  text-align: center;
  color: #fff;
  width: 100%;
  font-size: 0.24rem;
}
</style>
