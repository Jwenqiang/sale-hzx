import { isDebug } from '@/config'

export const log = function() {
  if (isDebug) window.console.log(...arguments)
}

export const error = err => {
  if (isDebug) window.console.error(err)
}

/**
 * 记录调试信息
 * @param {Object} data  要记录的调试信息，a 键不可使用，用于标记 location
 */
export const upLog = data => {
  const u = new URLSearchParams()
  u.set('a', window.location.href)
  u.set('r', Date.now().toString(36))
  for (const key in data) {
    const item = data[key]
    u.set(key, typeof item === 'object' ? JSON.stringify(item) : item)
  }
  const img = new Image()
  img.src = 'https://cent.ex666.cn/0.gif?' + u.toString()
}
