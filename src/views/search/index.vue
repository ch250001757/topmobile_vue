<template>
    <div class="search">
        <van-search v-model="key" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel(key)" />
        <van-cell-group v-if="thinklist.length != 0">
            <van-cell @click="onSearch(item.val)" icon="location-o" v-for="(item,i) in thinklist" :key="i">
                <template slot="title">
                    <div v-html="item.thinkVal"></div>
                </template>
            </van-cell>
        </van-cell-group>
        <van-cell-group v-else>
            <van-cell title="搜索历史">
                <template slot="right-icon">
                    <van-icon name="delete" @click="delflag=true" v-if="!delflag" />
                    <div style="display:inline-block" v-else>
                        <span @click="delAllhistory">全部删除 </span>
                        <span @click="delflag=false">完成</span>
                    </div>
                </template>
            </van-cell>
            <van-cell :title="item" icon="search" v-for="(item,i) in historyList" :key="i" @click="onSearch(item)">
                <template slot="right-icon">
                    <van-icon name="close" v-if="delflag" @click="delhistoryItem(i)" />
                </template>
            </van-cell>
        </van-cell-group>

    </div>
</template>

<script>
import { suggestionAPi } from '@/api/serachApi'
export default {
    data() {
        return {
            key: '',
            thinklist: [],
            timer: null,
            historyList: JSON.parse(localStorage.getItem('historyList')) || [],
            delflag: false
        }
    },
    watch: {
        key: function (newVal, oldVal) {
            if (!newVal.trim().length) {
                this.thinklist = []
                return
            }
            // 防抖
            this.timer && clearInterval(this.timer)
            //key 去联想数据
            this.timer = setTimeout(async () => {
                let res = await suggestionAPi(newVal)
                this.thinklist = res.options
                this.thinklist = this.thinklist.map(ele => {
                    return {
                        thinkVal: ele.split(`${newVal}`).join(`<span style="color:red">${newVal}</span>`),
                        val: ele
                    }
                })
            }, 500)
        }
    },
    methods: {
        // 搜索
        onSearch(key) {
            console.log('onSearch', key);
            // 搜索历史最新
            this.historyList.unshift(key)
            // 过滤重复
            this.historyList = [...new Set(this.historyList)]
            localStorage.setItem('historyList', JSON.stringify(this.historyList))
            this.$router.push(`/list/${key}`)
        },
        // 搜索取消
        onCancel() {
            console.log(this.thinklist);
            console.log('cancel');
        },
        // 删除搜索历史数据
        delhistoryItem(i) {
            this.historyList.splice(i, 1)
            localStorage.setItem('historyList', JSON.stringify(this.historyList))
        },
        // 删除全部历史
        delAllhistory() {
            localStorage.removeItem('historyList')
            this.historyList = []
        }
    }
}
</script>

