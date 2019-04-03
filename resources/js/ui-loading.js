'use strict'

var xmui = xmui || {}

xmui.spinner = {
	element: {},
	init: function () {
		var loading_spinner_template = `<div class="toast-loading" id="ios-spinner">
         <div class="ios-spinner center">
           <div class="ios-spinner-blade"></div>
           <div class="ios-spinner-blade"></div>
           <div class="ios-spinner-blade"></div>
           <div class="ios-spinner-blade"></div>
           <div class="ios-spinner-blade"></div>
           <div class="ios-spinner-blade"></div>
           <div class="ios-spinner-blade"></div>
           <div class="ios-spinner-blade"></div>
           <div class="ios-spinner-blade"></div>
           <div class="ios-spinner-blade"></div>
           <div class="ios-spinner-blade"></div>
           <div class="ios-spinner-blade"></div>
         </div>
        </div>`

		if (!$('#ios-spinner').length) {
			$('body').append(loading_spinner_template)
			this.element = $('#ios-spinner')
		}
	},
	show: function () {
		if (!$('#ios-spinner').length) {
			this.init()
		}
		$('#ios-spinner').show()
	},
	hide: function () {
		$('#ios-spinner').hide()
	}
}

$(function () {
	xmui.spinner.init()
})
