import { getToken, setToken, removeToken } from "@/utils/auth.js"
import { login } from '@/api/user.js'
const state = {
    token: getToken() //设置token为共享状态 初始化vuex的时候 就先从缓存中读取
}
const mutations = {
    setToken(state, token) {
        state.token = token //将数据设置给vuex
        setToken(token) //同步给缓存
    },
    removeToken(state) {
        state.token = null //将vuex数据置空
        removeToken() //同步到缓存
    }
}
const actions = {
    async login(context, data) {
        //调用api接口
        const result = await login(data)
        context.commit('setToken', result)
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}