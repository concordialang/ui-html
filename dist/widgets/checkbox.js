'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const lodash_1 = require('lodash')
const prop_1 = require('../utils/prop')
const html_widget_1 = require('./html-widget')
class Checkbox extends html_widget_1.default {
	constructor(props, name, config) {
		super(props, name, config)
	}
	getFormattedProps(props) {
		// Defines the properties that will be injected in the widget and its order.
		const VALID_PROPERTIES = ['type', 'name', 'value', 'required']
		props.type = 'checkbox'
		props.name = props.value
		const filteredProps = lodash_1.pick(props, VALID_PROPERTIES)
		return prop_1.formatProperties(filteredProps)
	}
}
exports.default = Checkbox
