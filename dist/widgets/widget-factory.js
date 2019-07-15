'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const lodash_1 = require('lodash')
const button_1 = require('./button')
const checkbox_1 = require('./checkbox')
const input_1 = require('./input')
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
				return this.createButtonElement(element)
			case 'checkbox' /* CHECKBOX */:
				return this.createCheckboxElement(element)
			case 'radio' /* RADIO */:
				return this.createRadioElement(element)
			case 'select' /* SELECT */:
				return this.createSelectElement(element)
			default:
				throw new Error(`Invalid widget type: ${element.widget}`)
		}
	}
	createInputElement(element) {
		const widgetConfig = lodash_1.get(this._config, 'widgets.input')
		widgetConfig.label =
			widgetConfig.label ||
			lodash_1.get(this._config, 'widgets.label.widget')
		return new input_1.default(element.props, element.name, widgetConfig)
	}
	createRadioElement(element) {
		const widgetConfig = lodash_1.get(this._config, 'widgets.radio')
		widgetConfig.label =
			widgetConfig.label ||
			lodash_1.get(this._config, 'widgets.label.widget')
		return new radio_1.default(element.props, element.name, widgetConfig)
	}
	createCheckboxElement(element) {
		const widgetConfig = lodash_1.get(this._config, 'widgets.checkbox')
		widgetConfig.label =
			widgetConfig.label ||
			lodash_1.get(this._config, 'widgets.label.widget')
		return new checkbox_1.default(element.props, element.name, widgetConfig)
	}
	createSelectElement(element) {
		const widgetConfig = lodash_1.get(this._config, 'widgets.select')
		widgetConfig.label =
			widgetConfig.label ||
			lodash_1.get(this._config, 'widgets.label.widget')
		return new select_1.default(element.props, element.name, widgetConfig)
	}
	createButtonElement(element) {
		const widgetConfig = lodash_1.get(this._config, 'widgets.button')
		return new button_1.default(element.props, element.name, widgetConfig)
	}
}
exports.default = WidgetFactory
