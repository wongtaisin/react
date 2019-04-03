/**
  根据设备DRP重新计算子节点行内样式字体大小
  @parentNodeID 容器ID
  @dpr 设备像素密度
**/
var resizeElementsWithDPR = function (element_container, dpr) {

	if (!element_container) {
		return false
	}

	var html_content_childs = element_container.getElementsByTagName('*')

	//遍历内容中每一个tag
	for (var i = 0, max = html_content_childs.length; i < max; i++) {
		var element = html_content_childs[i]
		var element_inline_styles = element.style

		//去掉图片的宽高
		if (/img/ig.test(element.tagName)) {
			element.style.width = '100%'
			element.style.height = ''
		}

		//处理字体大小
		if (element_inline_styles.fontSize) {
			var font_size = parseFloat(element_inline_styles.fontSize.replace('px', ''))
			var resized_font_size = font_size * dpr
			element.style.fontSize = resized_font_size + 'px'
		}

		//重新计算，将行内样式中的px转为rem
		//width、height、padding、margin
		var size_properties = element_inline_styles.cssText.match(/([\w-]+)[\s]?:[\s]?(-?[\d.?]+)(px|pt)/ig)

		if (size_properties) {

			for (var j = 0; j < size_properties.length; j++) {

				var _property = /([\w-]+)[\s]?:[\s]?(-?[\d.?]+)(px|pt)/ig.exec(size_properties[j])

				var property_name = _property[1]
				var property_size = _property[2]

				if (property_name != 'font-size') {
					element.style[property_name] = (property_size * dpr) + 'px'
				}

			}
		}

		element.className += ' resized_mark'

	}
}

function fixContents(selector) {
	var is_class_selector = selector.indexOf('.') !== -1
	var is_id_selector = selector.indexOf('#') !== -1

	//当前屏幕dpr
	var dpr = lib.flexible.dpr

	//如果是class
	if (is_class_selector) {
		var elements = document.querySelectorAll(selector)

		for (var i = 0; i < elements.length; i++) {
			var element = elements[i]
			resizeElementsWithDPR(element, dpr)
		}
	}

	//如果是id
	if (is_id_selector) {
		var element = document.getElementById(selector)
		resizeElementsWithDPR(element, dpr)
	}
}

window.addEventListener('load', function () {
	fixContents('#richtext-container')
})
