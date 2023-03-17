export const BASE_SPLIT_NUMBER = 5

function isEmpty (val) {
    return val !== null && val !== undefined && val !== ''
}
export function calMax (arr) {
    arr = arr.filter(item => isEmpty(item))
    if (!arr.length) {
        return 0
    }

    let max = Math.max(...arr)
    if (max < 5) {
        return Math.ceil(max)
    }

    const submultiple = max / BASE_SPLIT_NUMBER
    if (submultiple > 5 && submultiple <= 10) {
        return BASE_SPLIT_NUMBER * 10
    }

    const subLength = parseInt(submultiple).toString().length
    return Math.ceil(submultiple / Math.pow(10, subLength - 1)) * Math.pow(10, subLength - 1) * BASE_SPLIT_NUMBER
}

export function calMin (arr) {
    arr = arr.filter(item => isEmpty(item))
    if (!arr.length) {
        return 0
    }
    let min = Math.min(...arr)
    if (Math.abs(min) < 5) {
        return Math.floor(min)
    }

    const submultiple = min / BASE_SPLIT_NUMBER
    if (submultiple < -5 && submultiple >= -10) {
        return BASE_SPLIT_NUMBER * -10
    }

    const subLength = Math.abs(parseInt(submultiple)).toString().length
    return Math.floor(submultiple / Math.pow(10, subLength - 1)) * Math.pow(10, subLength - 1) * BASE_SPLIT_NUMBER
}

export function guid () {
    let keyData = 'xxxxxxxxxxxx4xxxyxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0
        let v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
    return keyData
}

export function randomColor() {
    return '#' + Math.floor( Math.random() * 0xffffff ).toString(16)
}