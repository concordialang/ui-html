'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const concordialang_ui_core_1 = require('concordialang-ui-core')
const utils_1 = require('../utils')
class Select extends concordialang_ui_core_1.Widget {
	constructor(props, name) {
		super(props, name)
		this.VALID_PROPERTIES = ['id', 'required']
	}
	// TODO: remove \n
	renderToString() {
		const properties = utils_1.formatProperties(
			this.props,
			this.VALID_PROPERTIES
		)
		if (!properties) return '<div>\n<select></select>\n</div>'
		const options = this.getOptions()
		const select = `<select ${properties}>\n${options}\n</select>\n`
		const label = utils_1.createLabel(this.name, this.props.id.toString())
		return `<div>\n${label + select}</div>`
	}
	getOptions() {
		let options = []
		for (let value of this.props.value) {
			let option = `<option value="${value.toLowerCase()}">${value}</option>`
			options.push(option)
		}
		return options.join('\n')
	}
}
exports.Select = Select
