export default autoOpen =>
  new Promise((resolve, reject) => {
    import(/* webpackChunkName: "vconsole" */ 'vconsole').then(
      ({ default: VConsole }) => {
        if (autoOpen) new VConsole()
        resolve(VConsole)
      },
      reject
    )
  })
