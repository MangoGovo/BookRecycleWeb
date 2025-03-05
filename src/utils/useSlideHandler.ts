import Lodash from "lodash";
import Axios from 'axios'
import {onMounted, reactive, watch} from 'vue'
import {ElNotification} from "element-plus";
import {useMainStore} from "@/stores";
import {useDefaultRequest} from "@/utils/request.js";
import {UserAPI} from "@/apis/index.js";
import router from "@/router/index.js";

export const useHandler = (domRef, config) => {
  const state = reactive({popoverVisible: false, type: "default"})
  const cData = reactive({image: "", thumb: "", captKey: "", thumbX: 0, thumbY: 0, thumbWidth: 0, thumbHeight: 0})
  const tempstore = useMainStore().useTempStore()

  const clickEvent = () => {
    state.popoverVisible = true
  }

  const visibleChangeEvent = (visible) => {
    state.popoverVisible = visible
  }

  const closeEvent = () => {
    state.popoverVisible = false
  }

  const requestCaptchaData = () => {
    domRef.value?.clear && domRef.value?.clear()
    Axios({
      method: 'get',
      url: config.getApi,
    }).then((response) => {
      console.log(response)
      const {data = {}} = response.data;
      // debugger
      if (!Lodash.isEmpty(data)) {
        cData.image = data['image_base64'] || ''
        cData.thumb = data['tile_base64'] || ''
        cData.captKey = data['captcha_key'] || ''
        cData.thumbX = data['tile_x'] || 0
        cData.thumbY = data['tile_y'] || 0
        cData.thumbWidth = data['tile_width'] || 0
        cData.thumbHeight = data['tile_height'] || 0
      } else {
        ElNotification.warning(`get data failed`)
      }
    }).catch((e) => {
      console.warn(e)
    })
  }

  const refreshEvent = () => {
    requestCaptchaData()
  }
  const confirmEvent = (point, clear) => {
    Axios({
      method: 'post',
      url: config.checkApi,
      data: {
        x: point.x,
        y: point.y,
        captcha_key: cData.captKey || ''
      },
    }).then((response) => {
      const {data = {}} = response.data;
      if (data.check) {
        ElNotification.success(`验证码校验成功`)
        state.popoverVisible = false
        state.type = "success"
        tempstore.setCaptchaPassed(true)
      } else {
        ElNotification.warning(`验证码校验失败`)
        state.type = "error"
      }

      setTimeout(() => {
        requestCaptchaData()
      }, 1000)
    }).catch((e) => {
      console.warn(e)
    })
  }

  watch(() => state.popoverVisible, () => {
    if (state.popoverVisible) {
      requestCaptchaData()
    }
  })

  onMounted(() => {
    requestCaptchaData()
  })

  return {
    state,
    data: cData,
    visibleChangeEvent,
    clickEvent,
    closeEvent,
    refreshEvent,
    confirmEvent,
  }
}
