<template lang="pug">
div
</template>

<script>
import { PhotoSwipeAsync } from '@/plug/photo-swipe'

export default {
  name: 'BaseGallery',
  props: {
    value: Boolean,
    items: Array,
    index: Number
  },

  watch: {
    value(to) {
      if (to) this.init()
      else this.destroy()
    }
  },

  methods: {
    async init() {
      const [
        { default: PhotoSwipe },
        { default: PhotoSwipeUI_Default }
      ] = await PhotoSwipeAsync()
      // console.log(PhotoSwipe)
      const pswp = new PhotoSwipe(
        this.$root.$_pswp,
        PhotoSwipeUI_Default,
        this.items,
        { ...this.$_opts, index: this.index }
      )

      pswp.listen('close', () => {
        this.$emit('input', false)
      })

      pswp.init()
      this.$_pswp = pswp
    },

    getCurrentIndex() {
      const pswp = this.$_pswp
      return pswp ? pswp.getCurrentIndex() : false
    },

    destroy() {
      // console.log(this, this.$_pswp)
      // this.$_pswp.destroy()
    }
  },

  created() {
    this.$_opts = {
      index: 0,
      captionEl: false,
      fullscreenEl: false,
      shareEl: false,
      bgOpacity: 0.85,
      tapToClose: true,
      tapToToggleControls: false
    }
  },

  beforeDestroy() {
    this.destroy()
  }
}
</script>
