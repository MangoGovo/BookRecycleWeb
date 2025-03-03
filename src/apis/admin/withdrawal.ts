import { request } from '@/apis/axios'

export const getWithdrawalList = () => {
  return request('/api/admin/withdrawal', {
    method: 'GET',
    jwt: true,
  })
}
