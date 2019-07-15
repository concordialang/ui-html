'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const Mustache = require('mustache')
const utils_1 = require('../utils')
function createLabel(widgetName, widgetId, widgetConfig) {
	if (!widgetConfig.label) return ''
	const idPattern = /^(#|~|\d|\w).*/
	const labelFor =
		widgetId && widgetId.match(idPattern)
			? `for="${widgetId.replace(/^#|~/, '')}"`
			: ''
	widgetConfig.label.opening = Mustache.render(widgetConfig.label.opening, {
		props: labelFor,
	})
	return utils_1.formatHtml(
		widgetConfig.label.opening + widgetName + widgetConfig.label.closure
	)
}
exports.createLabel = createLabel
