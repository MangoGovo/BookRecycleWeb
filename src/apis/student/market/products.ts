import { request } from '@/apis/axios'
import type { book } from '@/types/book'

const products = (data: { search: string }) => {
  return request('/api/student/market/products', {
    method: 'POST',
    data: data,
    jwt: true
  })
}

const uploadProducts = (data: {
  name: string
  author: string
  course: string
  edition: string
  publisher: string
  completeness: string
  img: string
  price: string
  note: string
}) => {
  return request('/api/student/market/book', {
    method: 'POST',
    data: data,
    jwt: true
  })
}

const getMyProducts = () => {
  return request('/api/student/market/books', {
    method: 'GET',
    jwt: true
  })
}

const editMyProducts = (data: book) => {
  return request('/api/student/market/book', {
    method: 'PUT',
    data: data,
    jwt: true
  })
}
const delMyProduct = (data: { id: number }) => {
  return request('/api/student/market/book', {
    method: 'DELETE',
    data: data,
    jwt: true
  })
}
export { products, uploadProducts, getMyProducts, delMyProduct, editMyProducts }
