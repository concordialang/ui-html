'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const concordialang_ui_core_1 = require('concordialang-ui-core')
const prop_1 = require('../utils/prop')
class Button extends concordialang_ui_core_1.Widget {
	constructor(props, name) {
		super(props, name || '')
		this.VALID_PROPERTIES = ['id', 'disabled', 'value']
	}
	renderToString() {
		// const inputType = this.getType(this.props.datatype as string)
		const properties = prop_1.formatProperties(
			this.props,
			this.VALID_PROPERTIES
		)
		// return `<button ${inputType}${properties}>${this.name}</button>`
		return `<button ${properties}>${this.name}</button>`
	}
	getType(datatype) {
		return `type="${datatype || 'button'}"`
	}
}
exports.default = Button
