import { request } from '@/apis/axios'
import type CampusType from '@/types/enums/campusType'

const activate = (data: {
  name: string
  student_id: string
  phone: string
  address: string
  campus: CampusType
}) => {
  return request('/api/user/activate', {
    data: data,
    method: 'POST',
    jwt: true
  })
}

export default activate
