'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const button_1 = require('./button')
class WidgetFactory {
	create(element) {
		switch (element.widget) {
			//case Widgets.TEXTBOX: return new Input(element.props, element.name)
			case 'button' /* BUTTON */:
				return new button_1.Button(element.props, element.name)
			//case Widgets.CHECKBOX: return new Checkbox(element.props, element.name)
			//case Widgets.RADIO: return new Radio(element.props, element.name)
			//case Widgets.SELECT: return new Select(element.props, element.name)
			default:
				throw new Error(`Invalid widget type: ${element.widget}`)
		}
	}
}
exports.default = WidgetFactory
