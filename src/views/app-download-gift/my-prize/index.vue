<template>
  <!-- 我的奖品页 -->
  <div :class="$style.wrap">
    <template v-if="adrInfo && adrInfo.PrizeId">
      <!-- 收件信息 -->
      <the-info-card :adr-info="adrInfo" @updated="handleUpdatedAdress" />

      <!-- 奖品列表 -->
      <the-card :class="$style.prize">
        <div :class="$style.prizeInfo">
          <the-prize :class="$style.prizeImg" :index="prizeIndex" />
          <div :class="$style.prizeInfoDesc">
            <div :class="$style.prizeInfoDescName">{{ adrInfo.PrizeName }}</div>
            <div>
              <span>中奖时间：</span>
              <span :class="$style.prizeInfoDescTime">{{
                adrInfo.PrizeName
              }}</span>
            </div>
          </div>
        </div>
        <div :class="$style.prizeExpress">
          <span :class="$style.prizeExpressNo"
            >快递单号：{{ adrInfo.ExpressNo || '暂无' }}</span
          >
        </div>

        <div :class="$style.prizeExpressStatus">
          {{ adrInfo.Status ? '已发货' : '未发货' }}
        </div>
      </the-card>
    </template>

    <!-- 无奖品 -->
    <div v-else :class="$style.empty">
      <img
        :src="$_publicPath + 'img/app-download/empty-prize.png'"
        :class="$style.emptyImg"
      />
      <div :class="$style.emptyText">暂时未中奖品</div>
      <a
        href="javascript:;"
        :class="$style.emptyGo"
        @click="$router.replace({ name: 'appDownloadGift' })"
        >去抽奖</a
      >
    </div>
  </div>
</template>

<script>
import TheCard from './the-card'
import TheInfoCard from './the-info-card'
import ThePrize from '../the-prize'
import { getUserInfo } from '@/common/app'
import { GetPrizeAndSite } from '../lib/request'
import prizeList from '../prize-list'
// import { isDebug } from '@/config'

export default {
  name: 'MyPrize',
  components: { TheCard, TheInfoCard, ThePrize },
  data() {
    return {
      refreshing: true,
      adrInfo: null
    }
  },

  computed: {
    prizeIndex: ({ adrInfo, $_prizeList }) => {
      if (adrInfo) {
        const prize = $_prizeList.find(
          item => item.idInServer === adrInfo.PrizeId
        )
        return prize.index
      }
      {
        return null
      }
    }
  },

  methods: {
    async refresh({ hideToast = false } = {}) {
      this.refreshing = true
      const toastLoading = this.$toast.loading({
        message: '加载奖品',
        forbidClick: true
      })
      try {
        const { data: info } = await getUserInfo({ open: true })
        const { Src } = await GetPrizeAndSite(info.Phone)
        this.adrInfo = Src

        // // for debug
        // this.adrInfo = {
        //   Name: 'string',
        //   Mobile: 'string',
        //   AddrMobile: 'string',
        //   District: 'string',
        //   Address: 'string',
        //   PrizeName: '透明雨伞',
        //   PrizeId: 2,
        //   WinPrizeTime: 'string',
        //   ExpressNo: 'string',
        //   ExpressCompany: 'string',
        //   Status: true
        // }

        // for debug
        toastLoading.clear()
      } catch (err) {
        if (!hideToast) this.$toast(err.message)
      }

      this.refreshing = false
    },

    handleUpdatedAdress(info) {
      const adrInfo = this.adrInfo
      this.adrInfo = adrInfo
        ? Object.assign(this.adrInfo, { ...info })
        : { ...info }
    }
  },

  beforeCreate() {
    document.body.style.overflow = 'hidden'
    this.$_prizeList = prizeList.call(this)
  },

  mounted() {
    this.refresh({ hideToast: true })
  },

  beforeDestroy() {
    document.body.style.overflow = ''
  }
}
</script>

<style lang="less" module>
.wrap {
  // position
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;

  .flex-column-center();
  align-items: stretch;
  padding: 0.3rem;
  background-color: #ededed;
}

/** 空奖品 */
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 0.32rem;
  font-weight: 400;
  color: #b2b2b2;
  line-height: 0.54rem;

  &Img {
    display: block;
    width: 5.31rem;
  }

  &Text {
    margin-top: -0.3rem;
  }

  /** 去抽奖按钮 */
  &Go {
    display: block;
    margin-top: 0.3rem;
    padding: 0.08rem 0.2rem;
    font-size: 0.28rem;
    border-radius: @border-radius-max;
    border: 0.01rem solid #fa8825;
    color: #fa8825;
    line-height: 1;
  }
}

/** 奖品信息 */
.prize {
  margin-top: 0.3rem;
  display: flex;
  flex-direction: column;
  padding: 0.22rem;
  text-align: left;

  &Img {
    width: 1rem;
  }

  &Info {
    display: flex;
    align-items: flex-start;

    &Desc {
      margin-left: 0.24rem;
      font-size: 0.28rem;
      color: #666;

      &Name {
        margin-bottom: 0.1rem;
        font-size: 0.32rem;
        font-weight: 600;
        color: #333;
      }

      &Time {
        color: #333;
      }
    }
  }

  &Express {
    display: flex;
    margin-top: 0.25rem;

    &No {
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &Status {
      margin-top: 0.1rem;
      text-align: center;
      border-radius: @border-radius-max;
      border: 0.02rem solid #666;
      padding: 0.05rem 0.2rem;
      color: #666;
      align-self: flex-end;
    }
  }
}
</style>
