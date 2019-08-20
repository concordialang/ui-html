import { Widget } from 'concordialang-ui-core'
import { get } from 'lodash'
import * as Mustache from 'mustache'

import { WidgetConfig } from '../interfaces/app-config'
import { formatProperties } from '../utils/prop'

import { createLabel } from './label'
import { wrap } from './wrapper'

export default abstract class HtmlWidget extends Widget {
	constructor(props: any, name: string, private _config: WidgetConfig) {
		super(props, name)
	}

	public renderToString(): string {
		let main: string

		if (Array.isArray(this.props.value)) {
			main = this._config.widget.onePerValue
				? this.renderOneWidgetPerValue(this.props.value as string [])
				: this.renderWidgetWithMultipleValues(this.props.value as string[])
		} else {
			main = this.renderWidgetWithSingleValue()
		}

		const widgetId = this.props.id ? this.props.id.toString() : undefined
		const label: string = createLabel(this.name, widgetId, this._config)
		return wrap(label + main, this._config)
	}

	protected abstract getFormattedProps(props: any): string

	private renderWidgetWithSingleValue(): string {
		const props = this.getFormattedProps(this.props)
		const config = {
			widget: { ...this._config.widget },
			// Widgets like button may include {{value}} in the template
			value: this.props.value
		}
		config.widget.opening = Mustache.render(config.widget.opening, { props })
		const template = this._config.template || '{{&widget.opening}}{{&widget.closure}}'
		return Mustache.render(template, config)
	}

	private renderOneWidgetPerValue(values: string[]): string {
		// When rendering one widget per value, we must delete the "id" property
		// to avoid multiple widgets with the same id.
		delete this.props.id

		const widgets: string[] = []

		for (const value of values) {
			const props = this.getFormattedProps({ ...this.props, value })
			const config = {
				widget: { ...this._config.widget },
				valueWrapper: { ...this._config.valueWrapper },
				value
			}
			config.widget.opening = Mustache.render(config.widget.opening, { props })

			const template = this._config.template || '{{&widget.opening}}{{&widget.closure}}{{&valueWrapper.opening}}{{value}}{{&valueWrapper.closure}}'
			widgets.push(Mustache.render(template, config))
		}

		return widgets.join(' ')
	}

	private renderWidgetWithMultipleValues(values: string[]): string {
		const widgetValues: string[] = []
		for (const value of values) {
			const props = formatProperties({ value })
			const config = {
				valueWrapper: this._config.valueWrapper ? { ...this._config.valueWrapper } : { opening: '', closure: '' },
				value
			}

			config.valueWrapper.opening = Mustache.render(config.valueWrapper.opening, { props })

			const template = '{{&valueWrapper.opening}}{{value}}{{&valueWrapper.closure}}'
			widgetValues.push(Mustache.render(template, config))
		}

		delete this.props.value
		const props = this.getFormattedProps(this.props)
		const config = {
			widget: { ...this._config.widget },
			values: widgetValues.join(' ')
		}
		config.widget.opening = Mustache.render(config.widget.opening, { props })
		const template = '{{&widget.opening}}{{&values}}{{&widget.closure}}'
		return Mustache.render(template, config)
	}
}
