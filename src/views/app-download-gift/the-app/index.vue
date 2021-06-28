<template lang="pug">
//- APP 页面结构
  .wrap
    .main // 主要活动区
      .mainActivityWrap // 抽奖区
        .scrollPrize // 顶部跑马灯
        ... // 滚动抽奖区域
      .mainDesc // 下方条件和奖品列表显示区
        ...

div(:class='$style.wrap')
  //- 主要活动区
  div(:class='$style.main')
    //- 抽奖区 main activity
    div(:class='$style.mainActivityWrap')
      //- 背景图
      img(
        :class='$style.mainActivityImg',
        :src='`${$_publicPath}img/app-download/bg-m-app.png`'
      )/
      div(:class='$style.mainActivity')
        //- 跑马灯
        the-marquee/

        //- 滚动抽奖
        div(:class='$style.scrollPrize')
          the-scroll-prize(
            v-for='item of indexes',
            v-model='item.index',
            :speed='item.speed',
            :key='item.id',
            :id='item.id',
            :loop='item.loop',
            :class='$style.scrollPrizeItem',
            ref='prize',
            @scrollEnd='handleScrollEnd(item)',
            @toSpeed='handleToSpeed(item)'
          )/

        div(:class='$style.mainActivityToolbar')
          //- 抽奖杠
          div(:class='$style.mainActivityToolbarBarWrap')
            img(
              :class='{ [$style.mainActivityToolbarBtn]: true, [$style.mainActivityToolbarBar]: true, [$style.mainActivityToolbarBarAnimate]: animBar }',
              :src='$_publicPath + "img/app-download/btn-bar.png"',
              @animationend='handleBarAnimationEnd()'
            )/
          //- 抽奖按钮
          div(
            :class='$style.mainActivityToolbarStartWrap',
            @touchstart='handleTouchEvent(0, $event)',
            @touchend='handleTouchEvent(0, $event)',
            @touchcancel='handleTouchEvent(0, $event)'
          )
            img(
              :class='[$style.mainActivityToolbarBtn, $style.mainActivityToolbarStart]',
              :src='$_btnMap[0][0 + touchingStart]'
            )/
          //- 我的奖品按钮
          div(
            @touchstart='handleTouchEvent(1, $event)',
            @touchend='handleTouchEvent(1, $event)',
            @touchcancel='handleTouchEvent(1, $event)',
            :class='$style.mainActivityToolbarMyWrap'
          )
            img(
              :class='[$style.mainActivityToolbarBtn, $style.mainActivityToolbarMy]',
              :src='$_btnMap[1][0 + touchingMy]'
            )/

    //- 下方条件及奖品区 main desc
    div(:class='$style.mainDesc')
      //- 抽奖需满足以下条件
      the-lottery-conditions(
        :conditions='conditions',
        @stateClick='handleConditionClick'
      )/

      //- 奖品列表
      the-prize-list/

  //- 恭喜抽中奖品
  result-prize-popup(v-if='resultPrize', :result-prize='resultPrize')/

  //- 参与过、不符合条件、未中奖提示
  the-popup(
    v-model='popupConf.visible',
    :btn-text='popupConf.btnText',
    :type='popupConf.type'
  )/

  //- 绑定经纪人
  the-popup-binding(v-model='visibleBingding')/

  //- 子路由，目前仅展示我的奖品 my-prize
  transition(name='van-fade')
    router-view/

  //- 新用户帮助
  van-dialog(:value='tipDialogVisible', :show-confirm-button='false')
    div(:class='$style.tipDialogWrap')
      div(:class='$style.tipDialogText') 本活动仅限通过活动海报扫码下载 APP 的新用户
      base-btn(:class='$style.tipDialogBtn', @click='tipDialogVisible = false') 知道了
</template>

<script>
import CurrentDevide from 'current-device'
import ThePrizeList from '../the-prize-list'
import TheLotteryConditions from '../the-lottery-conditions'
import TheScrollPrize from '../the-scroll-prize'
import TheMarquee from './the-marquee'
import ThePopup from './the-popup'
import ThePopupBinding from './the-popup-binding'
import {
  getUserInfo,
  init as initApp,
  setCookie,
  triggerUserInfo
} from '@/common/app'
import { GetUserPermission, GetRandomPrize } from '../lib/request'
import prizeList from '../prize-list'
import preloadImg from '../lib/preload-img'
import goToBingding from '../lib/go-to-binding'
import { trackClickMonitor } from '../lib/config'
import BaseBtn from '../components/base-btn'
import { upLog } from '@/common/trace'
// import { isDebug } from '@/config'

export default {
  name: 'TheApp',
  components: {
    BaseBtn,
    TheMarquee,
    ThePopup,
    ThePopupBinding,
    ThePrizeList,
    TheScrollPrize,
    TheLotteryConditions,
    ResultPrizePopup: () => import('./the-result-prize-popup')
  },

  data() {
    return {
      /**
       * 按钮点击态
       */
      touchingStart: false,
      touchingMy: false,

      /**
       * 参与过、不符合条件或未中奖的提示 popup
       */
      popupConf: {
        visible: false,
        type: 0,
        btnText: '立即分享'
      },

      /**
       * 添加经纪人 popup
       */
      visibleBingding: false,

      /**
       * 参与抽奖的条件
       * key: 后端接口对应的 property key
       * title: 条件显示名称
       * state: 是否符合条件
       * trueValue: 符合条件时显示的文字
       * falseValue: 不符合条件时显示的文字
       * error: 出现错误时的 Error 对象，将显示到界面
       */
      conditions: [
        {
          key: 'IsNew',
          title: '线下受邀新用户',
          state: false,
          trueValue: '符合条件',
          falseValue: '不符合',
          icon: 'question-o',
          iconClickHandler: () => {
            this.tipDialogVisible = true
          },
          error: '未登录'
        },
        {
          key: 'IsBind',
          title: '添加专属经纪人',
          state: false,
          trueValue: '已完成',
          falseValue: '去添加',
          error: '未登录'
        }
      ],

      /**
       * 老虎机滚动控制
       */
      indexes: [
        { id: 0, index: 2, speed: 0, defaultSpeed: 1.3, loop: true },
        { id: 1, index: 3, speed: 0, defaultSpeed: 0.8, loop: true },
        { id: 2, index: 4, speed: 0, defaultSpeed: 1, loop: true }
      ],

      /**
       * 抽奖状态控制
       */
      starting: false, // 是否正在抽奖
      animBar: false, // 控制抽奖杠
      resultPrize: null, // 抽中的奖品, false 为未中奖

      /**
       * 新用户点击问号的 dialog
       */
      tipDialogVisible: false
    }
  },

  methods: {
    /**
     * 检查抽奖条件
     * @returns {Boolean}  返回是否符合抽奖条件
     */
    checkConditions() {
      const found = this.conditions.find(item => !item.state)
      if (found) {
        switch (found.key) {
          case 'IsNew':
            this.popupConf.type = 0
            this.popupConf.visible = true
            break

          case 'IsBind':
            this.visibleBingding = true
            break
        }

        return false
      } else {
        return true
      }
    },

    /**
     * 开始抽奖
     */
    async handleStart() {
      // 有抽奖结果不再继续抽奖
      if (this.resultPrize === false) {
        this.popupConf.type = 1
        this.popupConf.visible = true
        return
      } else if (this.resultPrize) {
        this.resultPrize = { ...this.resultPrize }
        return
      }

      // 检查抽奖条件
      await this.refreshConditions()
      if (!this.checkConditions()) return

      this.starting = true
      this.animBar = true

      // 确保初始滚动加速完成
      const indexes = this.indexes
      for (const item of indexes) {
        await item.initPromise
      }

      const toastLoading = this.$toast.loading({
        message: '正在加载',
        duration: 0
      })

      let resultPrize

      try {
        const userInfo = await getUserInfo({ open: true })
        const info = userInfo?.data
        if (!info) throw new Error('未知用户')

        // // === debug ===
        // window.aa = GetRandomPrize
        // const res = {
        //   IsSuccess: true,
        //   Msg: '抽奖成功',
        //   Src: {
        //     Mobile: '17098992477',
        //     PrizeName: '奖品AAA',
        //     PrizeType: 1 + parseInt(Math.random() * 6),
        //     Code: 0
        //   }
        // }
        // // === debug end ===

        upLog({ t: 'GetRandomPrize', info })
        const res = await GetRandomPrize(
          info.Phone,
          info.UserId,
          info.UserToken
        )
        this.$_log('GetRandomPrize: ', res)
        upLog({ t: 'GetRandomPrize', res })
        if (!res) throw new Error('请求错误')

        if (res.IsSuccess && res.Src?.PrizeType) {
          resultPrize = this.$_prizeList.find(
            item => item.idInServer === res.Src.PrizeType
          )
        } else if (res.Src.Code === 0) {
          this.popupConf.type = 0
          this.popupConf.visible = true
          toastLoading.clear()
          this.starting = false
          return
        } else if (res.Src.Code === 1) {
          this.popupConf.type = 2
          this.popupConf.visible = true
          toastLoading.clear()
          this.starting = false
          return
        }

        toastLoading.clear()
      } catch (err) {
        this.$_error(err)
        this.$toast(err.message)
        this.starting = false
        return
      }

      // 加速
      const promises = indexes.map(item => {
        item.toSpeed = false
        item.loop = true
        item.speed = 12 + item.defaultSpeed
        return new Promise(resolve => {
          item.speedPromiseResolve = resolve
        })
        // item.speedPromise = promise
      })
      await Promise.all(promises)

      // // 减速
      // const toIndex = 3
      // const speed = this.$refs.prize[0].size / 120
      // await Promise.all(
      //   indexes.map(item => {
      //     item.speedPromiseResolve = null // release

      //     item.speed -= 5
      //     return new Promise(resolve => {
      //       // item.index += toIndex - (item.index % 6)
      //       item.speedPromiseResolve = resolve
      //     })
      //   })
      // )

      const toIndex = resultPrize.index
      this.$_log('resultPrize: ', resultPrize)
      for (const item of indexes) {
        // const firstScrolling = indexes.some(obj => !!obj.speed)
        if (item.speed) {
          await new Promise(resolve => {
            setTimeout(() => {
              item.speed = 0
              item.loop = false
              const oldIndex = item.index
              const len = this.$_prizeList.length
              // 11+6-(11%6)+2
              item.index = item.index + len - (item.index % 6) + toIndex
              // const targetIndex = item.index + toIndex - (item.index % len)
              // item.index =
              //   targetIndex > item.index ? item.index : targetIndex + len
              this.$_log(oldIndex, item.index)
              item.scrollEndPromiseResolve = resolve
            }, 0)
          })
          item.scrollEndPromiseResolve = null // release
        }
      }

      // 稍等一会儿再弹出礼品
      await new Promise(resolve => setTimeout(resolve, 300))

      // this.resultPrize = this.$_prizeList.find(({ index }) => index === toIndex)
      if (resultPrize) {
        if (resultPrize.isEmpty) {
          this.popupConf.type = 1
          this.popupConf.visible = true
          this.resultPrize = false
        } else {
          this.resultPrize = resultPrize
        }
      } else {
        this.$toast('未知奖品')
      }
      this.starting = false
    },

    /**
     * 摇杆摇动完成
     */
    handleBarAnimationEnd() {
      this.animBar = false
      this.$nextTick(() => {
        this.animBar = this.starting
        this.$_log(this.animBar)
      })
    },

    /**
     * 滚动到目标 index
     */
    handleScrollEnd(item) {
      if (item.scrollEndPromiseResolve) item.scrollEndPromiseResolve()
    },

    /**
     * 达到目标速度
     * 减速到 0 不会触发
     */
    async handleToSpeed(item) {
      this.$_log('handleToSpeed: ', { ...item })

      if (!item.inited) {
        item.inited = true
        item.initPromiseResolve()
      }

      item.toSpeed = true
      if (item.speedPromiseResolve) {
        item.speedPromiseResolve()
      }
    },

    /**
     * 刷新抽奖条件
     */
    async refreshConditions() {
      // const userId = userInfo.data?.UserId
      // const token = userInfo.data?.UserToken

      const userInfo = await getUserInfo({ open: false }).catch(() => {})
      if (userInfo?.data) {
        this.$_userInfo = userInfo.data
      } else {
        this.$toast('请先登录 APP')
        triggerUserInfo({ open: true })
        return false
      }

      try {
        const info = userInfo.data
        upLog({ t: 'GetUserPermission', w: 'before', u: userInfo })
        const res = await GetUserPermission(
          info.Phone,
          info.UserId,
          info.UserToken
        )
        const { Msg, Src } = res
        upLog({ t: 'GetUserPermission', w: 'after', res })
        if (!Src) throw new Error(Msg || '服务器错误')

        let allDone = true
        for (const item of this.conditions) {
          const state = Src[item.key]
          item.state = state
          item.error = false
          if (!state) allDone = false
        }
        this.$_allConditionsDone = allDone

        return allDone
      } catch (err) {
        upLog({ t: 'GetUserPermission', err: err.message })
        this.conditions.forEach(item => {
          item.state = false
          item.error = '不符合'
        })
        // this.$toast(err.message) // 正常流程会出现 Network Error 影响体验
        return false
      }
    },

    /**
     * 按钮点击事件
     */
    handleTouchEvent(typ, evt) {
      evt.preventDefault()
      const touching = evt.type === 'touchstart'

      if (this.starting) return false // 抽奖滚动中禁止点击

      if (typ === 0) {
        // 抽奖按钮
        this.touchingStart = touching
        touching || this.handleStart()

        // gio
        trackClickMonitor.call(this, '抽奖按钮', false)
      } else if (typ === 1) {
        // 我的奖品
        this.touchingMy = touching
        touching || this.$router.push({ name: 'appDownloadGiftMyPrize' })
      }

      return false
    },

    /**
     * 下方抽奖条件点击事件
     * 用于跳转绑定经纪人
     */
    handleConditionClick(item) {
      if (item.key === 'IsBind' && !item.state && !item.error) {
        goToBingding()
      }
    },

    /**
     * 保证用户登录
     */
    async keepLogin() {
      // 刷新抽奖条件
      // this.conditions.forEach(item => (item.state = true)) // debug
      const isLogin = await this.refreshConditions()

      if (isLogin) {
        this.keepCondition()
      } else {
        let interval
        interval = () => {
          this.$_log('interval')
          getUserInfo({ open: false }).then(
            userInfo => {
              // this.$_log('userInfo: ', userInfo)
              if (userInfo?.data) {
                if (!CurrentDevide.ios()) this.$toast('登录成功')
                this.$_userInfo = userInfo?.data
                this.keepCondition()

                setCookie(userInfo.data.UserToken, 'token', 365000)
              } else {
                setTimeout(interval, 300)
              }
            },
            err => {
              this.$_log(err)
              setTimeout(interval, 300)
            }
          )
        }
        interval()
      }
    },

    /**
     * 保证用户满足条件
     */
    async keepCondition() {
      if (!this.$_allConditionsDone) {
        await this.refreshConditions()
        setTimeout(this.keepCondition, 300)
      }
    }
  },

  beforeCreate() {
    initApp()

    this.$_prizeList = prizeList.call(this)

    const publicPath = this.$_publicPath
    const btnMap = [
      // 0=开始抽奖按钮
      [
        publicPath + 'img/app-download/btn-start.png',
        publicPath + 'img/app-download/btn-start-press.png'
      ],
      // 1=我的奖品按钮
      [
        publicPath + 'img/app-download/btn-my.png',
        publicPath + 'img/app-download/btn-my-press.png'
      ]
    ]
    btnMap.forEach(item => preloadImg(item[1]))
    this.$_btnMap = btnMap
  },

  created() {
    this.keepLogin()
    this.indexes.forEach(item => {
      item.speed = item.defaultSpeed * 2
      item.initPromise = new Promise(resolve => {
        item.initPromiseResolve = resolve
      })
    })
  }
}
</script>

<style lang="less" module>
@import '../index';

.wrap {
  position: relative;
  font-size: 0.3rem;
}

.main {
  padding: 0 0.26rem;

  /** 抽奖区 */
  &Activity {
    position: absolute;
    padding: 0 0.54rem;
    left: 0;
    top: 0;
    width: 100%;

    &Wrap {
      position: relative;
    }

    &Img {
      display: block;
      width: 100%;
    }

    /** 抽奖滚动 */
    .scrollPrize {
      display: flex;
      justify-content: center;
      padding: 0.06rem 0;
      margin-top: 0.64rem;

      &Item {
        margin: 0 0.03rem;

        & + & {
          margin-left: 0.06rem;
        }
      }
    }

    /** 抽奖按钮 */
    &Toolbar {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      height: 2.47rem;
      user-select: none;

      &Btn {
        display: block;
        width: 100%;
        transition: transform 0.3s ease;
      }

      /** 抽奖杠 */
      &Bar {
        transform-origin: bottom center;
        transform: rotate(-30deg);

        &Wrap {
          position: relative;
          left: 0.38rem;
          bottom: 0.7rem;
          width: 0.48rem;
        }

        &Animate {
          animation: bar 1.5s ease;

          @keyframes bar {
            from {
              transform: rotate(-30deg);
            }
            50% {
              transform: rotate(30deg);
            }
            to {
              transform: rotate(-30deg);
            }
          }
        }
      }

      /** 抽奖按钮 */
      &Start {
        &Wrap {
          position: relative;
          left: 0.23rem;
          width: 2.6rem;
          bottom: 0.08rem;
          overflow: hidden;
        }
      }

      /** 我的奖品按钮 */
      &My {
        &Wrap {
          width: 1rem;
          position: relative;
          left: -0.3rem;
          bottom: 0.25rem;
        }
      }
    }
  }

  /** 下方条件及奖品区 */
  &Desc {
    .mainFoot();
  }
}

/** 新用户点击问号的 dialog */
.tipDialog {
  &Wrap {
    padding: 0.6rem 0.5rem 0.2rem;
    font-size: 0.35rem;
    margin-bottom: 0.3rem;
  }

  &Btn {
    margin: 0.5rem auto 0 !important;
    width: 3rem;
  }
}
</style>
