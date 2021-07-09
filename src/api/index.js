import request from '@/utils/request'

export function getCollege(params) {
  return request({
    url: 'skl/common/all-unit',
    method: 'get',
    params
  })
}

export default { getCollege }
