<template lang="pug">
//- WEB 页参与流程
div(:class='$style.wrap')
  div(:class='$style.topRect')/
  div(:class='$style.main')
    div(:class='$style.title') 参与流程
    div(:class='$style.list')
      div(
        :class='$style.listItem',
        v-for='(item,i) of steps',
        :key='i',
        :style='{ flexGrow: item.grow || 1 }'
      )
        div(
          :class='[$style.listItemIcon, $style["listItemIcon" + item.id]]',
          :style='{ backgroundImage: `url(${$_publicPath}img/app-download/web-steps.png)` }'
        )
        div(:class='$style.listItemName', :style='item.textStyles') {{ item.title }}
        img(
          :class='$style.listItemArrow',
          :src='$_publicPath + "img/i/arrow-r-0.png"'
        )/
</template>

<script>
export default {
  name: 'LotteryConditionList',
  data() {
    return {
      steps: Object.freeze([
        { id: 0, title: '获取资格' },
        { id: 1, title: '下载\n中原找房' },
        { id: 2, title: '添加\n专属经纪人' },
        { id: 3, title: '参与抽奖' }
      ])
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
  display: flex;
  padding: 0.3rem 0.2rem;

  &Item {
    flex: 1;
    .flex-column-center();
    position: relative;
    // overflow: hidden;

    &Icon {
      width: 1.17rem;
      height: 1.5rem;
      background-position: 0 0;
      background-size: cover;
      background-repeat: repeat;

      &0 {
        background-position: 0 0;
      }

      &1 {
        background-position: -100% 0;
      }

      &2 {
        background-position: -200% 0;
      }

      &3 {
        background-position: -300% 0;
      }
    }

    /** 步骤文字 */
    &Name {
      margin-top: 0.04rem;
      font-size: 0.24rem;
      font-weight: 400;
      color: #e96309;
      margin-top: 0.1rem;
      line-height: 1.2;
      // line-height: 0.36rem;
      white-space: pre-wrap;
    }

    &Arrow {
      display: block;
      position: absolute;
      left: 100%;
      top: 0;
      width: 0.25rem;
      transform: translate3d(-50%, 1.2rem, 0);
    }

    &:last-child {
      .listItemArrow {
        display: none;
      }
    }
  }
}
</style>
