import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'skl/jobs',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'skl/jobs',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'skl/jobs',
    method: 'put',
    data
  })
}

export function updateIsPause(id) {
  return request({
    url: 'skl/jobs/' + id,
    method: 'put'
  })
}

export function execution(id) {
  return request({
    url: 'skl/jobs/exec/' + id,
    method: 'put'
  })
}

export default { del, updateIsPause, execution, add, edit }
