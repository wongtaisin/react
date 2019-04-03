var ModalModule = function (opts) {

	let module = new Object()

	module.getHtml = function () {
		return `<div class="ui-modal ${opts.class}" id="${opts.id}">
                <div class="ui-modal-dialog">
                  ${opts.content}
                </div>
                <div class="ui-modal-mask"></div>
              </div>`
	}

	/**
     * 创建弹出层
     * @return {[type]} [description]
     */
	module.createModal = function () {
		if (!document.getElementById(opts.id)) {

			$('body').append(module.getHtml())
		} else {
			console.log('modal id exist!')
		}
	}

	/**
     * 绑定弹出层事件
     * @return {[type]} [description]
     */
	module.bindEvents = function () {

		$(document).on('click', '.js-dismiss-modal', function () {
			$(this).closest('.ui-modal').removeClass('show')
		})

	}

	/**
     * 弹出层初始化
     * @return {[type]} [description]
     */
	module.init = function () {
		module.createModal()
		module.bindEvents()
	}

	module.init()

	module.show = function () {
		$(`#${opts.id}`).addClass('show')
	}

	return module
}
