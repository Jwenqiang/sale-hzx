<template>
  <div :class="$style.wrap" v-tap="[handleTap]">
    <div :class="$style.head">
      <img
        :src="$_publicPath + 'img/i/adr' + (0 + isNew) + '.svg'"
        :class="$style.adrIcon"
      />
      <span>深圳</span>
    </div>

    <van-field
      placeholder="请输入手机号"
      :class="$style.field"
      readonly
      :border="false"
    >
      <template #extra>
        <van-button :class="$style.fieldBtn">立即提交</van-button>
      </template>
    </van-field>

    <div :class="$style.tip">点击提交即视为同意</div>
  </div>
</template>

<script>
export default {
  name: 'TopCard',

  computed: {
    // 是否新房
    isNew: ({ $route }) => $route.name.includes('new')
  },

  methods: {
    handleTap() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" module>
.wrap {
  margin: 0 0.48rem;
  padding: 0.2rem 0.38rem;
  border-radius: 0.2rem;
  background: linear-gradient(196deg, #fc742a, #f5c057);
  box-shadow: 0rem 0rem 0rem 0rem rgba(104, 47, 5, 0.1);

  .field {
    border-radius: @border-radius-max;
    overflow: hidden;
    padding: 0;

    // input dom
    :global(.van-field__control) {
      display: block;
      padding: 0 0.3rem;
      font-size: 0.33rem;
      line-height: 2.2;
    }

    &Btn {
      align-self: stretch;
      height: auto;
      background: linear-gradient(0deg, #ff0000, #ff6042);
      border-radius: @border-radius-max 0 0 @border-radius-max;
      border: none;
      padding: 0 0.3rem;
      color: #fff;
    }
  }
}

.head {
  display: flex;
  align-items: center;
  margin-bottom: 0.17rem;
  padding: 0 0.17rem;
  line-height: 1;

  color: #fff;
  font-size: 0.28rem;
}

.adrIcon {
  display: block;
  margin-right: 0.13rem;
  height: 0.35rem;
}

.tip {
  margin-top: 0.22rem;
  font-size: 0.21rem;
  color: #fff;
  text-align: center;
}
</style>
