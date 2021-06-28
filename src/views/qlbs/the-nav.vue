<template lang="pug">
van-sticky
  div(:class='$style.wrap')
    div(:class='$style.main')
      span(
        v-for='item of $_list',
        :key='item.text',
        :class='{ [$style.item]: true, [$style.itemActive]: item.name === value }',
        @click='scrollTo(item.name)'
      ) {{ item.text }}
</template>

<script>
export default {
  name: 'TheYcmtNav',
  props: {
    value: String
  },

  methods: {
    scrollTo(name) {
      const id = '#' + name
      const dom = document.querySelector(id)
      if (dom) {
        this.$emit('input', name)
        document.documentElement.scrollTop = dom.offsetTop - 50
      }
    }
  },

  beforeCreate() {
    this.$_list = [
      { name: 'feature', text: '项目亮点' },
      { name: 'house-type', text: '优质户型' },
      { name: 'property-room', text: '样板间' },
      { name: 'around', text: '成熟配套' },
      { name: 'recommend', text: '更多楼盘' }
    ]
  }
}
</script>

<style lang="less" module>
.wrap {
  padding: 0 0.3rem;
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.2rem 0.18rem;
  background: linear-gradient(180deg, #32bbf7 0%, #065ea9 100%);
  border-radius: 0.08rem;
}

.item {
  text-align: center;
  flex: 1;
  padding: 0 0.18rem;
  font-size: 0.26rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #f15353;
  line-height: 0.37rem;
  white-space: nowrap;
  color: #fff;

  & + & {
    // margin-left: 0.15rem;
    border-left: 0.02rem solid #fff;
  }

  &Active {
    font-weight: 500;
    color: var(--primary-color);
  }
}
</style>
