import { init as initDMP } from '@/common/dmp'

export const MAP = {
  GDT: 1111824534,
  HTGDT: 1111877082
}

export function init() {
  const qr = this?.$route?.query
  if (typeof qr !== 'object')
    throw new Error('Can not init DMP, $route.query is null.')

  const entry = Object.entries(qr).find(([key]) => key.toLowerCase() === 'sem')
  if (!entry) throw new Error('Cannot init DMP, sem is not in query.')

  const projectID = MAP[String(entry[1].toUpperCase()).trim()]
  if (projectID) {
    initDMP(projectID)
  } else {
    throw new Error('Cannot init DMP use empty project id.')
  }
}
