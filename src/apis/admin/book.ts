import { request } from '@/apis/axios'

export const getBookReviewList = () => {
  return request('/api/admin/review/books', {
    method: 'POST',
    jwt: true,
    data: {
      status: 3
    }
  })
}
