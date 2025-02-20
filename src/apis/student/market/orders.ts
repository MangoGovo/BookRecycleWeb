import { request } from '@/apis/axios'

const orders = () => {
  return request('/api/student/market/orders', {
    method: 'GET',
    jwt: true
  })
}

export default orders
