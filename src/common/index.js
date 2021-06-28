import URL from 'url-parse'
import qs from 'querystring'

/**
 * 将 Vue Router 链接添加上指定 Query
 * e.g.
 * @param {String} link   要添加的链接地址
 * @param {Object} query  query object
 */
export const withRouteQueryToLink = (link, query) => {
  const str = qs.stringify(query)
  if (str) {
    const _u = new URL(link)
    _u.hash += (~_u.hash.indexOf('?') ? '&' : '?') + str
    return _u.toString()
  } else {
    return link
  }
}
