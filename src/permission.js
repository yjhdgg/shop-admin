import {addRoutes, router} from "@/router/index.js";
import {getToken} from "@/utils/cookiesUtils.js";
import {useUserStore} from "@/store/module/user.js";
import {hideFullLoading, notify, showFullLoading} from "@/utils/utils.js";

// 设置一个全局变量表示是否有菜单
let hasMenus = false;

// 在每次路由切换之前执行的钩子函数
router.beforeEach(async (to, from, next) => {
    showFullLoading();
    const whiteList = ["/login"];
    const token = getToken();

    // 如果没有登录token且目标路径不在白名单中，则提示登录并跳转到登录页面
    if (!token && !whiteList.includes(to.path)) {
        notify("请先登录", "error");
        return next({path: "/login"});
    }
    // 如果已经登录token且目标路径在白名单中，则提示用户已登录并跳转回上一个页面
    if (token && whiteList.includes(to.path)) {
        notify("用户已登录", "error");
        return next({path: from.path ? from.path : "/"});
    }
    // 添加路由
    let hasNewRouter = false;
    if (token && !hasMenus) {
        const {menus} = await useUserStore().getUserInfo();
        hasNewRouter = addRoutes(menus);
        hasMenus = true;
    }
    // 设置文档标题
    document.title = to.meta.title ? to.meta.title : "" + " 安安编程后台";
    // 根据是否有新路由进行不同的跳转
    hasNewRouter ? next(to.fullPath) : next();
});

// 在每次路由切换之后执行的钩子函数
router.afterEach((to, from) => {
    hideFullLoading();
});
