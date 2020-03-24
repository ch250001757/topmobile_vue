<template>
    <div class="authorInfo">
        <van-cell>
            <template slot="title">
                <div class="content">
                    <div class="l">
                        <img :src="detailObj.aut_photo" alt="">
                    </div>
                    <van-cell>
                        <template slot="title">
                            <span>{{detailObj.aut_name}}</span>
                        </template>
                        <template slot="label">
                            <span>{{detailObj.pubdate | timeHanle}}</span>
                        </template>
                    </van-cell>
                    <div class="r">
                        <van-button type="danger" size="small" v-if="!detailObj.is_followed" @click="follow">关注</van-button>
                        <van-button type="danger" size="small" v-else @click="unfollow">取消关注</van-button>
                    </div>
                </div>
            </template>
        </van-cell>
    </div>
</template>

<script>
import { followAPI, unfollowAPI } from '@/api/articleApi'

export default {
    props: {
        detailObj: {
            default: {}
        }
    },
    methods: {
        async follow() {
            try {
                let res = await followAPI(this.detailObj.aut_id)
                this.detailObj.is_followed = true
                this.$toast.success('关注成功')
            } catch {
                this.$toast.fail('关注失败')
            }
        },
        async unfollow() {
            try {
                let res = await unfollowAPI(this.detailObj.aut_id)
                this.detailObj.is_followed = false
                this.$toast.success('取消成功')
            } catch {
                this.$toast.fail('取消失败')
            }
        },
    }
}
</script>

<style lang="less" scoped>
.authorInfo {
  .content {
    display: flex;
    align-items: center;
    .van-cell {
      flex: 1;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>

