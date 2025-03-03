import { request } from '@/apis/axios'

const withdrawal = (data: { amount: number }) => {
  return request('/api/user/withdrawal', {
    data: data,
    method: 'POST',
    jwt:true
  })
}

export default withdrawal
