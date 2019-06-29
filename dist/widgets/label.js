'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const prop_1 = require('../utils/prop')
function createLabel(widgetName, widgetId, widgetConfig) {
	if (!widgetConfig.label) return ''
	const idPattern = /^(#|~|\d|\w).*/
	const labelFor = widgetId.match(idPattern)
		? `for="${widgetId.replace(/^#|~/, '')}"`
		: ''
	const labelOpening = widgetConfig.label.opening.replace(
		prop_1.PROPS_INJECTION_POINT,
		labelFor
	)
	const labelClosure = widgetConfig.label.closure
	return labelOpening + widgetName + labelClosure
}
exports.createLabel = createLabel
