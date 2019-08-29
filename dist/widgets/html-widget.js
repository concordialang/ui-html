'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const concordialang_ui_core_1 = require('concordialang-ui-core')
const Mustache = require('mustache')
const prop_1 = require('../utils/prop')
const label_1 = require('./label')
const wrapper_1 = require('./wrapper')
class HtmlWidget extends concordialang_ui_core_1.Widget {
	constructor(props, name, _config) {
		super(props, name)
		this._config = _config
	}
	renderToString() {
		let main
		if (Array.isArray(this.props.value)) {
			main = this._config.widget.onePerValue
				? this.renderOneWidgetPerValue(this.props.value)
				: this.renderWidgetWithMultipleValues(this.props.value)
		} else {
			main = this.renderWidgetWithSingleValue()
		}
		const widgetId = this.props.id ? this.props.id.toString() : undefined
		const label = label_1.createLabel(this.name, widgetId, this._config)
		return wrapper_1.wrap(label + main, this._config)
	}
	renderWidgetWithSingleValue() {
		const props = this.getFormattedProps(this.props)
		const config = {
			widget: Object.assign({}, this._config.widget),
			// Widgets like button may include {{value}} in the template
			value: this.props.value,
		}
		config.widget.opening = Mustache.render(config.widget.opening, {
			props,
		})
		const template =
			this._config.template ||
			'{{&widget.opening}}{{value}}{{&widget.closure}}'
		return Mustache.render(template, config)
	}
	renderOneWidgetPerValue(values) {
		// When rendering one widget per value, we must delete the "id" property
		// to avoid multiple widgets with the same id.
		delete this.props.id
		const widgets = []
		for (const value of values) {
			const props = this.getFormattedProps(
				Object.assign({}, this.props, { value })
			)
			const config = {
				widget: Object.assign({}, this._config.widget),
				valueWrapper: Object.assign({}, this._config.valueWrapper),
				value,
			}
			config.widget.opening = Mustache.render(config.widget.opening, {
				props,
			})
			const template =
				this._config.template ||
				'{{&widget.opening}}{{&widget.closure}}{{&valueWrapper.opening}}{{value}}{{&valueWrapper.closure}}'
			widgets.push(Mustache.render(template, config))
		}
		return widgets.join(' ')
	}
	renderWidgetWithMultipleValues(values) {
		const widgetValues = []
		for (const value of values) {
			const props = prop_1.formatProperties({ value })
			const config = {
				valueWrapper: this._config.valueWrapper
					? Object.assign({}, this._config.valueWrapper)
					: { opening: '', closure: '' },
				value,
			}
			config.valueWrapper.opening = Mustache.render(
				config.valueWrapper.opening,
				{ props }
			)
			const template =
				'{{&valueWrapper.opening}}{{value}}{{&valueWrapper.closure}}'
			widgetValues.push(Mustache.render(template, config))
		}
		delete this.props.value
		const props = this.getFormattedProps(this.props)
		const config = {
			widget: Object.assign({}, this._config.widget),
			values: widgetValues.join(' '),
		}
		config.widget.opening = Mustache.render(config.widget.opening, {
			props,
		})
		const template = '{{&widget.opening}}{{&values}}{{&widget.closure}}'
		return Mustache.render(template, config)
	}
}
exports.default = HtmlWidget
