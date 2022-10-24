import axios from 'axios'
import router from '@/router'

const BASE_URL = '/api'

axios.defaults.timeout = 5000
axios.defaults.withCredentials = true
axios.defaults.baseURL = BASE_URL
//响应头
//axios.defaults.headers.post['Content-type'] ='application/x-www-form-urlencoded;charset=UTF-8'

//响应拦截器
axios.interceptors.response.use(
	// 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
	// 否则的话抛出错误
	(response) => {
		if (response.status === 200) {
			return Promise.resolve(response)
		} else {
			return Promise.reject(response)
		}
	},
	(error) => {
		console.log(error)
		if (error.response.status) {
			switch (error.response.status) {
				// 401: 未登录
				case 401:
					router.replace({ path: '/', query: {} })
					break
				case 403:
					setTimeout(() => {
						router.replace({ path: '/', query: {} })
					}, 1000)
					break
				// 404请求不存在
				case 404:
					break
			}

			return Promise.reject(error.response)
		}
	}
)

//客户端变量管理
export function getBaseURL() {
	return BASE_URL
}

/**
 * 封装get请求
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get(url: any, params?: object) {
	return new Promise((resolve, reject) => {
		axios.get(url, params).then(
			(response) => {
				resolve(response.data)
			},
			(error) => {
				reject(error)
			}
		)
	})
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url: any, data = {}) {
	return new Promise((resolve, reject) => {
		axios.post(url, data).then(
			(response) => resolve(response.data),
			(error) => reject(error)
		)
	})
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function deletes(url: any, data = {}) {
	return new Promise((resolve, reject) => {
		axios.delete(url, data).then(
			(response) => resolve(response.data),
			(error) => reject(error)
		)
	})
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url: any, data = {}) {
	return new Promise((resolve, reject) => {
		axios.put(url, data).then(
			(response) => resolve(response.data),
			(error) => reject(error)
		)
	})
}
