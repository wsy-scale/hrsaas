import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth.js'
const TimeOut = 3600 //定义超时时间

const service = axios.create({
        baseURL: process.env.VUE_APP_BASE_API,
        setTimeout: 5000
    })
    //请求拦截器
service.interceptors.request.use(config => {
        //config是请求的配置信息
        //注入token
        if (store.getters.token) {
            // 只有在有token的情况下 才有必要去检查时间戳是否超时
            if (isCheckTimeOut()) {
                // 如果它为true表示 过期了
                // token没用了 因为超时了
                store.dispatch('user/logout') //登出操作
                router.push('/login')
                return Promise.reject(new Error('token超时了'))
            }
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
        //error信息里的response对象
        if (error.response && error.response.data && error.response.data.code === 10002) {
            //当等于10002的时候 表示 后端告诉我token超时了
            store.dispatch('user/logout')
            router.push('/login')
        } else {
            Message.error(error.message) //提示错误信息
        }
        return Promise.reject(error) //返回执行错误，让当前执行链跳出成功，直接进入catch
    })
    //是否超时
function isCheckTimeOut() {
    var currentTime = Date.now() //当前时间戳
    var timeStamp = getTimeStamp() //缓存时间戳
    return (currentTime - timeStamp) / 1000 > TimeOut
}
export default service