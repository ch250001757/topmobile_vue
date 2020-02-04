<template>
    <div class="ask">
        问答页面采用socket
    </div>
</template>

<script>
import io from 'socket.io-client';
export default {
    data() {
        return {

        } 
    },
    created() {
        const socket = io('http://ttapi.research.itcast.cn',{
            token:this.$store.state.userToken.token 
        });
        socket.on('connect', function () { 
            console.log('链接成功');
        });
        // 发送请求
        socket.emit('message',{
           msg:'我',
           timestamp:Date.now()
        })
        socket.on('message', function (data) { 
            console.log(data);
        });
    }


}
</script>

