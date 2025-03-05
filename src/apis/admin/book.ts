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

export const acceptBookReviewList = (data: { id: number }) => {
  return request('/api/admin/review/update', {
    method: 'PUT',
    jwt: true,
    data: {
      id: data.id,
      status: 1
    }
  })
}

export const rejectBookReviewList = (data: { id: number }) => {
  return request('/api/admin/review/update', {
    method: 'PUT',
    jwt: true,
    data: {
      id: data.id,
      status: 4
    }
  })
}
