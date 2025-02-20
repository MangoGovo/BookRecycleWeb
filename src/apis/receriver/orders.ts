import { request } from '@/apis/axios'

const orders = () => {
  return request('/api/receiver/orders', {
    method: 'GET',
    jwt: true
  })
}

export default orders
