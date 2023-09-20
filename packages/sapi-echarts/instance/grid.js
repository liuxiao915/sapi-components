export function gridMixin (Chart) {
    Chart.prototype._getGrid = function (legendOption, isReverse) {
        return {
            left: 5,
            right: isReverse ? 25 : 5,
            top: 15,
            bottom: legendOption && legendOption.show === false ? 0 : 25,
            containLabel: true
        }
    }
}