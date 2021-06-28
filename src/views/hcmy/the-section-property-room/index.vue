<template lang="pug">
base-card#property-room(anim, theme='hcmy', :class='$style.card', title='样板房')
  .swiper-container(:class='$style.swipeWrap', ref='swipeWrap')
    .swiper-wrapper(
      :class='$style.swipe',
      @change='i => (cur = i)',
      :loop='false'
    )
      .swiper-slide(
        v-for='(item,i) of $_list',
        :key='item.id',
        :class='$style.swipeItem',
        :style='{ zIndex: i }'
      )
        div(:class='$style.imgWrap')
          img(:class='$style.img', :data-src='item.img')/

  div(:class='$style.indicatorWrap', ref='indicator')
    div(
      v-for='(_,i) of $_list',
      :class='{ [$style.indicator]: true, [$style.indicatorActive]: cur === i }',
      :key='`i${_.id}`'
    )/

  base-gallery(v-model='visibleGallery', :items='$_items', :index='index')/
</template>

<script>
import { debounce } from 'lodash'
import 'swiper/swiper.less'
import { SwiperAsync } from '@/plug/swiper'
// import Swiper from 'swiper'
// import 'swiper/swiper.less'
import BaseCard from '@/components/base-card'
import BaseGallery from '@/components/base-gallery'
import list from './list'
import mixins from '../mixins'

export default {
  name: 'YcmtPropertyRoom',
  mixins: [mixins],
  components: { BaseCard, BaseGallery },

  data() {
    return {
      cur: 0,

      visibleGallery: false,
      index: 0
    }
  },

  methods: {
    showGallery(index) {
      console.log('showGallery: ')
      this.index = index
      this.visibleGallery = true
    },

    async initSwiper() {
      const { default: Swiper } = await SwiperAsync()

      const swiper = new Swiper(this.$refs.swipeWrap, {
        initialSlide: 1,
        slidesPerView: 'auto',
        spaceBetween: -100,
        centeredSlides: true,
        loop: true,
        on: {
          slideChange: swiper => {
            this.cur = swiper.realIndex
          },
          tap: swiper => {
            this.showGallery(swiper.realIndex)
          }
        }
      })

      this.$_swiper = swiper

      // 与 lazyload 的 data-src 冲突，需手动初始化
      swiper.$wrapperEl[0].querySelectorAll('img').forEach(img => {
        img.setAttribute('lazy', 'loaded')
        img.setAttribute('src', img.getAttribute('data-src'))
      })
    },

    handleScroll: debounce(function () {
      if (this.$el.getBoundingClientRect().top < window.innerHeight * 1.2) {
        this.initSwiper()
        this.$root.$el.removeEventListener('scroll', this.handleScroll)
      }
    }, 50)
  },

  beforeCreate() {
    const items = []
    this.$_list = list.map(item => {
      items.push({
        src: this.$_publicPath + item.originImg,
        w: item.w,
        h: item.h
      })
      return { ...item, img: this.$_publicPath + item.img }
    })
    this.$_items = items
  },

  mounted() {
    this.$root.$el.addEventListener('scroll', this.handleScroll)
  },

  beforeDestroy() {
    this.$root.$el.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="less" module>
.card {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.wrap {
  padding: 0;
}

.img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;

  &Wrap {
    display: flex;
    align-items: center;
    overflow: hidden;
    height: 5.3rem;
  }
}

.swipe {
  &Item {
    transform: scale(0.8) !important;
    width: 80% !important;
    transition: transform 0.3s ease;
    border-radius: 0.1rem;
    overflow: hidden;
  }

  & > {
    :global(.swiper-slide-active),
    :global(.swiper-slide-duplicate-active) {
      transform: scale(1) !important;
      z-index: 10 !important;
    }
  }
}

.indicator {
  margin-top: 0.27rem;
  width: 0.1rem;
  height: 0.1rem;
  background-color: #fff;
  border-radius: 0.05rem;
  transition: width 0.3s ease;

  & + & {
    margin-left: 0.05rem;
  }

  &Active {
    width: 0.35rem;
  }

  &Wrap {
    display: flex;
    justify-content: center;
  }
}
</style>
