'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const concordialang_ui_core_1 = require('concordialang-ui-core')
const prop_1 = require('../utils/prop')
const label_1 = require('./label')
class Input extends concordialang_ui_core_1.Widget {
	constructor(props, name, _config) {
		super(props, name)
		this._config = _config
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
		const inputType = this.getType(this.props.datatype)
		const properties = prop_1.formatProperties(
			this.props,
			this.VALID_PROPERTIES
		)
		const input = this._config.opening.replace(
			'%s',
			`${inputType} ${properties}`
		)
		const inputClosure = this._config.closure || ''
		const label = label_1.createLabel(this.name, this.props.id.toString())
		return this.wrap(label + input + inputClosure)
	}
	wrap(elements) {
		if (this._config.wrapperOpening && this._config.wrapperClosure)
			return (
				this._config.wrapperOpening +
				elements +
				this._config.wrapperClosure
			)
		return elements
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
exports.default = Input
