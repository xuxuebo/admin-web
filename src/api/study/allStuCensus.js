import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'check-in-student-detail/my',
    method: 'get',
    params
  })
}

export default { getList }
