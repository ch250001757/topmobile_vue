<template>
    <div class="home">
        <van-nav-bar title="首页" />
        <van-tabs v-model="active">
            <div class="my_menu" slot="nav-right">
                <van-icon name="wap-nav" @click="menushow=true" />
            </div>
            <van-tab :title="item.name" v-for="item in menuList" :key="item.id">
                <van-pull-refresh v-model="pullDownLoading" @refresh="onRefresh">
                    <van-list v-model="pullUploading" :finished="pullUpfinished" finished-text="没有更多了" @load="onLoad">
                        <van-cell v-for="item in list" :key="item" :title="item" />
                    </van-list>
                </van-pull-refresh>
            </van-tab>
        </van-tabs>
        <!-- 菜单弹出层 -->
        <van-popup v-model="menushow" position="bottom" :style="{ height: '80%' }">
            <van-grid :column-num="3">
                <van-grid-item v-for="value in 6" :key="value" icon="photo-o" text="文字" />
            </van-grid>
        </van-popup>
    </div>
</template>

<script>
import { menuListAPI } from '@/api/home.js'
export default {
    data() {
        return {
            active: 0,
            menuList:[],
            pullUpfinished: false,
            pullUploading: false,
            list: [],
            pullDownLoading: false,
            menushow: false
        }
    },
    methods: {
        onLoad() {
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    this.list.push(this.list.length + 1);
                }
                // 加载状态结束
                this.loading = false;
                // 数据全部加载完成
                if (this.list.length >= 40) {
                    this.finished = true;
                }
            }, 500);
        },
        onRefresh() {
            this.pullDownLoading = false
        },
        // 获取菜单列表
        getMenuList(){
           let { userToken } = this.$store.state
           if(userToken){
               menuListAPI().then(res =>{
                   console.log(res);
                  let menuList = Math.toString.call(res.channels) == "[object Array]" ? res.channels : []
                  this.menuList = menuList
               })
           }
            
        },
        
    },
    mounted(){
        this.getMenuList()
    }

}
</script>

<style scoped>
.home {
  margin-top: 46px;
  margin-bottom: 40px;
}
.home /deep/ .van-tabs__wrap {
  position: fixed;
  width: 100%;
  left: 0;
  top: 46px;
  z-index: 1;
}
.home /deep/ .van-tabs__content {
  margin-top: 90px;
}
.my_menu {
  position: fixed;
  right: 10px;
  top: 60px;
}
.home /deep/ .van-tabs__nav {
  margin-right: 40px;
}
.van-cell {
    height: 100px;
}
</style>


