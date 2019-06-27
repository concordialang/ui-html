'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const lodash_1 = require('lodash')
const button_1 = require('./button')
const input_1 = require('./input')
const checkbox_1 = require('./checkbox')
const radio_1 = require('./radio')
const select_1 = require('./select')
class WidgetFactory {
	constructor(_config) {
		this._config = _config
	}
	create(element) {
		switch (element.widget) {
			case 'textbox' /* TEXTBOX */:
				return this.createInputElement(element)
			case 'button' /* BUTTON */:
				return new button_1.default(element.props, element.name)
			case 'checkbox' /* CHECKBOX */:
				return new checkbox_1.default(element.props, element.name)
			case 'radio' /* RADIO */:
				return new radio_1.default(element.props, element.name)
			case 'select' /* SELECT */:
				return new select_1.default(element.props, element.name)
			default:
				throw new Error(`Invalid widget type: ${element.widget}`)
		}
	}
	createInputElement(element) {
		const widgetConfig = lodash_1.get(this._config, 'widgets.input')
		return new input_1.default(element.props, element.name, widgetConfig)
	}
}
exports.default = WidgetFactory
