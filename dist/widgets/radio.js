'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const concordialang_ui_core_1 = require('concordialang-ui-core')
const prop_1 = require('../utils/prop')
const label_1 = require('./label')
const wrapper_1 = require('./wrapper')
class Radio extends concordialang_ui_core_1.Widget {
	constructor(props, name, _config) {
		super(props, name)
		this._config = _config
		this.VALID_PROPERTIES = ['value']
	}
	renderToString() {
		const inputType = 'type="radio"'
		const label = label_1.createLabel(this.name, '', this._config)
		let inputs = []
		for (let value of this.props.value) {
			// TODO: o que fazer no formatProperties em relação ao value?
			// provavelmente terei que instalar o pacote "case"
			// para ter 'value="algumaCoisa"', quando value for "Alguma Coisa"
			//
			// TODO: adicionar propriedades 'id' e 'nome'
			const props = Object.assign({}, this.props, { value })
			let properties = prop_1.formatProperties(
				props,
				this.VALID_PROPERTIES
			)
			properties = `${inputType} ${properties}`
			const inputOpening = this._config.opening.replace(
				prop_1.PROPS_INJECTION_POINT,
				properties
			)
			const inputClosure = this._config.closure || ''
			inputs.push(inputOpening + value + inputClosure)
		}
		return wrapper_1.wrap(label + inputs.join(''), this._config)
	}
}
exports.default = Radio
