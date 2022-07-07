//负责管理所有的自定义指令

export const imagerror = {
    //指令对象 会在当前的dom元素插入到节点之后执行
    inserted(dom, options) {
        //dom 代表当前指令作用的dom对象
        //当前图片有地址 但地址没有加载成功的时候 会报错 会触发图片的一个时间 => onerror
        dom.onerror = function() {
            //当图片出现异常的时候 会将指令配置的默认图片设置为该图片的内容
            dom.src = options.value
        }
    }
}