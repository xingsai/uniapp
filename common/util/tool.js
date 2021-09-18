export const debounce = function(func, wait, immediate) {
	//函数防抖[func 函数,wait 延迟执行毫秒数,immediate true 表立即执行,false 表非立即执行,立即执行是触发事件后函数会立即执行，然后n秒内不触发事件才能继续执行函数的效果] 
	//所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
	let timeout;
	return function() {
		let context = this;
		let args = arguments;
		if (timeout) clearTimeout(timeout);
		if (immediate) {
			var callNow = !timeout;
			timeout = setTimeout(() => {
				timeout = null;
			}, wait)
			if (callNow) func.apply(context, args)
		} else {
			timeout = setTimeout(function() {
				func.apply(context, args)
			}, wait);
		}
	}
}

export const throttle = function(fn, interval) {
	//函数节流 [func 函数 wait 延迟执行毫秒数 type 1 表时间戳版，2 表定时器版] 
	//所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数
	var last;
	var timer;
	var interval = interval || 200;
	return function() {
		var th = this;
		var args = arguments;
		var now = +new Date();
		if (last && now - last < interval) {
			clearTimeout(timer);
			timer = setTimeout(function() {
				last = now;
				fn.apply(th, args);
			}, interval);
		} else {
			last = now;
			fn.apply(th, args);
		}
	}

}
