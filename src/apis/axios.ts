import { useMainStore } from '@/stores'
import axios, { type AxiosRequestConfig } from 'axios'

const axiosInstance = axios.create({
  timeout: 10000,
  withCredentials: true
})

axiosInstance.defaults.withCredentials = true
const request = <ResponseType = unknown>(
  url: string,
  options?: AxiosRequestConfig<unknown> & { jwt?: boolean }
): Promise<ResponseType> => {
  return new Promise((resolve, reject) => {
    const config = {
      url,
      ...options
    }
    if (options?.jwt) {
      const loginStore = useMainStore().useLoginStore()
      const token = loginStore.token
      config.headers = {
        ...options?.headers,
        Authorization: `Bearer ${token}`
      }
    }
    axiosInstance(config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => reject(err))
  })
}
export { axiosInstance, request }
