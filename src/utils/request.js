import axios from 'axios'
import store from '@/store'

let  myrequest = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/app/',
});

myrequest.interceptors.request.use(function (config) {
    // Do something before request is sent
    let userInfo = store.state.userToken
    if(userInfo && userInfo.token){
        // console.log(userInfo);
        config.headers.Authorization = `Bearer ${userInfo.token}`
    }  
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
myrequest.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data.data || response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default myrequest

