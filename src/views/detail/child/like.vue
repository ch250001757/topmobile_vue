<template>
    <div class="like">
        <van-button icon="star-o" type="default" v-if="detailObj.attitude == 1" @click="unpraise">取消点赞</van-button>
        <van-button icon="star-o" type="danger" v-else @click="praise">点赞</van-button>
        <van-button icon="like-o" type="danger" v-if="  detailObj.attitude == 0" @click="unlike">取消不喜欢</van-button>
        <van-button icon="like-o" type="default" v-else @click="like">喜欢</van-button>
    </div>
</template>

<script>
import { unpraiseAPI, praiseAPI, unlikeAPI, likeAPI } from '@/api/articleApi'
export default {
    props: {
        detailObj: {
            default: {}
        }
    },
    methods: {
        async unpraise() {
            try {
               let res = await unpraiseAPI(this.detailObj.art_id)
                this.detailObj.attitude = -1
            } catch {
                this.$toast.fail('取消失败')
            }
        },
        async praise() {
            try {
               let res = await praiseAPI(this.detailObj.art_id)
                this.detailObj.attitude = 1
            } catch {
                this.$toast.fail('点赞成功')
            }
        },
        async like() {
            try {
               let res = await likeAPI(this.detailObj.art_id)
                console.log(res);
                this.detailObj.attitude = 0
            } catch {
                this.$toast.fail('取消失败')
            }
        },
        async unlike() {
            try {
               let res = await unlikeAPI(this.detailObj.art_id)
                console.log(res);
                this.detailObj.attitude = -1
            } catch {
                this.$toast.fail('取消失败')
            }
        },
    }

}
</script>

<style lang="less" scoped>
.like {
  margin-top: 10px;
  text-align: center;
  .van-button:first-child {
    margin-right: 10px;
  }
}
</style>

