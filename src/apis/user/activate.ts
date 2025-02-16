import { request } from '@/apis/axios'
import type CampusType from '@/types/enums/campusType'

const activate = (data: {
  studentID: string
  telephone: string
  address: string
  campus: CampusType
}) => {
  return request('/api/user/activate', {
    data: data,
    method: 'POST'
  })
}

export default activate
