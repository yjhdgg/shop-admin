import {useUserStore} from "@/store/module/user.js";


export default {
    /**
     * 安装插件
     * @param {Object} app - Vue实例
     */
    install(app) {
        app.directive('permission', {
            /**
             * 绑定元素时调用
             * @param {Element} el - 元素
             * @param {Object} binding - 绑定对象
             */
            mounted(el, binding) {
              hashPermissions(binding.value, el)
            }
        })
    }

}

/**
 * 检查权限
 * @param {Array} value - 权限列表
 * @param {Element} el - 元素（可选）
 * @returns {boolean} - 是否有权限
 */
//  这个函数有问题吗，没有
export function hashPermissions(value, el = false) {
    const ruleNames = useUserStore().ruleNames;
    if (!Array.isArray(value)) {
        throw new Error("需要配置权限")
    }
    let hasAuth = value.findIndex(v => ruleNames.includes(v)) !== -1;
    if (el && !hasAuth) {
        el.parentNode && el.parentNode.removeChild(el)
    }

    console.log(hasAuth)
    return hasAuth
}


