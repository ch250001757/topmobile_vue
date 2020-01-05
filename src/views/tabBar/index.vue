<template>
    <div>
        <router-view></router-view>
        <van-tabbar v-model="active" route>
            <van-tabbar-item name="home" icon="home-o" to="/home">首页</van-tabbar-item>
            <van-tabbar-item name="video" icon="search" to="/video">视频</van-tabbar-item>
            <van-tabbar-item name="qk" icon="friends-o">问答</van-tabbar-item>
            <van-tabbar-item name="mine" icon="setting-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>

</template>

<script>
export default {
    data() {
        return {
            active: "home"
        }
    }

}
</script>

