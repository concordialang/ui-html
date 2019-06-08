'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const concordialang_ui_core_1 = require('concordialang-ui-core')
const utils_1 = require('../utils')
class Radio extends concordialang_ui_core_1.Widget {
	constructor(props, name) {
		super(props, name)
		this.VALID_PROPERTIES = ['value']
	}
	// TODO: remove \n
	renderToString() {
		const properties = utils_1.formatProperties(
			this.props,
			this.VALID_PROPERTIES
		)
		let inputs = []
		const label = utils_1.createLabel(this.name, this.props.id.toString())
		const inputName = this.name.toLowerCase()
		if (properties) {
			for (let value of this.props.value) {
				let input = `<input type="radio" name="${inputName}" value="${value.toLowerCase()}">${value}`
				inputs.push(input)
			}
			return `<div>\n${label + inputs.join('\n')}\n</div>`
		}
		return '<div>\n<input type="radio">\n</div>'
	}
}
exports.Radio = Radio
