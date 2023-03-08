import axios from 'axios'
import router from '@/router/index.js'
// 请求拦截
axios.interceptors.request.use(
	(confing) => {
		//设置请求头
		if (localStorage.Authorization) { //判断本地缓存的token是否存在
			confing.headers.Authorization = localStorage.Authorization
		}
		return confing
	},
	(error) => { //token不存在，设置为网络报错
		return Promise.reject(error)
	}
)
 
//响应拦截
axios.interceptors.response.use(
	(res) => { 
    //响应处理
		if (res.status === 200) {
			if (res.data.code == '200') { //接口请求成功
				return Promise.resolve(res.data)
			} else if (res.data.code == '10000' || res.data.code == '10001') {//token验证失败，根据自己实际的修改
				//清除token
				localStorage.removeItem('Authorization')
				//跳转到登录页面
				router.push('/login')
			} else {
				//Message.error(res.data.msg);
			}
			return Promise.reject(res)
		} else {
			return Promise.reject(res)
		}
		// return res
	},
	(error) => {
		Message.error('网络出错')
		// 获取状态码
		const { status } = error.response
		if (status === 401) {
			//清除token
			localStorage.removeItem('Authorization')
			//跳转到登录页面
			router.push('/login')
		}
		return Promise.reject(error)
	}
)
export default axios