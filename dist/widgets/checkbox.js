'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const concordialang_ui_core_1 = require('concordialang-ui-core')
const prop_1 = require('../utils/prop')
const wrapper_1 = require('./wrapper')
class Checkbox extends concordialang_ui_core_1.Widget {
	constructor(props, name, _config) {
		super(props, name)
		this._config = _config
		this.VALID_PROPERTIES = ['value', 'required']
	}
	renderToString() {
		const inputType = 'type="checkbox"'
		let properties = prop_1.formatProperties(
			this.props,
			this.VALID_PROPERTIES
		)
		properties = `${inputType} ${properties}`
		const inputOpening = this._config.opening.replace(
			prop_1.PROPS_INJECTION_POINT,
			properties
		)
		const inputClosure = this._config.closure || ''
		return wrapper_1.wrap(
			inputOpening + this.name + inputClosure,
			this._config
		)
	}
}
exports.default = Checkbox
