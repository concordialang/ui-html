'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const concordialang_ui_core_1 = require('concordialang-ui-core')
const utils_1 = require('../utils')
class Checkbox extends concordialang_ui_core_1.Widget {
	constructor(props, name) {
		super(props, name)
		this.VALID_PROPERTIES = ['value', 'required']
	}
	// TODO: remove \n
	renderToString() {
		const properties = utils_1.formatProperties(
			this.props,
			this.VALID_PROPERTIES
		)
		if (properties)
			return `<div>\n<input type="checkbox" ${properties}>${
				this.name
			}\n</div>`
		return `<div>\n<input type="checkbox">${this.name}\n</div>`
	}
}
exports.Checkbox = Checkbox
