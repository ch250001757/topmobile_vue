import request from '@/utils/request'

//获取联想建议
function searchListAPI({page,per_page,q}) {
    return request({
        method: 'GET',
        url: '/v1_0/search',
        params: {
            page,
            per_page,
            q
        },
    })
}

export { searchListAPI }