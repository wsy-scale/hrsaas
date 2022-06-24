import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'

const service = axios.create({
        baseURL: process.env.VUE_APP_BASE_API,
        setTimeout: 5000
    })
    //请求拦截器
service.interceptors.request.use(config => {
        //config是请求的配置信息
        //注入token
        if (store.getters.token) {
            config.headers['Authorization'] = `Bearer ${ store.getters.token }`
        }
        return config //必须要返回的
    }, error => {
        return Promise.reject(error)
    })
    //响应拦截器
service.interceptors.response.use(response => {
    //axios默认加了一层data
    const { data, success, message } = response.data
        //根据success的成功与否决定下面的操作
    if (success) {
        return data
    } else {
        Message.error(message) //提示错误信息
        return Promise.reject(new Error(message))
    }
}, error => {
    Message.error(error.message) //提示错误信息
    return Promise.reject(error) //返回执行错误，让当前执行链跳出成功，直接进入catch
})
export default service