<template>
  <div :class="$style.wrap">
    <slot />
  </div>
</template>

<style lang="less" module>
.wrap {
  background: #fff;
  box-shadow: 0rem 0.02rem 0.06rem rgba(0, 0, 0, 0.15);
  border-radius: 0rem;
  border-radius: 0.05rem;
}
</style>
