// 权限拦截 导航守卫 路由守卫  router
import router from "@/router"
import store from "@/store"
import nprogress from "nprogress"
import 'nprogress/nprogress.css'

const whiteList = ['/login', '/404'] //自定义白名单  所有不授权控制的界面
    //next为必须执行的钩子函数  to代表“到哪”，from代表“从哪里来”，
    //next()通行，next(false)跳转终止，next(地址)跳转到某个地址
    //路由前置守卫
router.beforeEach((to, from, next) => {
        nprogress.start() //开启进度条
        if (store.getters.token) {
            if (to.path === '/login') {
                //如果访问的是登录页
                next('/') //跳转主页
            } else {
                next() //直接放行
            }
        } else {
            //如果没有token
            if (whiteList.indexOf(to.path) > -1) {
                //如果找到了 表示在白名单里
                next()
            } else {
                next('/login') //否则跳转登录页
            }
        }
        nprogress.done() //强制手动关闭一次 为了解决手动切换地址时进度条不关闭的问题
    })
    //路由后置守卫
router.afterEach(function() {
    nprogress.done() //关闭进度条
})