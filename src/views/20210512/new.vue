<template>
  <!-- 新房 -->
  <div :class="$style.wrap">
    <div
      :class="$style.top"
      :style="`background-image:url(${$_publicPath}img/20210512/5e59038f.jpg)`"
    >
      <div :class="$style.topImgList">
        <div v-for="item of $_imgs" :class="$style.topImgWrap" :key="item.t">
          <img :class="$style.topImg" :src="item.s" />
          <div :class="$style.topImgText">{{ item.t }}</div>
        </div>
      </div>
    </div>

    <div :class="$style.main" ref="main">
      <div v-if="list" :class="$style.list">
        <the-card
          v-for="item of list"
          :house="item"
          :class="$style.listCard"
          :key="item.AdName || item.EstName"
        >
          <template #desc>
            <div :class="$style.listCardDesc">
              <div :class="$style.listCardHead">
                <span :class="$style.listCardHeadTitle">{{
                  item.EstName
                }}</span>
                <span :class="$style.listCardHeadAvg">{{ item._avg }}</span>
              </div>
              <div :class="$style.listCardMain">
                <div :class="$style.listCardMainLine">
                  <!-- X室X厅 -->
                  <span v-if="item._typ" :class="$style.listCardMainTyp">{{
                    item._typ
                  }}</span>

                  <!-- X平 -->
                  <span v-if="item._area" :class="$style.listCardMainArea">{{
                    item._area
                  }}</span>

                  <!-- X万起 -->
                  <span v-if="item._min" :class="$style.listCardMainMin">{{
                    item._min
                  }}</span>
                </div>

                <div :class="$style.listCardMainLine">
                  <!-- e.g. 龙岗区-中心城 -->
                  <span v-if="item._scope">{{ item._scope }}</span>
                </div>

                <div
                  :class="[
                    $style.listCardMainLine,
                    $style.listCardMainLineTags
                  ]"
                >
                  <!-- e.g. 住宅 -->
                  <span
                    v-if="item._eTyp"
                    :class="[$style.listCardMainTag, $style.listCardMainETyp]"
                    >{{ item._eTyp }}</span
                  >

                  <!-- e.g. 南北通透 -->
                  <template v-if="item._feats && item._feats.length">
                    <span
                      v-for="feat of item._feats"
                      :key="feat"
                      :class="$style.listCardMainTag"
                      >{{ feat }}</span
                    >
                  </template>
                </div>
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
import { throttle, orderBy } from 'lodash'
import AxiosAsync from '@/plug/axios'
import TheCard from './components/card'
import { upLog } from '@/common/trace'
import { init as initDMP } from './lib/dmp'

export default {
  name: 'New',
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
          'https://sz.centanet.com/partner/huihansubmit/api/TuiGuang2Activity/GetNewPropEstates',
          { Keyword: '', PageIndex: ++this.page, PageCount: 10 }
        )

        let list = this.list
        if (!list) list = this.list = []

        this.list = list.concat(
          orderBy(
            res.map(item => {
              const averagePrice = parseInt(item.AveragePrice) || 0
              const RoomCnt = parseInt(item.MainHouseTypes?.RoomCnt)
              const HallCnt = parseInt(item.MainHouseTypes?.HallCnt)
              const area = parseFloat(item.MainHouseTypes?.Area)
              const min = parseFloat(item.MinTotalPrice)
              const district = item.District?.GScopeCnName
              const scope = item.GScope?.GScopeCnName
              const estType = item.EstType
              const feats = item.Features || null

              const _scope = []
              district && _scope.push(district)
              scope && _scope.push(scope)

              const ret = {
                _avg: averagePrice ? `${averagePrice}元/平` : '售价未定',
                _typ: RoomCnt && HallCnt ? `${RoomCnt}室${HallCnt}厅` : null,
                _area: area ? `${area}平` : null,
                _min: min ? `${min}万起` : null,
                _scope: _scope.join('-') || null,
                _eTyp: estType || null,
                _feats: feats ? feats.split(/[- 、,，]/) : null,
                EstId: item.EstId,
                AdName: item.AdName,
                EstName: item.EstName,
                FullImagePath: item.FullImagePath,
                MinTotalPrice: parseInt(item.MinTotalPrice),
                _avgInt: averagePrice
                // ...item // for debug
              }

              return ret
            }),
            ({ _avgInt }) => (_avgInt ? _avgInt : 1e9)
          )
        )
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
      // console.log(this.$el.offsetHeight)
    }, 100)
  },

  beforeCreate() {
    this.$_imgs = [
      {
        s: this.$_publicPath + 'img/20210512/1a6c8540.png',
        t: '品牌装修，新开楼盘'
      },
      {
        s: this.$_publicPath + 'img/20210512/8f8fddf8.png',
        t: '环境优质，地铁周边'
      }
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
  background-color: #f9c980;
}

.top {
  padding: 4.4rem 0 0.35rem;
  background-color: #f8724d;
  background-size: 100%;
  background-repeat: no-repeat;

  &Img {
    display: block;
    width: 100%;

    &Wrap {
      flex: 1;
      overflow: hidden;

      & + & {
        margin-left: 0.46rem;
      }
    }

    &Text {
      margin-top: 0.12rem;
      font-size: 0.21rem;
      font-weight: 600;
      color: #333;
    }

    &List {
      margin: 0.31rem 0.48rem 0;
      display: flex;
      justify-content: center;
    }
  }
}

.main {
  padding: 0.49rem 0.2rem;
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

    &Head {
      .flex();
      font-size: 0.3rem;
      font-weight: 600;
      line-height: 1.2;

      &Title {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &Avg {
        margin-left: auto;
        flex-shrink: 0;
        color: #ff2d19;
      }
    }

    &Main {
      font-size: 0.26rem;
      color: #666;

      &Line {
        z-index: 1;
        position: relative;
        .flex();
        align-items: center;
        line-height: 1;
        overflow: hidden;
        margin-top: 0.1rem;

        :global(span) {
          margin-right: 0.1rem;

          &:last-child {
            margin-right: 0;
          }
        }

        &Tags {
          z-index: 1;

          &:after {
            position: absolute;
            right: 0;
            top: 0;
            width: 0.5rem;
            height: 100%;
            background: linear-gradient(to right, fade(#fff, 0), #fff);
          }
        }

        &:after {
          z-index: 1;
          content: '';
          display: block;
          flex: 999;
        }
      }

      /** X万起 */
      &Min {
        margin-left: auto !important;
      }

      /** 标签 */
      &Tag {
        flex: 1 1 0;
        margin-top: 0.1rem;
        align-content: flex-start;
        color: #999;
        background-color: #f3f6f8;
        padding: 0.05rem 0.1rem;
        white-space: nowrap;
        text-align: center;
      }

      /** 标签 e.g. 住宅 */
      &ETyp {
        flex-grow: 0;
        color: #fff;
        background-color: #54a9ff;
      }
    }
  }
}
</style>
