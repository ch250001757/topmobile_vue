import request from '@/utils/request'

//获取联想建议
function suggestionAPi(key) {
    return request({
        method: 'GET',
        url: '/v1_0/suggestion',
        params: {
            q: key
        },
    })
}

export { suggestionAPi }