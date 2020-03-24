import request from '@/utils/request'

// 获取文章详情
function articleAPI(article_id) {
    return request({
        method: 'GET',
        url: `v1_0/articles/${article_id}`,
    })
}

// 关注用户
function followAPI(artId) {
    return request({
        method: 'POST',
        url: `v1_0/user/followings`,
        data: {
            target: artId
        }
    })
}
// 取消关注
function unfollowAPI(target) {
    return request({
        method: 'DELETE',
        url: `v1_0/user/followings/${target}`,
    })
}

// 取消点赞
function unpraiseAPI(target) {
    return request({
        method: 'DELETE',
        url: `v1_0/article/likings/${target}`,
    })
}
// 对文章点赞
function praiseAPI(artId) {
    return request({
        method: 'POST',
        url: `v1_0/article/likings`,
        data: {
            target: artId
        }
    })
}
// 取消对文章不喜欢
function likeAPI(target) {
    return request({
        method: 'DELETE',
        url: `v1_0/article/dislikes/${target}`,
    })
}

// 对文章不喜欢
function unlikeAPI(artId) {
    return request({
        method: 'POST',
        url: `v1_0/article/dislikes`,
        data: {
            target: artId
        }
    })
}
// 获取评论列表
function commentsAPI({type,source,offset,limit}){
    return request({
        method: 'GET',
        url: `v1_0/comments`,
        params: {
            type,
            source,
            offset:offset || null,
            limit:limit || null
        }
    })
}

// 添加评论
function addcommentAPI({target,content,art_id}){
  return request({
    method: 'POST',
    url: `v1_0/comments`,
    data: {
        target,
        content,
        art_id:art_id || null
    }
})
}

export { articleAPI,followAPI,unfollowAPI,unpraiseAPI,praiseAPI,unlikeAPI,likeAPI,commentsAPI,addcommentAPI }