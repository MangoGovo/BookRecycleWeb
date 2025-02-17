import { request } from '@/apis/axios'

const info = () => {
  return request('/api/user/info', {
    method: 'GET',
    jwt: true
  })
}

export default info
