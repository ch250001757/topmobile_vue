<template>
    <div class="login">
        <van-nav-bar title="登录" />
        <ValidationObserver ref="form">
            <ValidationProvider rules="mobile" mode="passive" v-slot="{ errors }">
                <van-field v-model="mobile" required clearable label="手机号码" placeholder="请输入手机号码" :error-message="errors[0]" />
            </ValidationProvider>
            <ValidationProvider rules="code" mode="passive" v-slot="{ errors }">
                <van-field v-model="code" type="text" label="验证码" placeholder="请输入验证码" required :error-message="errors[0]" />
            </ValidationProvider>
        </ValidationObserver>
        <div class="login-in">
            <van-button type="info" :loading="loading" @click="login" loading-type="spinner">登录</van-button>
        </div>
    </div>
</template>

<script>
import { ValidationProvider, extend, localize, ValidationObserver, setInteractionMode } from 'vee-validate'
import CN from 'vee-validate/dist/locale/zh_CN.json' // 加载语言包
import { loginAPI } from '@/api/login.js'
import { setToken } from '@/utils/authority.js'
localize("zh_CN", CN);
// 设置校验模式 除非validate明确调用，否则不进行验证。不用通过默认的blur点击登录后触发
// setInteractionMode('passive');
// 自定义校验规则
extend('mobile', {
    validate: (value) => {
        return value.length === 11
    },
    message: '手机号码必须11位'
});
extend('code', {
    validate: (value) => {
        return value.length === 6
    },
    message: '请输入6位验证码'
}
);
export default {
    components: {
        ValidationProvider,
        ValidationObserver
    },
    data() {
        return {
            mobile: '18888888888',
            code: '246810',
            loading: false
        }
    },
    methods: {
        login() {
            this.$refs.form.validate().then(async res => {
                if (res) {
                    try {
                        this.loading = true
                        let res = await loginAPI({ mobile: this.mobile, code: this.code })
                        console.log(res);
                        
                        this.$store.commit('setUserToken', res)
                        this.loading = false
                        
                        this.$router.push('/home')
                        // loginAPI({ mobile: this.mobile, code: this.code }).then(res => {
                        //     // setToken(res.token)
                        //     // 用vuex管理登录数据
                        //     this.$store.commit('setUserToken', res)
                        //     this.loading = false
                        //     this.$router.push('/home')
                        // })
                    } catch (err) {
                        this.loading = false
                        this.$toast.fail('登录失败,请重新输入');
                    }
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.login {
    margin-top: 46px;
}
.van-button {
  width: 100%;
}
.login-in {
  margin: 15px;
}
</style>
