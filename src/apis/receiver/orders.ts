import { request } from '@/apis/axios'

const orders = () => {
  return request('/api/receiver/orders', {
    method: 'GET',
    jwt: true
  })
}

const takeOrder = (data: { id: number }) => {
  return request('/api/receiver/order', {
    method: 'POST',
    data: data,
    jwt: true
  })
}

const submitOrder = (data: { weight: number; img: string }) => {
  return request('/api/receiver/order', {
    method: 'PUT',
    data: data,
    jwt: true
  })
}

const settleOrder = () => {
  return request('/api/receiver/settle', {
    method: 'POST',
    jwt: true
  })
}
export { orders, takeOrder, submitOrder, settleOrder }
