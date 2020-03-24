import request from '@/utils/request'

// 获取频道数据
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
      params: {
        channel_id,
        timestamp,
        with_top
      }
    })
}

// 获取所有频道数据
function allchannelAPI(){
    return request({
      url: "v1_0/channels",
      method: "GET"
    });
}

// 修改频道信息
function setChannelAPI({ channels }) {
    return request({
      url: "v1_0/user/channels",
      method: "PUT",
      data: {
        channels: channels
      }
    });
}

// 对文章不喜欢
function noLikeArticle(artId) {
  return request({
    url: "v1_0/article/dislikes",
    method: "POST",
    data: {
      target: artId
    }
  });
}

// 举报文章
function reportAPI({target,type}) {
  return request({
    url: "v1_0/article/reports",
    method: "POST",
    data: {
      target,
      type,
      remark:'因为...'
    }
  });
}

// 拉黑用户
function blacklistsAPI(target) {
  return request({
    url: "v1_0/user/blacklists",
    method: "POST",
    data: {
      target
    }
  });
}


export { menuListAPI,ArticleAPI,allchannelAPI,setChannelAPI,noLikeArticle,reportAPI,blacklistsAPI }

  