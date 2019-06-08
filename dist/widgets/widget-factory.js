'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const button_1 = require('./button')
const input_1 = require('./input')
const checkbox_1 = require('./checkbox')
const radio_1 = require('./radio')
const select_1 = require('./select')
class WidgetFactory {
	// criar uma classe "ConfigLoader" que recebe "config" no construtor
	// criar uma interface para "config"
	constructor(_configLoader) {
		this._configLoader = _configLoader
	}
	create(element) {
		switch (element.widget) {
			case 'textbox' /* TEXTBOX */:
				return this.createInputElement(element)
			case 'button' /* BUTTON */:
				return new button_1.Button(element.props, element.name)
			case 'checkbox' /* CHECKBOX */:
				return new checkbox_1.Checkbox(element.props, element.name)
			case 'radio' /* RADIO */:
				return new radio_1.Radio(element.props, element.name)
			case 'select' /* SELECT */:
				return new select_1.Select(element.props, element.name)
			default:
				throw new Error(`Invalid widget type: ${element.widget}`)
		}
	}
	createInputElement(element) {
		const customInputDefinition = this._configLoader.getInputDefinition()
		if (customInputDefinition)
			return new input_1.Input(
				element.props,
				element.name,
				customInputDefinition
			)
		return new input_1.Input(element.props, element.name)
	}
}
exports.default = WidgetFactory
