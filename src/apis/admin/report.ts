import { request } from '@/apis/axios'

export const getReportList = () => {
  return request('/api/admin/report/list', {
    method: 'GET',
    jwt: true
  })
}

export const acceptReport = (data: { id: number }) => {
  return request('/api/admin/report/pass', {
    method: 'POST',
    data: data,
    jwt: true
  })
}

export const rejectReport = (data: { id: number }) => {
  return request('/api/admin/report/undo', {
    method: 'POST',
    data: data,
    jwt: true
  })
}
