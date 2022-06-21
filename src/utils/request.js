import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    setTimeout: 5000
})
service.interceptors.request.use()
    //响应拦截器
service.interceptors.response.use(response => {
    //axios默认加了一层data
    const { data, success, message } = response.data
        //根据success的成功与否决定下面的操作
    if (success) {
        return data
    } else {
        Message.error(error) //提示错误信息
        return Promise.reject(new Error(message))
    }
}, error => {
    Message.error(error.message) //提示错误信息
    return Promise.reject(error) //返回执行错误，让当前执行链跳出成功，直接进入catch
})
export default service