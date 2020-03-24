<template>
    <div class="operModal">
        <van-dialog :value="value" @input="$emit('input',$event)" close-on-click-overlay :showConfirmButton="false" :showCancelButton="false" show-cancel-button>
            <van-cell-group v-if="reportshow">
                <van-cell title="隐藏此信息" icon="location-o" @click="hideInfo" />
                <van-cell title="举报" icon="location-o" is-link @click="reportshow=false" />
                <van-cell title="拉黑" icon="location-o" @click="blacklist" />
            </van-cell-group>
            <van-cell-group v-if="!reportshow">
                <van-cell icon="arrow-left" @click="reportshow=true" />
                <van-cell :title="item.value" icon="location-o" v-for="(item,i) in reportType" :key="i" @click="report(item.type)" />
            </van-cell-group>
        </van-dialog>
    </div>

</template>

<script>
import { noLikeArticle, reportAPI, blacklistsAPI } from '@/api/homeApi.js'
export default {
    props: ['value', 'leadId', 'aut_id'],
    data() {
        return {
            reportType: [
                { type: 1, value: "其他问题" },
                { type: 2, value: "标题夸张" },
                { type: 3, value: "低俗色情" },
                { type: 4, value: "错别字多" },
                { type: 5, value: "旧闻重" },
                { type: 6, value: "广告软文" },
                { type: 7, value: "内容不实" },
                { type: 8, value: "涉嫌违法犯罪" },
                { type: 9, value: "侵权" }
            ],
            reportshow: true
        }
    },
    methods: {
        // 隐藏此头条信息
        async hideInfo() {
            try {
                // 把后台数据删掉
                await noLikeArticle(this.leadId)
                // 页面删除
                this.$emit('delLead', this.leadId)
                this.$toast.success('取消成功');
            } catch (err) {
                this.$toast.fail('取消失败')
            } finally {
                this.$emit('input', false)
            }
        },
        // 举报
        async report(type) {
            try {
                let res = await reportAPI({
                    target: this.leadId, type
                })
                this.$toast.success('举报成功')
            } catch (err) {
                this.$toast.fail('举报失败')
            } finally {
                this.reportshow = true
            }
        },
        // 拉黑
        async blacklist() {
            try {
                let res = await blacklistsAPI(this.aut_id)
                this.$toast.success('拉黑成功')
            } catch {
                this.$toast.success('拉黑失败')
            } finally {
                this.$emit('input', false)
            }
        }
    },



}
</script>

