<template>
  <div>
    <vue-qr text="1212121" :logoSrc="imageUrl" :callback="test" :size="200" :margin="0"></vue-qr>

  </div>

</template>

<script>
import VueQr from 'vue-qr'
import imgBG from './1.jpg'
export default {
  components: {
    VueQr
  },
  data() {
    return {
      src2: 'http://w.alipay.net/macau-p2p-ordinary-out-S911217840/index.html?name=p2pshare_11&code=user_1&from=share_0',
      imageUrl: imgBG
    }
  },
  methods: {
    test(dataUrl, id) {
      console.log(dataUrl, id)
    }
  }

}
</script>

