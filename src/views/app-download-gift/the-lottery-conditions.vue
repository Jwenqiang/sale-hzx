<template lang="pug">
//- 抽奖条件
div(:class='$style.wrap')
  div(:class='$style.topRect')/
  div(:class='$style.main')
    div(:class='$style.title') 抽奖需满足以下条件
    div(:class='$style.list')
      div(:class='$style.listItem', v-for='(item,i) of conditions', :key='i')
        span(:class='$style.listItemName')
          | {{ item.title }}
          van-icon(
            v-if='item.icon',
            :name='item.icon',
            :class='$style.listItemNameIcon',
            @click='handleIconClick(item)'
          )/
        span(
          :class='{ [$style.listItemState]: true, [$style.listItemStateDisallowed]: item.key === "IsNew" && !item.state && !item.error, [$style.listItemStateClickable]: item.key === "IsBind" && !item.state && !item.error }',
          @click='$emit("stateClick", item)'
        )
          | {{ item.error || (item.state ? item.trueValue : item.falseValue) }}
</template>

<script>
export default {
  name: 'ConditionList',
  props: {
    conditions: Array
  },

  methods: {
    handleIconClick(item) {
      const cb = item.iconClickHandler
      if (typeof cb === 'function') cb()
    }
  }
}
</script>

<style lang="less" module>
.topRect {
  height: 0.53rem;
  background: #fc565a;
  border: 0.04rem solid #fc565a;
  border-radius: 0.1rem;
}

.main {
  position: relative;
  margin: -0.25rem 0.27rem 0;
  background: #fee067;
  box-shadow: 0rem 0rem 0.2rem 0rem rgba(0, 0, 0, 0.2);
  border-radius: 0 0 0.1rem 0.1rem;

  &:before {
    content: '';
    display: block;
    position: absolute;
    bottom: 100%;
    left: 0;
    width: 100%;
    height: 0.1rem;
    background: linear-gradient(180deg, #fc565a, #fee067);
  }
}

.title {
  display: flex;
  padding-top: 0.29rem;
  align-items: center;
  font-size: 0.36rem;
  font-weight: bold;
  color: #e96309;
  line-height: 0.43rem;

  &:before,
  &:after {
    margin: 0 0.16rem;
    content: '';
    display: block;
    flex: 1;
    height: 0.01rem;
    background-color: #faa709;
  }
}

.list {
  padding: 0.3rem 0;

  &Item {
    display: flex;
    margin: 0.22rem 0.15rem;
    padding: 0 0.12rem;
    align-items: center;

    & + & {
      // margin-top: 0.22rem;
      padding-top: 0.22rem;
      border-top: 0.01rem solid #faa709;
    }

    &Name {
      margin-right: auto;
      font-size: 0.32rem;
      font-weight: 400;
      color: #333;
      line-height: 0.32rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: left;

      flex-shrink: 0;
      .flex();
      align-items: center;

      &Icon {
        margin-left: 0.1rem;
        font-weight: 600;
      }
    }

    &State {
      margin-left: 0.3rem;
      padding: 0.06rem 0.21rem;
      border-radius: 0.1rem;
      border: 1px solid #ffbe21;
      font-size: 0.32rem;
      width: 1.86rem;
      font-weight: 400;
      line-height: 0.32rem;
      white-space: nowrap;
      color: #ffbe21;
      overflow: hidden;
      text-overflow: ellipsis;

      &Clickable {
        background-color: #ffbe21;
        color: #fffefe;
      }

      &Disallowed {
        border-color: transparent;
        color: #fffefe;
        background-color: @gray-5;
      }
    }
  }
}
</style>
