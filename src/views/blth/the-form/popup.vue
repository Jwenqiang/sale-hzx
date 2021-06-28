<template lang="pug">
van-popup(
  :value='!!state.formSection',
  position='bottom',
  round,
  @click-overlay='handleClickOverlay()',
  :class='$style.popup'
)
  div(:class='$style.wrap')
    div(:class='$style.titleWrap')
      div(:class='$style.title') 提交资料

    base-form(
      ref='form',
      :section-id='state.formSection',
      :class='$style.form',
      @success='handleFormSuccess()'
    )/
</template>

<script>
import BaseForm from '@/components/base-form'
import mixins from '../mixins'

export default {
  name: 'TheFormPopup',
  mixins: [mixins],
  components: { BaseForm },

  methods: {
    handleClickOverlay() {
      if (!this.$refs.form.submitting) this.state.formSection = null
    },

    handleFormSuccess() {
      this.state.formSection = null
    }
  }
}
</script>

<style lang="less" module>
.popup {
  display: block;
  max-width: 11.29rem;
  left: 0;
  right: 0;
  margin: 0 auto;
}

.wrap {
  :global(.van-cell__title) {
    font-size: 0.34rem !important;
    font-weight: 500;
    color: #a6a6a6;
  }
  :global(.van-field__control) {
    font-size: 0.32rem !important;
    font-weight: 400;
  }
}

.title {
  font-size: 0.4rem;
  font-weight: 500;
  color: #333;
  line-height: 0.56rem;
  text-align: center;

  &Wrap {
    padding: 0.22rem 0 0.26rem;
    background-color: #f5f5f5;
  }
}

.form {
  padding: 0.78rem 0.42rem 1.18rem;
}
</style>
