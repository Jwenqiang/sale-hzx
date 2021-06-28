<template>
  <!-- 项目详情 -->
  <base-card theme="hcmy" :class="$style.card" title="项目详情">
    <div :class="$style.wrap">
      <img
        :src="$_publicPath + 'img/wkddh/det.jpg'"
        :class="$style.img"
        v-tap="[showGallery, 0]"
      />
      <div :class="$style.title">万科大都会</div>
      <div :class="$style.desc">
        <div :class="$style.descItemWrap">
          <div :class="$style.descItem">
            <div :class="$style.descItemVal">待定</div>
            <div :class="$style.descItemField">均价</div>
          </div>
        </div>
        <div :class="$style.descItemWrap">
          <div :class="$style.descItem">
            <div :class="$style.descItemVal">待定</div>
            <div :class="$style.descItemField">总价</div>
          </div>
        </div>
        <div :class="$style.descItemWrap">
          <div :class="$style.descItem">
            <div :class="$style.descItemVal"><span>住宅</span></div>
            <div :class="$style.descItemField">物业类型</div>
          </div>
        </div>
      </div>
    </div>

    <base-gallery v-model="visibleGallery" :items="$_items" :index="index" />
  </base-card>
</template>

<script>
import BaseCard from '@/components/base-card'
import BaseGallery from '@/components/base-gallery'

export default {
  name: 'BlthDetail',
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

  beforeCreate() {
    this.$_items = [
      { src: this.$_publicPath + 'img/wkddh/det-hd.jpg', w: 616, h: 336 }
    ]
  }
}
</script>

<style lang="less" module>
.card {
  & > :global(.base-card-body) {
    padding: 0.43rem;
    background-color: #fff;
  }
}

.img {
  display: block;
  width: 100%;
}

.title {
  margin-top: 0.3rem;
  font-size: 0.36rem;
  font-weight: 600;
  color: #333;
  line-height: 0.5rem;
}

.desc {
  .flex();
  margin-top: 0.2rem;

  &Item {
    font-size: 0.34rem;

    &Wrap {
      flex: 1;
      .flex();
      justify-content: center;

      & + & {
        margin-left: 0.1rem;
        padding-left: 0.1rem;
        border-left: 0.01rem solid @gray-5;
      }
    }

    &Val {
      margin-bottom: 0.15rem;
      color: #e82f2f;
      white-space: nowrap;
      font-weight: 500;
      line-height: 1;

      &Sub {
        margin-left: 0.03rem;
        font-size: 0.26rem;
      }
    }

    &Field {
      font-size: 0.28rem;
      color: #666;
    }
  }
}
</style>
