// 倒计时
function Countdown (opts) {
    var _module = new Object();
    _module.controller = {
        endTime: null,
        intervalID: 0,
        display: function () {
            var _second = 1000;
            var _minute = _second * 60;
            var _hour = _minute * 60;
            var _day = _hour * 24;
            var msg = "";
            opts.startTime = opts.startTime + 1000;
            var now = opts.startTime ? new Date(opts.startTime) : new Date();
            var distance = _module.controller.endTime - now;
            if (distance < 0) {
                clearInterval(_module.controller.intervalID);
                _module.controller.isEnd = true;
                return typeof opts.onTimeEnd == 'function' && opts.onTimeEnd();
            }
            var days = Math.floor(distance / _day);
            var hours = Math.floor((distance % _day) / _hour);
            var minutes = Math.floor((distance % _hour) / _minute);
            var seconds = Math.floor((distance % _minute) / _second);
            var data = {
                days: days,
                hours: hours >= 10 ? hours : '0' + hours,
                minutes: minutes >= 10 ? minutes : '0' + minutes,
                seconds: seconds >= 10 ? seconds : '0' + seconds
            }
            typeof opts.onTick == 'function' && opts.onTick(data);
        }
    }
    _module.countDown = function (endTime) {
        _module.controller.isEnd = false; // 是否已经结束
        _module.controller.endTime = endTime;
        _module.controller.intervalID = setInterval(_module.controller.display, 1000);
    }
    // 如果有传时间戳
    if (opts.endTime) {
        var date = new Date();
        date.setTime(opts.endTime);

        _module.countDown(new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    }
    return _module;
}
