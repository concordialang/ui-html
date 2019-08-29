'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const concordialang_ui_core_1 = require('concordialang-ui-core')
class Body extends concordialang_ui_core_1.Widget {
	constructor(_widgets) {
		super(null, '')
		this._widgets = _widgets
	}
	renderToString() {
		let content = this._widgets.reduce((result, widget) => {
			return result + widget.renderToString()
		}, '')
		return '<body><form>' + content + '</form></body>'
	}
}
exports.default = Body
