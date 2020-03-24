<template>
    <div class="list">
        <div id="top"></div>
        <van-nav-bar title="搜索列表" left-text="返回" right-text="按钮" left-arrow @click-left="onClickLeft" fixed/>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
            <van-cell :title="item.aut_name" v-for="(item,i) in list" :key="i">
                <template slot="label">
                    <div @click="gotoDetail(item.art_id)">
                        {{item.title}}
                    </div>
                    <van-grid :border="true" :column-num="3">
                        <van-grid-item text="评论" @click="comment" />
                        <van-grid-item text="点赞" />
                        <van-grid-item text="收藏" />
                    </van-grid>
                </template>

            </van-cell>
        </van-list>
        <!-- 锚点 -->
        <a class="mylink" href="#top">点击跳转到头部</a>
    </div>
</template>

<script>
import { searchListAPI } from '@/api/listApi.js'
export default {
    data() {
        return {
            page: 0,
            per_page: 10,
            list: [],
            loading: false,
            finished: false
        }
    },
    methods: {
        onClickLeft: function () {
            this.$router.back()
        },
        async getList() {
            this.page++
            let res = await searchListAPI({
                page: this.page,
                per_page: this.per_page,
                q: this.$route.params.key
            })
            this.list = [...this.list, ...res.results]
            if (this.list.lenght >= res.total_count) this.finished = true
            this.loading = false
        },
        comment() {
            this.$mylogin()
        },
        // 跳转文章详情
        gotoDetail(val){
            this.$router.push(`/detail/${val}`)
        }   
    }
}
</script>

<style lang="less" scoped>
.list {
  margin-top: 46px;
  background: #eee;
  .van-nav-bar {
    z-index: 999;
    .van-icon-arrow-left {
      color: #fff;
    }
  }
  .van-cell {
    margin-top: 10px;
  }
  .mylink {
    position: fixed;
    bottom: 20px;
    right: 20px;
  }
}
</style>


