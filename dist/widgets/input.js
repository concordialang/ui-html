'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const lodash_1 = require('lodash')
const prop_1 = require('../utils/prop')
const html_widget_1 = require('./html-widget')
class Input extends html_widget_1.default {
	constructor(props, name, config) {
		super(props, name, config)
	}
	getFormattedProps(props) {
		// Defines the properties that will be injected in the widget and its order.
		const VALID_PROPERTIES = [
			'id',
			'type',
			'name',
			'editable',
			'minlength',
			'maxlength',
			'required',
			'format',
		]
		props.type = this.getType(props.datatype)
		props.name = this.name
		const filteredProps = lodash_1.pick(props, VALID_PROPERTIES)
		return prop_1.formatProperties(filteredProps)
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
		return typeProperty
	}
}
exports.default = Input
