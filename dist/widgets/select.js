'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const concordialang_ui_core_1 = require('concordialang-ui-core')
const prop_1 = require('../utils/prop')
const label_1 = require('./label')
const wrapper_1 = require('./wrapper')
class Select extends concordialang_ui_core_1.Widget {
	constructor(props, name, _config) {
		super(props, name)
		this._config = _config
		this.SELECT_VALID_PROPERTIES = ['id', 'required']
		this.OPTION_VALID_PROPERTIES = ['value']
	}
	renderToString() {
		const properties = prop_1.formatProperties(
			this.props,
			this.SELECT_VALID_PROPERTIES
		)
		const selectOpening = this._config.opening.replace(
			prop_1.PROPS_INJECTION_POINT,
			properties
		)
		const selectClosure = this._config.closure
		const options = this.getOptions()
		const select = selectOpening + options + selectClosure
		const label = label_1.createLabel(
			this.name,
			this.props.id.toString(),
			this._config
		)
		return wrapper_1.wrap(label + select, this._config)
	}
	getOptions() {
		if (!this._config.optionOpening) return ''
		let options = []
		for (let value of this.props.value) {
			const optionProps = { value }
			const properties = prop_1.formatProperties(
				optionProps,
				this.OPTION_VALID_PROPERTIES
			)
			const optionOpening = this._config.optionOpening.replace(
				prop_1.PROPS_INJECTION_POINT,
				properties
			)
			const optionClosure = this._config.optionClosure
			options.push(optionOpening + value + optionClosure)
		}
		return options.join('')
	}
}
exports.default = Select
