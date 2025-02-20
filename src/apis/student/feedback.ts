import { request } from '@/apis/axios'

const feedback = (data: { content: string; anonymity: boolean }) => {
  return request('/api/student/feedback', {
    data: data,
    method: 'POST',
    jwt: true
  })
}

export default feedback
