const throttle = function (fn, interval) {
    let timer = null
    let isStart = true
    return function () {
        const param = arguments
        const that = this
        if (isStart) {
            isStart = false
            fn.apply(that, param)
        }

        if (!timer) {
            timer = window.setTimeout(function () {
                fn.apply(that, param)
                window.clearTimeout(timer)
                timer = null
            }, interval)
        }
    }
}

const uniqueId = () => Math.floor(Date.now() * Math.random()).toString(16)

const debounce = function (fn, delay, immediate) {
    let timer = null
    if (immediate) {
        fn.apply(this, arguments)
    }
    return function () {
        const that = this
        const param = arguments
        if (timer) {
            window.clearTimeout(timer)
        }

        timer = window.setTimeout(function () {
            fn.apply(that, param)
        }, delay)
    }
}

export {
    throttle,
    uniqueId,
    debounce
}
