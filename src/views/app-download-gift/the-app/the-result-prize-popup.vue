<template>
  <van-popup
    v-model="visible"
    :class="$style.popup"
    @close-on-click-overlay="handleClose()"
    @click-overlay="handleClose()"
  >
    <div :class="$style.wrap">
      <div :class="$style.main">
        <img
          :src="$_publicPath + 'img/app-download/red-pack-bg.png'"
          :class="$style.img"
        />

        <div :class="$style.mainContent">
          <div :class="$style.sucTitle">恭喜你抽中</div>
          <div :class="$style.sucName">{{ resultPrize.name }}</div>

          <the-prize
            :index="resultPrize.index"
            :size="$_prizeSize"
            :class="$style.sucPrize"
          />

          <div :class="$style.sucTip">
            奖品将在15个中工作日内发出<br />注：收货地仅限深圳市
          </div>
        </div>
      </div>

      <base-btn @click="goToMyPrize()" :class="$style.btn"
        >填写收货地址</base-btn
      >
    </div>
  </van-popup>
</template>

<script>
import ThePrize from '../the-prize'
import BaseBtn from '../components/base-btn'

export default {
  name: 'TheResultPrizePopup',
  components: { ThePrize, BaseBtn },
  props: {
    resultPrize: Object
  },

  data() {
    return {
      visible: !!this.resultPrize
    }
  },

  watch: {
    resultPrize(to) {
      if (to) this.visible = true
    }
  },

  methods: {
    handleClose() {
      this.visible = false
    },

    goToMyPrize() {
      this.visible = false
      this.$router.push({ name: 'appDownloadGiftMyPrize' })
    }
  },

  beforeCreate() {
    this.$_prizeSize = window.innerWidth * 0.2
  }
}
</script>

<style lang="less" module>
.popup {
  background-color: transparent;
}

.wrap {
  .btn {
    margin: 0 auto;
    width: 3.5rem;
    transform: translate3d(0, -60%, 0);
  }
}

.main {
  position: relative;

  &Content {
    position: absolute;
    top: 4.2rem;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #f0f0f0;
    // justify-content: center;
  }
}

/** 恭喜抽中文字 */
.suc {
  &Title {
    font-size: 0.38rem;
    font-weight: 500;
  }

  &Name {
    font-size: 0.48rem;
    font-weight: 500;
    color: #fff;
  }

  &Tip {
    font-size: 0.2rem;
  }

  &Prize {
    margin: 0.2rem 0;
  }
}

/** 红包背景 */
.img {
  display: block;
  width: 7rem;
}
</style>
