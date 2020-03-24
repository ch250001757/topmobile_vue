<template>
    <div class="home">
        <van-nav-bar title="首页" />
        <van-tabs v-model="active">
            <div class="my_menu" slot="nav-right">
                <van-icon name="wap-nav" @click="menushow=true" />
            </div>
            <van-tab :title="item.name" v-for="item in menuList" :key="item.id">
                <van-pull-refresh v-model="item.pullDownLoading" @refresh="onRefresh">
                    <van-list v-model="item.pullUploading" :finished="item.pullUpfinished" finished-text="没有更多了" @load="onLoad">
                        <van-cell v-for="(subitem,i) in item.articleList" :key="i" :title="subitem.title">
                            <template slot="label">
                                <van-grid :border="false" :column-num="3" v-if="subitem.cover.images.length > 0">
                                    <van-grid-item v-for="(imgItem,imgI) in subitem.cover.images" :key="imgI">
                                        <van-image :src="imgItem"   lazy-load />
                                    </van-grid-item>
                                </van-grid>
                                <div class="user-info">
                                    <div class="left">
                                        <span>{{subitem.aut_name}}</span>
                                        <span>评论 {{subitem.comm_count}}</span>
                                        <span>{{subitem.pubdate | timeHanle}}</span>
                                    </div>
                                    <div class="right">
                                        <van-icon name="clear" @click="oper(subitem.art_id,subitem.aut_id)" />
                                    </div>
                                </div>
                            </template>
                        </van-cell>
                    </van-list>
                </van-pull-refresh>
            </van-tab>
        </van-tabs>
        <!-- 菜单弹出层 -->
        <!--组件中的双向数据绑定功能 -->
        <!--  v-model:
                    传入一个参数给子组件
                    给子组件绑定事件 input,将来调用时会更新 show 参数 -->
        <!-- <channel v-model="menushow" :menuList="menuList" :active="active" @changechannel="changeChannel" /> -->
        <!-- sync 父子组件双向绑定 -->
        <channel v-model="menushow" :menuList="menuList" :active.sync="active" />
        <operModal :opershow="opershow" v-model="opershow" :leadId="leadId" @delLead="delLead" :aut_id="aut_id" />
    </div>
</template>

<script>
import { menuListAPI, ArticleAPI } from '@/api/homeApi.js'
import channel from './child/allMenu'
import operModal from './child/operModal'
export default {
    components: {
        channel,
        operModal
    },
    data() {
        return {
            active: 0,
            menuList: [], // 菜单栏
            menushow: false,
            opershow:false,
            leadId:null, // 当前点击文章的id
            aut_id:null // 当前文章的用户id
        }
    },
    mounted() {
        this.getMenuList()
    },
    methods: {
        // 上拉加载
        async onLoad() {
            let channelObj = this.menuList[this.active]
            console.log(channelObj);
            
            // 当前频道无数据
            if (channelObj.pre_timestamp === null) {
                // 设置上拉刷新的状态
                channelObj.pullUploading = false
                channelObj.pullUpfinished = true
                return
            }
            if (channelObj) {
                // 获取文章数据
                let res = await ArticleAPI({
                    channel_id: channelObj.id,
                    // 上一次和第一次的时间搓
                    timestamp: channelObj.pre_timestamp ? channelObj.pre_timestamp : new Date().getTime(),
                    with_top: 1
                })
                if (channelObj.pre_timestamp) {
                    channelObj.articleList = [...channelObj.articleList, ...res.results]
                } else {
                    channelObj.articleList = [...res.results]
                }
                channelObj.pre_timestamp = res.pre_timestamp
                channelObj.pullUploading = false
            }
        },
        // 下拉刷新
        async onRefresh() {
            console.log('onRefresh');
            let channelObj = this.menuList[this.active]
            if (channelObj) {
                // 重置数据
                channelObj.pullUploading = false
                channelObj.pre_timestamp = 0
                channelObj.pullDownLoading = false
                channelObj.articleList = []
                this.onLoad()
            }
        },
        // 获取菜单列表
        async getMenuList() {
            let { userToken } = this.$store.state
            // 已登录
            if (userToken) {
                // menuListAPI().then(res => {
                //     let menuList = Math.toString.call(res.channels) == "[object Array]" ? res.channels : []
                //     this.menuList = menuList
                // })
                let menuList = await menuListAPI()
                this.menuList = menuList.channels
            } else {
                // 未登录,从缓存中读取
                let menuList = JSON.parse(localStorage.getItem('channel'))
                if (menuList) {
                    this.menuList = menuList
                } else {
                    // 未登录,默认推送
                    let menuList = await menuListAPI()
                    this.menuList = menuList.channels
                }
            }
            this.setChannelItem()
        },
        // 每个频道对应一个上拉下拉
        setChannelItem() {
            this.menuList.forEach(ele => {
                // 新添加的属性数据不是响应式的
                // ele.pullUpfinished = false
                // ele.pullUploading = false
                // ele.pullDownLoading = false
                // ele.articleList = []
                this.$set(ele, 'pullUpfinished', false)
                this.$set(ele, 'pullUploading', false)
                this.$set(ele, 'pullDownLoading', false)
                this.$set(ele, 'pre_timestamp', 0)
                this.$set(ele, 'articleList', [])
            })
        },
        // 改变频道数据
        changeChannel(val) {
            this.active = val
        },
        oper(art_id,aut_id) {
           this.opershow = true
           this.leadId = art_id
           this.aut_id = aut_id
        },
        // 删除单独一条的页面信息
        delLead(art_id){
            let articleList = this.menuList[this.active].articleList
            articleList.some((ele,i) =>{
                if(ele.art_id == art_id){
                    articleList.splice(i,1)
                    return true
                }
            })
        }
    },
}
</script>

<style scoped lang="less">
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
.user-info {
  display: flex;
  justify-content: space-between;
  span {
    margin-right: 5px;
  }
}
</style>


