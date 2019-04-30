'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const concordialang_ui_core_1 = require('concordialang-ui-core')
class Checkbox extends concordialang_ui_core_1.Widget {
	constructor(props, name) {
		super(props, name)
	}
	renderToString() {
		return `<input type="checkbox">TESTE`
	}
}
exports.Checkbox = Checkbox
