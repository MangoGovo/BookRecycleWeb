import { request } from '@/apis/axios'

const currentOrder = () => {
  return request('/api/receiver/current_order', {
    method: 'GET',
    jwt: true
  })
}

export default currentOrder
