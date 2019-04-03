var xmui = xmui || {}
xmui.tip = function (message, timeout) {
	var timeout = timeout || 3000
	var tipElement = document.querySelector('.xmui-tip')

	if (!tipElement) {
		tipElement = document.createElement('div')
		tipElement.className = 'toast ui-tips ui-tips-show xmui-tip'
		document.body.appendChild(tipElement)
	}

	tipElement.innerHTML = '<span>' + message + '</span>'

	var timer = setTimeout(function () {
		tipElement.remove()
	}, timeout)
}
