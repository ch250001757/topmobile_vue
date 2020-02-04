<template>
    <div class="comment">
        <van-cell>
            <template slot="title">
                <div class="content">
                    <div class="l">
                        <img :src="item.aut_photo" alt="">
                    </div>
                    <van-cell>
                        <template slot="title">
                            <span>{{item.aut_name}}</span>
                        </template>
                        <template slot="label">
                            <div>
                                {{item.content}}
                            </div>
                            <span>{{item.pubdate | timeFormats}}</span>
                            <span v-if="current" @click="reply">回复({{item.reply_count}})</span>
                        </template>
                    </van-cell>
                    <div class="r">
                        <van-icon name="good-job-o" />
                        <span>({{item.like_count}})</span>
                    </div>
                </div>
            </template>
        </van-cell>
    </div>

</template>

<script>
export default {
    props: {
        item: {
            default: {}
        },
        current:{

        }

    },
    data() {
        return {

        }
    },
    methods: {
        reply() {
            this.$emit('popup', {
                popupFlag:true,
                item:this.item
            })
        }
    }

}
</script>

<style lang="less" scoped>
.comment {
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
    .r {
      span {
        margin-left: 5px;
      }
    }
  }
}
</style>