<template>
    <div class="message">
        <van-cell>
            <template slot="title">
                <div class="content">
                    <div>
                        <van-field v-model="inputVal" placeholder="请输入内容">
                            <template slot="left-icon">
                                <van-icon name="edit" />
                            </template>
                        </van-field>
                    </div>
                    <div>
                        <van-button type="danger" @click="send">发送</van-button>
                    </div>
                    <div class="r">
                        <van-icon name="star-o" />
                    </div>
                </div>
            </template>
        </van-cell>
    </div>
</template>

<script>
import { addcommentAPI } from '@/api/articleApi'
export default {
    props: {
        detailObj: {
            default: {}
        },
        current: {}, // 评论文章/回复
        comment_id:{}
    },
    data() {
        return {
            inputVal: ""
        }
    },
    methods: {
        async send() {
            try {
                this.$mylogin()
                if (this.current) {
                    let res = await addcommentAPI({
                        target: this.detailObj.art_id,
                        content: this.inputVal,
                    })
                    this.inputVal = ''
                    this.$emit('sendCilck', res)
                } else {
                    let res = await addcommentAPI({
                        target: this.comment_id,
                        content: this.inputVal,
                        art_id: this.detailObj.art_id,
                    })
                    this.inputVal = ''
                    this.$emit('popupCilck', res)
                }
            } catch {
                this.$toast.fail('发送失败')
            }
        },
    }

}
</script>

<style lang="less" scoped>
.message {
  position: fixed;
  bottom: 0;
  left: 0;
  .content {
    display: flex;
    align-items: center;
    .van-field {
      background: #eee;
      border-radius: 5px;
      margin-right: 5px;
    }
    .van-button {
      margin: 0 20px;
    }
    .r {
      i {
        font-size: 20px;
      }
    }
  }
}
</style>


