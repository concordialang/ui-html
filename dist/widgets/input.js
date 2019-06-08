'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const concordialang_ui_core_1 = require('concordialang-ui-core')
const lodash_1 = require('lodash')
const utils_1 = require('../utils')
const custom_config_1 = require('../interfaces/custom_config')
class Input extends concordialang_ui_core_1.Widget {
	constructor(props, name, _customDefinition) {
		super(props, name)
		this._customDefinition = _customDefinition
		this.VALID_PROPERTIES = [
			'id',
			'editable',
			'minlength',
			'maxlength',
			'required',
			'format',
		]
	}
	renderToString() {
		const input = this.createInput()
		const label = utils_1.createLabel(this.name, this.props.id.toString())
		return this.wrap(label + input)
	}
	createInput() {
		const inputType = this.getType(this.props.datatype)
		const inputOpening = lodash_1.get(
			this._customDefinition,
			custom_config_1.WIDGET_OPENING,
			'input'
		)
		const inputClosure = lodash_1.get(
			this._customDefinition,
			custom_config_1.WIDGET_CLOSURE
		)
		const properties = utils_1.formatProperties(
			this.props,
			this.VALID_PROPERTIES
		)
		if (inputClosure) {
			return `<${inputOpening} ${inputType} ${properties}></${inputClosure}>`
		} else {
			return `<${inputOpening} ${inputType} ${properties}>`
		}
	}
	wrap(elements) {
		const wrapperOpening = lodash_1.get(
			this._customDefinition,
			custom_config_1.WIDGET_WRAPPER_OPENING,
			'<div>'
		)
		const wrapperEnclosing = lodash_1.get(
			this._customDefinition,
			custom_config_1.WIDGET_WRAPPER_CLOSURE,
			'</div>'
		)
		return wrapperOpening + elements + wrapperEnclosing
	}
	getType(datatype) {
		let typeProperty
		switch (datatype) {
			case 'integer' /* INTEGER */:
			case 'double' /* DOUBLE */:
				typeProperty = 'number'
				break
			case 'time' /* TIME */:
				typeProperty = 'time'
				break
			case 'datetime' /* DATETIME */:
				typeProperty = 'datetime-local'
				break
			default:
				typeProperty = 'text'
		}
		return `type="${typeProperty}"`
	}
}
exports.Input = Input
