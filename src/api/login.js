import request from '@/utils/request'

function loginAPI(data={}) {
    return request({
        method:'post',
        url:'v1_0/authorizations',
        data
    })
}

export { loginAPI }