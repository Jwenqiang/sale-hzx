import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'

export const PhotoSwipeAsync = () =>
  Promise.all([
    import(/* webpackChunkName: "photoswipe" */ 'photoswipe'),
    import(
      /* webpackChunkName: "photoswipe" */ 'photoswipe/dist/photoswipe-ui-default'
    )
  ])
