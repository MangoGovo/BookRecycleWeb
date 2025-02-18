import { request } from '@/apis/axios'

const products = (data: { page: Number; size: Number }) => {
  return request('/api/market/products', {
    params: data,
    method: 'GET',
    jwt: true
  })
}

export default products
