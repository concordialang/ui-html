'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
function wrap(elements, widgetConfig) {
	if (widgetConfig.wrapperOpening && widgetConfig.wrapperClosure)
		return (
			widgetConfig.wrapperOpening + elements + widgetConfig.wrapperClosure
		)
	return elements
}
exports.wrap = wrap
