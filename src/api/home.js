import request from '@/utils/request'

function menuListAPI() {
    return request({
        method:'GET',
        url:'v1_0/user/channels',
    })
}



// 获取文章数据
function ArticleAPI({ channel_id, timestamp, with_top }) {
    return request({
      url: "v1_1/articles",
      method: "GET",
      params: { channel_id,
        timestamp,
        with_top
      }
    })
}

  export { menuListAPI,ArticleAPI }

  