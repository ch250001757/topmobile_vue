<template>
    <div class="channel">
        <!-- :value="value" @input="$emit('input', $event)": v-model 的实现 -->
        <van-popup :value="value" @input="$emit('input', $event)" position="bottom" :style="{ height: '80%' }">
            <div class="channel-c">
                <div class="top">
                    <div class="left">
                        我的频道
                        <span>点击进入频道</span>
                    </div>
                    <div class="right" >
                        <button v-if="!clearshow" @click="clearshow=true">编辑</button>
                        <button v-else @click="clearshow=false" >保存</button>
                    </div>
                </div>
                <van-grid clickable>
                    <van-grid-item Slots="text" v-for="(item,i) in menuList" :key="i" @click="selchange(i)">
                        <span :class="{hassel:i == active}">{{item.name}}</span>
                        <van-icon v-show="clearshow" name="clear" @click="delchannel(i)" />
                    </van-grid-item>
                </van-grid>
            </div>
            <div class="channel-c">
                <div class="top">
                    <div class="left">
                        频道推荐
                        <span>点击进入频道</span>
                    </div>
                </div>
                <van-grid clickable>
                    <van-grid-item Slots="text" v-for="(item,i) in otherchannel" :key="i" @click="menuClick(item)">
                        <span>{{item.name}}</span>
                    </van-grid-item>
                </van-grid>
            </div>
        </van-popup>
    </div>

</template>

<script>
import { allchannelAPI, setChannelAPI } from '@/api/homeApi.js'
export default {
    props: ['value', 'menuList', 'active'],
    data() {
        return {
            clearshow: false,
            allchannel: []
        }
    },
    async mounted() {
        let res = await allchannelAPI()
        this.allchannel = res.channels
    },
    computed: {
        otherchannel() {
            let mychannelId = this.menuList.map(ele => {
                return ele.id
            })
            return this.allchannel.filter(ele => !mychannelId.includes(ele.id))
        }
    },
    methods: {
        // 频道列中改变home页面的频道
        selchange(index) {
            this.$emit('update:active', index)
        },
        // 频道推荐
        async menuClick(item) {
            this.menuList.push(item)
            this.$set(item, 'pullUpfinished', false)
            this.$set(item, 'pullUploading', false)
            this.$set(item, 'pullDownLoading', false)
            this.$set(item, 'pre_timestamp', 0)
            this.$set(item, 'articleList', [])
            let { userToken } = this.$store.state
            if (userToken && userToken.token) {
                // 已登录
                // 推荐频道为默认为第一个所以从第二个开始
                let channelArr = this.menuList.slice(1).map((ele, i) => {
                    return { id: ele.id, seq: i + 2 }
                })
                let res = await setChannelAPI({ channels: channelArr })
            } else {
                localStorage.setItem('channel', JSON.stringify(this.menuList))
            }
        },
        // 删除频道
        async delchannel(i) {
            this.menuList.splice(i,1)
            let { userToken } = this.$store.state
            if (userToken && userToken.token) {
                // 已登录
                // 推荐频道为默认为第一个所以从第二个开始
                let channelArr = this.menuList.slice(1).map((ele, i) => {
                    return { id: ele.id, seq: i + 2 }
                })
                let res = await setChannelAPI({ channels: channelArr })
            } else {
                localStorage.setItem('channel', JSON.stringify(this.menuList))
            }
        }
    }
}
</script>

<style lang="less" scoped>
.channel {
  .van-popup.van-popup--bottom {
    padding: 10px;
    box-sizing: border-box;
  }
  .channel-c {
    .top {
      display: flex;
      justify-content: space-between;
      .left {
        font-size: 20px;
        span {
          margin-left: 5px;
          font-size: 14px;
          color: #666;
        }
      }
      .right {
        button {
          border: 1px solid red;
          border-radius: 10px;
          color: red;
          background: #fff;
          font-size: 14px;
        }
      }
    }
    .van-grid {
      margin-top: 10px;
    }
    .van-grid-item {
      position: relative;
      .van-icon {
        position: absolute;
        right: 0;
        top: 0;
      }
      .hassel {
        color: red;
      }
    }
  }
}
</style>



