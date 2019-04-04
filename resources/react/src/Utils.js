// 常用方法
var Utils = {
	/**
     * 更新地址参数
     * params => [{key: 'id', value: '1'}]
     */
	updateBrowserUrl (params) {
		let { pathname, search } = window.location
		let querys = {}
		let search_string = "?"

		// 如果已有参数
		if (search) {
			// 分割
			search.split('?')[1].split('&').map((item) => {
				item = item.split('=')
				querys[item[0]] = item[1]
			})
		}

		/** 
		 * 遍历需要设置的参数
		 * values() 遍历键值
		 */
		for (let item of params.values()) {
			querys[item.key] = item.value
		}

		/** 
		 * entries() 遍历键名，键值
		 */
		for (let [index, key] of Object.keys(querys).entries()) {
			let symbol_and = index > 0 && (index + 1) <= Object.keys(querys).length ? '&' : ''
			search_string += `${symbol_and}${key}=${querys[key]}`
		}

		window.history.pushState({}, '', `${pathname + search_string}`)
	},
	/**
     * 获取地址参数
	 * @return {String}
     */
	getUrlParam (param_name) {
		let search_params = {}
		let { search } = window.location
		if (!search) return ''

		search.split('?')[1].split('&').map((item) => {
			item = item.split('=')
			search_params[item[0]] = item[1]
		})

		return search_params[param_name]
	},
	/** 
	 * 删除指定参数值
	 * @return {String} url 地址
	 * @return {String} ref 删除的参数
	 */
	delQueStr (url, ref) {
		let str = ''
		if (url.indexOf('?') !== -1) str = url.substr(url.indexOf('?') + 1)
		else return url
		let arr = ''
		let returnurl = ''
		if (str.indexOf('&') !== -1) {
			arr = str.split('&')
			for (let i in arr) {
				if (arr[i].split('=')[0] !== ref) returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&"
			}
			console.log(url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1))
			return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1)
		} else {
			arr = str.split('=')
			if (arr[0] === ref) return url.substr(0, url.indexOf('?'))
			else return url
		}
	},
	/**
	 * 身份证验证
	 * @return {Boolean}
	 */
	validationWithInputType (value, type) {
		if (type === 'idcard') {
			let Validator = new window.IDValidator()
			if (!Validator.isValid(value)) return window.xmui.tip('请填写正确的身份证号码')
		}
		return true
	}
}
export default Utils
