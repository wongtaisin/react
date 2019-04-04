// 倒计时
function Timer (opts) {
	var controller = {
		endTime: null,
		intervalID: 0,
		display: function () {
			var _second = 1000
			var _minute = _second * 60
			var _hour = _minute * 60
			var _day = _hour * 24
			var now = new Date()
			var distance = controller.endTime - now
			if (distance < 0) {
				console.log(distance)
				clearInterval(controller.intervalID)
				controller.isEnd = true
				return typeof opts.onTimeEnd === 'function' && opts.onTimeEnd()
			}
			var days = Math.floor(distance / _day)
			var hours = Math.floor((distance % _day) / _hour)
			var minutes = Math.floor((distance % _hour) / _minute)
			var seconds = Math.floor((distance % _minute) / _second)
			var data = {
				days: days,
				hours: hours >= 10 ? hours : '0' + hours,
				minutes: minutes >= 10 ? minutes : '0' + minutes,
				seconds: seconds >= 10 ? seconds : '0' + seconds
			}
			typeof opts.onTick === 'function' && opts.onTick(data)
		}
	}

	this.countDown = function (endTime) {
		controller.isEnd = false // 是否已经结束
		controller.endTime = endTime
		controller.intervalID = setInterval(controller.display, 1000)
	}

	// 如果有传时间戳
	if (opts.endTime) {
		var date = new Date()
		date.setTime(opts.endTime)
		this.countDown(new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()))
	}
}

export default Timer
