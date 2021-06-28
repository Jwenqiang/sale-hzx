<template>
  <!-- 二手房页面 -->
  <div :class="$style.wrap">
    <div
      :class="$style.top"
      :style="`background-image:url(${$_publicPath}img/20210512/28f91ae0.jpg)`"
    >
      <div :class="$style.topImgList">
        <div v-for="item of $_imgs" :class="$style.topImgWrap" :key="item.t">
          <img :class="$style.topImg" :src="item.s" />
        </div>
      </div>
    </div>

    <div :class="$style.main" ref="main">
      <div v-if="list" :class="$style.list">
        <the-card
          v-for="item of list"
          :house="item"
          :class="$style.listCard"
          :key="item.AdsNo"
        >
          <template #desc>
            <div :class="$style.listCardDesc">
              <div
                v-if="item.Title"
                :class="$style.listCardTitle"
                :title="item.Title"
              >
                {{ item.Title }}
              </div>

              <div :class="[$style.listCardInfo, $style.listCardInfoTags]">
                <span
                  v-for="tag of item._tags"
                  :class="$style.listCardTag"
                  :key="tag"
                  >{{ tag }}</span
                >
              </div>

              <div :class="[$style.listCardInfo, $style.listCardInfoDesc]">
                <span v-if="item._desc" :class="$style.listCardInfoTxt">{{
                  item._desc
                }}</span>
              </div>

              <div
                v-if="item._gp"
                :class="[$style.listCardInfo, $style.listCardInfoGPrice]"
              >
                <span>指导价：</span>
                <span :class="$style.listCardGPrice">{{ item._gp }}</span>
              </div>
            </div>
          </template>
        </the-card>
      </div>

      <van-loading v-show="loading" :class="$style.loading" size="0.8rem" />
    </div>
  </div>
</template>

<script>
import { throttle } from 'lodash'
import AxiosAsync from '@/plug/axios'
import TheCard from './components/card'
import { upLog } from '@/common/trace'
import { init as initDMP } from './lib/dmp'

export default {
  name: 'SecondHand',
  components: { TheCard },

  data() {
    return {
      loading: true,
      list: null,
      page: 0
    }
  },

  methods: {
    async refresh() {
      this.loading = true

      try {
        const { default: Axios } = await AxiosAsync()
        const {
          data: res
        } = await Axios.post(
          'https://sz.centanet.com/partner/huihansubmit/api/TuiGuang2Activity/GetErShouFangEstates',
          { Keyword: '', PageIndex: ++this.page, PageCount: 10 }
        )

        let list = this.list
        if (!list) list = this.list = []

        for (const item of res) {
          const RoomCnt = parseInt(item.RoomCount)
          const HallCnt = parseInt(item.HallCount)
          const area = parseFloat(item.Garea)
          const guidingSalePrice = parseFloat(item.GuidingSalePrice)
          const adr = String(item.DisplayAddress || '')
            .replace(/^.*?-/, '')
            .trim()

          const desc = []
          RoomCnt && HallCnt && desc.push(RoomCnt, '室', HallCnt, '厅')
          area && desc.push(area, '平')
          adr && desc.push(' ', adr)

          const ret = {
            _desc: desc.length ? desc.join('') : null,
            _gp: guidingSalePrice ? `${guidingSalePrice}万` : null,
            _tags: item.UnitTags,
            FullImagePath: item.FullImagePath,
            Title: item.Title,
            EstateName: item.EstateName,
            EstateCode: item.EstateCode
            // ...item // for debug
          }

          list.push(Object.freeze(ret))
        }
      } catch (err) {
        upLog({ err: err.message })
      }

      this.loading = false
    },

    handleScroll: throttle(function () {
      if (
        !this.loading &&
        this.$root.$el.scrollTop >
          this.$el.offsetHeight - window.innerHeight * 1.5
      ) {
        this.refresh()
      }
    }, 100)
  },

  beforeCreate() {
    this.$_imgs = [
      { s: this.$_publicPath + 'img/20210512/bf206d14.png' },
      { s: this.$_publicPath + 'img/20210512/07f23799.png' }
    ]

    try {
      initDMP.call(this)
    } catch (err) {
      this.$_error(err)
      upLog({ err: err.message })
    }
  },

  mounted() {
    this.refresh().then(() => {
      this.$root.$el.addEventListener('scroll', this.handleScroll)
    })
  },

  beforeDestroy() {
    this.$root.$el.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="less" module>
.loading {
  margin: 0 auto;
  padding: 0.5rem 0;
  font-size: 0.3rem;
  color: #666;
  text-align: center;
}

.wrap {
  margin: 0 auto;
  width: 100%;
  min-height: 100%;
  max-width: 7.5rem;
  font-size: 0.2rem;
  background-color: #fe6442;

  .topCard {
    margin: 0 0.22rem;
  }
}

.top {
  padding: 3.8rem 0 0.4rem;
  background-size: 100%;
  background-repeat: no-repeat;

  &Img {
    display: block;
    width: 100%;

    &Wrap {
      flex: 1;
      overflow: hidden;

      & + & {
        margin-left: 0.18rem;
      }
    }

    &Text {
      margin-top: 0.12rem;
      font-size: 0.21rem;
      font-weight: 600;
      color: #333;
    }

    &List {
      margin: 0.31rem 0.22rem 0;
      display: flex;
      justify-content: center;
    }
  }
}

.main {
  padding: 0.49rem 0.2rem;
  border-radius: 0.2rem;
  background-color: #f9c980;
}

.list {
  &Card {
    & + & {
      margin-top: 0.2rem;
    }

    &Desc {
      flex: 1;
      overflow: hidden;
    }

    &Title {
      font-size: 0.3rem;
      font-weight: 600;
      color: #333;
      line-height: 1.1;
      text-align: justify;
      text-justify: inter-word;
      word-break: break-all;
      .multi-ellipsis(2);
    }

    &Info {
      z-index: 1;
      position: relative;
      display: flex;
      font-size: 0.26rem;
      line-height: 1;
      color: #666;
      overflow: hidden;

      & + & {
        margin-top: 0.1rem;
      }

      &Txt {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        & + & {
          margin-left: 0.1rem;
        }

        &R {
          margin-left: auto !important;
        }
      }

      &Desc {
        line-height: 1.3;
      }

      &GPrice {
        line-height: 1;
        align-items: baseline;
      }

      &Tags {
        &:after {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          right: 0;
          width: 0.5rem;
          height: 100%;
          background: linear-gradient(to right, fade(#fff, 0), #fff);
        }
      }
    }

    &Tag {
      flex: 0 1 0;
      margin: 0.1rem 0.1rem 0 0;
      padding: 0.05rem 0.1rem;
      color: #999;
      background-color: #f3f6f8;
      white-space: nowrap;
      text-align: center;
    }

    &GPrice {
      font-size: 0.36rem;
      color: #f01b1b;
    }
  }
}
</style>
