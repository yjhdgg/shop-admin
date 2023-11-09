import {ElMessageBox, ElNotification} from "element-plus";
import nprogress from "nprogress";

export function notify(message, type = "success", dangerouslyUseHTMLString = false) {
    ElNotification({
        message: message,
        type: type,
        duration: 3000,
        dangerouslyUseHTMLString: dangerouslyUseHTMLString
    })
}

export const showBox=(content = "提示内容", type = "warning", title = "提示信息")=>{
    return ElMessageBox.confirm(content, title,{
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type:type
    })
}

// 显示全屏loading
export function showFullLoading(){
    nprogress.start()
}

// 隐藏全屏loading
export function hideFullLoading(){
    nprogress.done()
}
