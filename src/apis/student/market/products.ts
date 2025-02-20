import { request } from '@/apis/axios'

const products = (data: { search: string }) => {
  return request('/api/student/market/products', {
    method: 'POST',
    data: data,
    jwt: true
  })
}

export default products
