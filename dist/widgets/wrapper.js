'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
function wrap(elements, widgetConfig) {
	if (widgetConfig.wrapper) {
		return (
			widgetConfig.wrapper.opening +
			elements +
			widgetConfig.wrapper.closure
		)
	}
	return elements
}
exports.wrap = wrap
