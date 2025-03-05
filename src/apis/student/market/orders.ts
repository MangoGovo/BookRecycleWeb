import { request } from '@/apis/axios'

export const orders = () => {
  return request('/api/student/market/orders', {
    method: 'GET',
    jwt: true
  })
}

export const report = (data: { book_id: number; title: string }) => {
  return request('/api/student/market/report', {
    method: 'POST',
    data: data,
    jwt: true
  })
}
