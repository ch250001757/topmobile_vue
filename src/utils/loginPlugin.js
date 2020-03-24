import Vue from 'vue'
import store from '@/store'
import {
    Dialog
} from 'vant';
Vue.use(Dialog);

let MyPlugin = {} 

// 添加插件
MyPlugin.install = function (Vue) {
    Vue.prototype.$mylogin = function (methodOptions) {
        // 逻辑...
        let userToekn = store.state.userToken
        if (!userToekn || !userToekn.token) {
            Dialog.confirm({
                title: '请登录',
                message: '请跳转登录页面'
            }).then(() => {
                // on confirm
                this.$router.push('/login')
            }).catch(() => {
                // on cancel
            });
        }
    }
}

export {
    MyPlugin
}