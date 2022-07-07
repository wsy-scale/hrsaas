import { getToken, setToken, removeToken, setTimeStamp } from "@/utils/auth.js"
import { login, getUserInfo, getUserDetailById } from '@/api/user.js'

const state = {
    token: getToken(), //设置token为共享状态 初始化vuex的时候 就先从缓存中读取
    userInfo: {}
}
const mutations = {
    setToken(state, token) {
        state.token = token //将数据设置给vuex
        setToken(token) //同步给缓存
    },
    removeToken(state) {
        state.token = null //将vuex数据置空
        removeToken() //同步到缓存
    },
    setUserInfo(state, result) {
        state.userInfo = result
    }
}
const actions = {
    async login(context, data) {
        //调用api接口
        const result = await login(data) //拿到token
        context.commit('setToken', result) //设置token
            //拿到token说明登录成功
        setTimeStamp() //设置当前的时间戳
    },
    async getUserInfo(context) {
        const result = await getUserInfo() //result就是用户基本资料
        const baseInfo = await getUserDetailById(result.userId) //为了获取头像
        const baseResult = {...result, ...baseInfo } //将两个借口合并
        context.commit('setUserInfo', result) //提交给mutations
        context.commit('setUserInfo', baseResult) //提交给mutations
        return result
    },
    removeUserInfo(state) {
        state.userInfo = {}
    },
    // 登出的action
    logout(context) {
        // 删除token
        context.commit('removeToken') // 不仅仅删除了vuex中的 还删除了缓存中的
            // 删除用户资料
        context.commit('removeUserInfo') // 删除用户信息
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}