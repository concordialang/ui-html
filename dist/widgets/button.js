'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const lodash_1 = require('lodash')
const prop_1 = require('../utils/prop')
const html_widget_1 = require('./html-widget')
class Button extends html_widget_1.default {
	constructor(props, name, config) {
		super(props, name, config)
		this.props.value = this.props.value || name
	}
	getFormattedProps(props) {
		// Defines the properties that will be injected in the widget and its order.
		const VALID_PROPERTIES = ['id', 'type', 'disabled']
		props.type = this.getType(props.datatype)
		props.value = props.value || this.name
		const filteredProps = lodash_1.pick(props, VALID_PROPERTIES)
		return prop_1.formatProperties(filteredProps)
	}
	getType(datatype) {
		return datatype || 'button'
	}
}
exports.default = Button
