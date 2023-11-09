
import {getTabs, setTabs} from "@/utils/cookiesUtils.js";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {router} from "@/router/index.js";
import {ref, toRaw, reactive } from 'vue'
// 代码和别人一样，tm救我的有问题，除了和他用的不是一个cookies包
export function useTabList() {
    const route = useRoute()


    const activeTab = ref(route.path)
    const tabList = ref([
        {
            title: '后台首页',
            path: "/"
        },
    ])

    // 添加标签导航等一下
    function addTab(tab) {
        let noTab = tabList.value.findIndex(t => t.path == tab.path) == -1

        if (noTab) {
            tabList.value.push(tab)
        }
        // 它应该时cookies有问题，取出来赋值
        setTabs(tabList.value)

    }

    // 初始化标签导航列表
    function initTabList() {
        let tbs =   getTabs()
        if (tbs) {
            tabList.value = tbs
        }
    }

    initTabList()

    // 支持跳过重复路由跳转
    let skipFullPath = route.path
    onBeforeRouteUpdate((to) => {
        skipFullPath = activeTab.value = to.fullPath
        addTab({
            title: to.meta.title,
            path: to.fullPath
        })
    })

    const changeTab = (fullPath) => {
        if (skipFullPath !== fullPath) {
            router.push(fullPath)
        }
    }

    const removeTab = (t) => {
        let tabs = tabList.value
        let a = activeTab.value
        if (a == t) {
            tabs.forEach((tab, index) => {
                if (tab.path == t) {
                    const nextTab = tabs[index + 1] || tabs[index - 1]
                    if (nextTab) {
                        a = nextTab.path
                    }
                }
            })
        }

        activeTab.value = a
        tabList.value = tabList.value.filter(tab => tab.path != t)

        setTabs(tabList.value)
    }

    const handleClose = (c) => {
        if (c == "clearAll") {
            // 切换回首页
            activeTab.value = "/"
            // 过滤只剩下首页
            tabList.value = [{
                title: '后台首页',
                path: "/"
            }]
        } else if (c == "clearOther") {
            // 过滤只剩下首页和当前激活
            tabList.value = tabList.value.filter(tab => tab.path == "/" || tab.path == activeTab.value)
        }
        setTabs(tabList.value)
    }

    return {
        activeTab,
        tabList,
        changeTab,
        removeTab,
        handleClose
    }
}
