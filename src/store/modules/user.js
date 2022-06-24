import { getToken, setToken, removeToken } from "@/utils/auth.js"
import { login, getUserInfo } from '@/api/user.js'
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
    },
    async getUserInfo(context) {
        const result = await getUserInfo()
        context.commit('setUserInfo', result) //提交给mutations
        return result
    },
    removeUserInfo(state) {
        state.userInfo = {}
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}