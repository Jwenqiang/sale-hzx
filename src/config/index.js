const href = (global || window)?.location?.href
module.exports = {
  isDebug:
    process.env.NODE_ENV === 'development' ||
    (href ? !!~href.indexOf('0f37aae4500d21a9bd5bd1540478a778') : false),

  title: '中原'
}
