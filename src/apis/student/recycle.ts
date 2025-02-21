import { request } from '@/apis/axios'

const getRecycleOrder = () => {
  return request('/api/student/recycle', {
    method: 'GET',
    jwt: true
  })
}

const createRecycleOrder = (data: { weight: number; img: string; note: string }) => {
  return request('/api/student/recycle', {
    method: 'POST',
    jwt: true,
    data: { ...data, weight: Number(data.weight) }
  })
}

export default { getRecycleOrder, createRecycleOrder }
