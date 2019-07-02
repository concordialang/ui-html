'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const concordialang_ui_core_1 = require('concordialang-ui-core')
const prop_1 = require('../utils/prop')
class Button extends concordialang_ui_core_1.Widget {
	constructor(props, name, _config) {
		super(props, name || '')
		this._config = _config
		this.VALID_PROPERTIES = ['id', 'disabled', 'value']
	}
	renderToString() {
		const buttonType = this.getType(this.props.datatype)
		let properties = prop_1.formatProperties(
			this.props,
			this.VALID_PROPERTIES
		)
		properties = `${buttonType} ${properties}`
		const buttonOpening = this._config.opening.replace(
			prop_1.PROPS_INJECTION_POINT,
			properties
		)
		const buttonClosure = this._config.closure
		return buttonOpening + this.name + buttonClosure
	}
	getType(datatype) {
		return `type="${datatype || 'button'}"`
	}
}
exports.default = Button
