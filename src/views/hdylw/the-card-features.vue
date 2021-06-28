<template lang="pug">
base-card(title='项目特色', anim)
  div(:class='$style.wrap')
    .anim(:class='$style.itemWrap', style='animation-delay: 0.3s')
      div(:class='$style.item')
        div(:class='$style.itemLeft')
          div(:class='$style.itemTitle') 深中通道&nbsp;&nbsp;湾区中芯
          div(:class='$style.itemDescription')
            | 项目位于广东三大自贸区核心位置，是深中通道桥头堡。占据优越地理位置，
            | 未来直接对接前海。待深中通道正式通车后，翠亨新区与前海一桥之隔，
            | 通勤时间从120分钟缩短至20分钟，真正实现工作在前海，生活在西岸。
        div(:class='$style.itemRight')
          img(
            :class='$style.itemImg',
            :src='`${$_publicPath}img/hdylw/feature1.jpg`',
            @click='showGallery(0)'
          )/

    .anim(:class='$style.itemWrap', style='animation-delay: 0.5s')
      div(:class='$style.item')
        div(:class='$style.itemLeft')
          div(:class='$style.itemTitle') 千亿新区&nbsp;&nbsp;价值可期
          div(:class='$style.itemDescription')
            | 项目位于翠亨新区，翠亨新区是未来的城市新中心，作为深中通道出口发展的门户
            | 之地，一众科技强企纷纷扎堆在此，与此同时，翠亨新区正稳步加强教育、医疗、
            | 文体设施等公共服务配套，打造湾区未来科创高地。
        div(:class='$style.itemRight')
          img(
            :class='$style.itemImg',
            :src='`${$_publicPath}img/hdylw/feature2.jpg`',
            @click='showGallery(1)'
          )/

  base-gallery(v-model='visibleGallery', :items='$_items', :index='index')/
</template>

<script>
import BaseCard from '@/components/base-card'
import BaseGallery from '@/components/base-gallery'

export default {
  name: 'HdylwCardFeatures',
  components: { BaseCard, BaseGallery },

  data() {
    return {
      visibleGallery: false,
      index: 0
    }
  },

  methods: {
    showGallery(index) {
      this.index = index
      this.visibleGallery = true
    }
  },

  created() {
    this.$_items = [
      {
        src: `${this.$_publicPath}img/hdylw/feature1.jpg`,
        w: 750,
        h: 531
      },
      {
        src: `${this.$_publicPath}img/hdylw/feature2.jpg`,
        w: 750,
        h: 547
      }
    ]
  }
}
</script>

<style lang="less" module>
.wrap {
  padding: @card-padding-top 0;
}

.item {
  display: flex;
  padding-bottom: 0.4rem;
  border-bottom: 0.01rem solid #ccc;
  word-break: break-all;

  &Wrap {
    padding: 0 0.2rem;

    & + & > .item {
      margin-top: 0.28rem;
      padding-top: 0.25rem;
    }
  }

  &Left {
    flex: 1 1;
    margin: 0 0.13rem;
  }

  &Right {
    flex: 0 0 2.77rem;
  }

  &Title {
    margin-bottom: 0.1rem;
    font-size: 0.32rem;
    font-weight: 500;
    color: @primary-color;
    line-height: 0.45rem;
  }

  &Description {
    font-size: 0.24rem;
    font-weight: 400;
    color: #666;
    line-height: 0.4rem;
  }

  &Img {
    display: block;
    width: 100%;
  }
}
</style>
