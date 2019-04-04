var Logger = function () {
	var logger = new Object()
	$('body').append(`<div class="js-logger" style="top: 0; position: fixed; background: #000; color: #fff; width: 100%; z-index: 2; "></div>`)
	logger.update = function () {
		$('.js-logger').html(`
        ScrollTop: ${document.body.scrollTop}
        <br/> ScrollHeight: ${document.body.scrollHeight}
        <br/> #addAddress Top ${$('#addAddress').position().top}
        <br/> 'window height' ${$(window).height()}
        `)
	}
	return logger
}

// var logger = Logger();

$(function () {
	if ($('#addAddress').length) {
		var focus_input_timer = new Object()
		// 解决键盘弹出后遮挡输入框的问题
		$(document).on('focus', 'input', function () {
			focus_input_timer = setInterval(function () {
				if ($('.input-row-box').length < 3) {
					document.body.scrollTop = document.body.scrollHeight
				}
			}, 500)
			$(window).scrollTop($('#addAddress').position().top)
		})

		$(document).on('blur', 'input[type="text"]', function () {
			clearInterval(focus_input_timer)
			// logger.update()
		})
	}
})
