import { useRequest } from 'vue-hooks-plus'
import { closeLoading, startLoading } from './loading'
import { ElNotification } from 'element-plus'

export const useDefaultRequest = (promise: Promise<unknown>, onSuccess: Function) => {
  return useRequest(() => promise, {
    onBefore: () => startLoading(),
    onSuccess(res: any) {
      if (res.code !== 200) {
        ElNotification.error(res.msg)
        return
      }
      onSuccess(res)
    },
    onError(e) {
      ElNotification.error('请求失败，请重试')
      console.log('请求失败', e)
    },
    onFinally: () => closeLoading()
  })
}
