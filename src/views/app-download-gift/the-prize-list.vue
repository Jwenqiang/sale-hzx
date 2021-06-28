<template>
  <!-- 奖品列表组件 -->
  <div :class="$style.wrap">
    <div :class="$style.title">奖品设置</div>

    <!--
      大图轮播
      .scrollWrap // 父容器 swiper container
        .scrollList // 滚动容器 swiper wrapper
          .scrollListItemWrap // 奖品容器
            .scrollListItem
              .scrollListItemPrize // 奖品图
              .scrollListItemName // 奖品名称
          ...
     -->
    <div class="swiper-container" ref="swipeWrap" :class="$style.scrollWrap">
      <div class="swiper-wrapper" :class="$style.scrollList">
        <div
          v-for="item of $_prizeList"
          class="swiper-slide"
          :class="$style.scrollListItemWrap"
          :key="item.index"
        >
          <div :class="$style.scrollListItem">
            <the-prize
              :index="item.index"
              :size="$_prizeSize"
              :class="$style.scrollListItemPrize"
            />
            <div :class="$style.scrollListItemName">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>

    <!--
      小图列表
      .pagination // 父容器
        .paginationItemWrap // 奖品父容器 v-for
          .paginationItemPrizeWrap // 奖品容器，border and padding
            .paginationItemPrize // 奖品图
          .paginationItemPrizeName // 奖品名
        ...
     -->
    <div :class="$style.pagination">
      <div
        v-for="(item, index) of $_prizeList"
        :class="{
          [$style.paginationItem]: true,
          [$style.paginationItemActive]: curIndex === index
        }"
        @click="swipeTo(index)"
        :key="'p' + item.index"
      >
        <div :class="$style.paginationItemPrizeWrap" ref="paginationPrizeWrap">
          <!-- 图片 -->
          <the-prize
            v-if="paginationPrizeSize"
            :size="paginationPrizeSize"
            :index="item.index"
            :class="$style.paginationItemPrize"
          />
        </div>

        <!-- 名称 -->
        <div :class="$style.paginationItemName">
          {{ item.shortName || item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import prizeList from './prize-list'
import ThePrize from './the-prize'
import 'swiper/swiper.less'
import { SwiperAsync } from '@/plug/swiper'

export default {
  name: 'ThePrizeList',
  components: { ThePrize },

  data() {
    return {
      curIndex: 0,
      width: window.innerWidth,

      paginationPrizeSize: 0
    }
  },

  methods: {
    async initSwiper() {
      const { Swiper } = await SwiperAsync()

      const swiper = new Swiper(this.$refs.swipeWrap, {
        slidesPerView: 'auto',
        // freeMode: true,
        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 1000
        },
        on: {
          slideChange: swiper => {
            this.curIndex = swiper.realIndex
          }
        }
      })

      this.$_swiper = swiper
    },

    swipeTo(index) {
      this.$_swiper.slideTo(index)
    },

    resetPaginationSize() {
      const width = this.$refs.paginationPrizeWrap[0].clientWidth
      if (width !== this.paginationPrizeSize) {
        this.paginationPrizeSize = width
        this.$nextTick(() => {
          const swiper = this.$_swiper
          swiper && swiper.update(true)
        })
      }
    },

    async keepSize() {
      const timeout = 300
      let totalTimeout = 0
      while (totalTimeout < 9000) {
        if (this.$_destroyed) break

        totalTimeout += timeout
        this.resetPaginationSize()
        await new Promise(resolve => {
          setTimeout(resolve, timeout)
        })
      }
    }
  },

  beforeCreate() {
    const list = prizeList.call(this)
    this.$_prizeList = list.filter(item => !item.isEmpty)
    this.$_prizeSize = window.innerWidth * 0.25
  },

  mounted() {
    this.initSwiper()
    this.keepSize()
  },

  beforeDestroy() {
    this.$_destroyed = true
  }
}
</script>

<style lang="less" module>
.wrap {
  margin: 0.27rem;
  padding: 0 0.15rem 0.35rem;
  background: #fee067;
  box-shadow: 0rem 0rem 0.2rem 0rem rgba(0, 0, 0, 0.2);
  border-radius: 0.1rem;
}

.title {
  .flex();
  align-items: center;
  margin-bottom: 0.08rem;
  padding-top: 0.29rem;
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

.scroll {
  &Wrap {
    border-radius: 0.1rem;
  }

  &List {
    border-radius: 0.1rem;
    align-items: stretch;

    &Item {
      .flex-column-center();
      height: 100%;
      padding: 0.3rem 0 0.2rem;
      background-color: #fff;
      color: #e96309;
      border-radius: 0.1rem;
      box-shadow: 0 0.05rem 0rem -0.01rem #e96309;
      overflow: hidden;

      &Wrap {
        padding: 0 0.1rem 0.05rem;
        width: 80%;
        height: auto;
      }

      /** 产品图 */
      // &Prize {
      //   &Wrap {
      //     width: 40%;
      //   }
      // }

      /** 产品名 */
      &Name {
        margin-top: 0.1rem;
        font-size: 0.3rem;
      }
    }
  }
}

.pagination {
  .flex();
  margin-top: 0.1rem;

  &Item {
    .flex-column();
    margin: 0 0.05rem;
    align-items: stretch;
    width: 100%;
    flex: 1 0;
    overflow: hidden;
    font-size: 0.2rem;
    color: #fc565a;

    &Active {
      .paginationItemPrizeWrap {
        border-color: #fc565a;
      }
    }

    &Prize {
      &Wrap {
        .flex();
        justify-content: center;
        align-items: center;

        width: 100%;
        position: relative;
        overflow: hidden;
        border-radius: 0.1rem;
        background-color: #fff;
        border: 0.05rem solid #feb71b;
        transition: border-color 0.3s ease;
        box-shadow: 0 0.05rem 0.1rem fade(darken(@primary-color, 10%), 10%);
      }
    }

    &Name {
      margin-top: 0.05rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      width: 100%;
    }
  }
}
</style>
