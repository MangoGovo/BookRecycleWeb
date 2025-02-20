import { request } from '@/apis/axios'
import type UserType from '@/types/enums/userType'

const login = (data: { username: string; password: string; type: UserType }) => {
  return request('/api/user/register', {
    data: data,
    method: 'POST'
  })
}

export default login
