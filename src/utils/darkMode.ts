import { ref, watch, onBeforeMount } from 'vue'
import { useMainStore } from '@/stores'

const darkModeSwitch = (is_dark: boolean) => {
    if (is_dark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

export function useDarkModeSwitch() {
    const darkModeStore = useMainStore().useDarkModeStore()
    //暗黑模式 状态
    const darkModeStatus = ref(false)
    //从store中获取当前状态
    onBeforeMount(
        () => darkModeStatus.value = darkModeStore.status
    )
    watch(darkModeStatus, (newVal) => {
        //修改status时 上传到store 保存状态
        darkModeStore.setStatus(newVal)
        darkModeSwitch(newVal)
    })

    const switchDarkMode = () => {
        darkModeStatus.value = !darkModeStatus.value
    }

    return { darkModeStatus, switchDarkMode }
}