'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
function createLabel(name, id) {
	const validIdPattern = /^(#|~|\d|\w).*/
	const labelFor = validIdPattern.test(id)
		? `for="${id.replace(/^#|~/, '')}"`
		: ''
	return `<label ${labelFor}>${name}</label>`
}
exports.createLabel = createLabel
