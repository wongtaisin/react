var PaymentModule = function (opts) {
    let module = new Object()

	/**
	 * 生成支付列表HTML
	 * @param  {[type]} payment_options [description]
	 * @return {[type]}                 [description]
	 */
    module.genPaymentOptionsHTML = function (payment_options) {
        return payment_options.map((item) => {
            let PAYMENT_TIP = item.payment_tip ? `<p class="payment-tip">${item.payment_tip}</p>` : ''
            return `
        <div class="payment-option" data-channel="${item.payment_channel}">
          <div class="payment-option-body" data-channel="${item.payment_channel}">
            <i class="iconfont ${item.payment_icon}"></i>
            <span class="payment-name">${item.payment_name}</span>
            <i class="iconfont icon-arrowright"></i>
          </div>
          <div class="payment-option-footer">
            ${PAYMENT_TIP}
          </div>
        </div>`
        }).join('')
    }

	/**
	 * 设置option
	 * @param {[type]} key   [description]
	 * @param {[type]} value [description]
	 */
    module.setProp = function (key, value) {
        module[key] = value
    }

	/**
	 * 绑定事件
	 * @return {[type]} [description]
	 */
    module.bindEvents = function () {
        $(document).on('click', '.payment-option', function (e) {
            let $payment_option = $(e.target).hasClass('payment-option') ? $(e.target) : $(e.target).closest('.payment-option')
            let channel = $payment_option.data('channel')
            // 不知道为什么AjaxSetup全局设置的loading提示在西子圈下没有显示, 先加一个
            // if( /Xizi_Quan/i.test(window.navigator.userAgent) && typeof xmui != 'undefined' ){
            //   xmui.spinner.show();
            // }else{
            //   xzmui.loading('show');
            // }
            typeof opts.onClickPaymentOption == 'function' &&
                opts.onClickPaymentOption(channel, $payment_option, module)
        })
    }

	/**
	 * 初始化支付弹出层
	 * @type {[type]}
	 */
    module.modal = ModalModule({
        id: 'payment',
        class: 'payment',
        content: `<dl>
                <dt class="payment-header">支付方式
                  <i class="js-dismiss-modal iconfont icon-guanbifuzhi"></i>
                </dt>
                <dd class="payment-list">
                  ${module.genPaymentOptionsHTML(opts.options)}
                </dd>
              </dl>`
    })
    module.bindEvents()
    return module
}
