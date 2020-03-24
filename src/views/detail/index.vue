<template>
    <div class="detail">
        <van-nav-bar title="文章详情" left-arrow @click-left="$router.back()" />
        <van-cell>
            <template slot="title">
                <div class="title">
                    {{detailObj.title}}
                </div>
            </template>
        </van-cell>
        <!-- 作者信息 -->
        <authorInfo :detailObj="detailObj" />
        <!-- 文章详情 -->
        <div class="article">
            <van-cell>
                <template slot="title">
                    <div v-html="detailObj.content"></div>
                </template>
            </van-cell>
        </div>
        <!-- 点赞 -->
        <like :detailObj="detailObj" />
        <!-- 评论区域 -->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="commentsList">
            <div v-for="(item,i) in commentList" :key="i">
                <comment :item="item" @popup="popupfalg" :current="true" />
            </div>
        </van-list>
        <!-- 输入评论 -->
        <mes :detailObj="detailObj" @sendCilck="sendObj" :current="true" />
        <!-- 回复弹出框 -->
        <van-popup v-model="show" position="bottom" :style="{ height: '70%' }">
            <van-cell title="当前评论"> </van-cell>
            <comment :item="currentComment" :current="false"  />
            <van-cell title="当前评论回复"> </van-cell>
            <van-list v-model="popuploading" :finished="popupfinished" finished-text="没有更多了" @load="popupList">
                <div v-for="(item,i) in replyComment" :key="i">
                    <comment :item="item" :current="false"  />
                </div>
            </van-list>
            <!-- 输入评论 -->
            <mes :detailObj="currentComment" @popupCilck="popupCilck" :comment_id="comment_id" :current="false" />
        </van-popup>
    </div>
</template>

<script>
import authorInfo from './child/authorInfo.vue'
import like from './child/like.vue'
import comment from './child/comment.vue'
import mes from './child/mes.vue'
import { articleAPI, commentsAPI } from '@/api/articleApi'

export default {
    components: {
        authorInfo,
        like,
        comment,
        mes
    },
    mounted: function () {
        this.getArticle()
    },
    data() {
        return {
            detailObj: {},
            commentList: [],
            end_id: null, // 所有评论或回复的最后一个id
            last_id: 0, //返回结果的最后一个评论id，作为请求下一页数据的offset参数
            loading: false,
            finished: false,
            show: false,
            currentComment: {},
            replyComment: [], // 评论回复
            art_id: null,// 当前文章id
            comment_id:null,
            popuploading: false,
            popupfinished: false,
            popupend_id: null,
            popuplast_id: 0,
        }
    },
    methods: {
        // 文章信息
        async getArticle() {
            try {
                let res = await articleAPI(this.$route.params.art_id)
                console.log(res);
                this.detailObj = res
            } catch (err) {
                this.$toast.fail('此文章没有详情')
                this.$router.back()
            }
        },
        // 获取评论列表
        async commentsList() {
            if (this.last_id == this.end_id) {
                this.loading = true
                this.finished = true
                return
            }
            // 第一次请求
            if (!this.last_id) {
                let res = await commentsAPI({
                    type: 'a',
                    source: this.$route.params.art_id,
                    limit: 10
                })
                console.log(res);
                this.commentList = res.results
                this.end_id = res.end_id
                this.last_id = res.last_id
                this.loading = false
            } else {
                let res = await commentsAPI({
                    type: 'a',
                    source: this.$route.params.art_id,
                    offset: this.last_id,
                    limit: 10
                })
                this.commentList = [ ...this.commentList,...res.results]
                this.last_id = res.last_id
                this.loading = false
            }
        },
        // 评论输入框数据
        sendObj(res) {
            console.log(res);
            this.commentList.unshift(res.new_obj)
        },
        //弹出框内容
        popupfalg(obj) {
            this.show = obj.popupFlag
            this.comment_id = obj.item.com_id
            this.currentComment = { ...obj.item, art_id: this.detailObj.art_id }
        },
        // 输入框评论列表
        popupCilck(res) {
            this.replyComment.unshift(res.new_obj)
        },
        // 弹出框回复列表
        async popupList() {
            if (this.popuplast_id === this.popupend_id) {
                this.popuploading = true
                this.popupfinished = true
                return
            }
            // 第一次请求
            if (!this.popuplast_id) {
                let res = await commentsAPI({
                    type: 'c',
                    source: this.comment_id,
                    limit: 10
                })
                this.replyComment = res.results
                this.popupend_id = res.end_id
                this.popuplast_id = res.last_id
                this.popuploading = false
            } else {
                // 第二次请求
                let res = await commentsAPI({
                    type: 'c',
                    source: this.comment_id,
                    offset: this.popuplast_id,
                    limit: 10
                })

                this.replyComment = [...res.results, ...this.replyComment]
                this.popuplast_id = res.last_id
                this.popuploading = false
            }
        }
    }

}
</script>

<style lang="less" scoped>
.detail {
  margin-top: 46px;
  margin-bottom: 70px;
  .title {
    font-size: 22px;
    font-weight: 550;
  }
  .van-nav-bar {
    z-index: 999;
    .van-icon-arrow-left {
      color: #fff;
    }
  }
  .article {
    .van-cell:not(:last-child)::after {
      border-bottom: none;
    }
  }
}
</style>
