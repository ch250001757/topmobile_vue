
// 对登录信息处理大部分用cookies存储


const User_key = 'user_token'

function setToken(val) {
    localStorage.setItem(User_key,JSON.stringify(val))
}

function getToken(val) {
    return localStorage.getItem(User_key) ? JSON.parse(localStorage.getItem(User_key)) : null
}

function removeToken(val) {
    return localStorage.removeItem(User_key)
}


export { setToken,getToken,removeToken }