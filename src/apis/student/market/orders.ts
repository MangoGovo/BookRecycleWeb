import { request } from '@/apis/axios'

const orders = (data: { page: Number; size: Number }) => {
  return request('/api/student/market/orders', {
    params: data,
    method: 'GET',
    jwt: true
  })
}

export default orders
