import { UiElement, Widget } from 'concordialang-ui-core'
import { get } from 'lodash'

import { AppConfig, WidgetConfig } from '../interfaces/app-config'

import Button from './button'
import Checkbox from './checkbox'
import Input from './input'
import Radio from './radio'
import Select from './select'

const enum Widgets {
	BUTTON = 'button',
	TEXTBOX = 'textbox',
	CHECKBOX = 'checkbox',
	RADIO = 'radio',
	SELECT = 'select'
}

export default class WidgetFactory {
	constructor(private _config: AppConfig) {}

	create(element: UiElement): Widget {
		switch (element.widget) {
			case Widgets.TEXTBOX: return this.createInputElement(element)
			case Widgets.BUTTON: return this.createButtonElement(element)
			case Widgets.CHECKBOX: return this.createCheckboxElement(element)
			case Widgets.RADIO: return this.createRadioElement(element)
			case Widgets.SELECT: return this.createSelectElement(element)
			default: throw new Error(`Invalid widget type: ${element.widget}`)
		}
	}

	private createInputElement(element: UiElement): Input {
		const widgetConfig: WidgetConfig = get(this._config, 'widgets.input')
		widgetConfig.label = widgetConfig.label || get(this._config, 'widgets.label.widget')
		return new Input(element.props, element.name, widgetConfig)
	}

	private createRadioElement(element: UiElement): Radio {
		const widgetConfig: WidgetConfig = get(this._config, 'widgets.radio')
		widgetConfig.label = widgetConfig.label || get(this._config, 'widgets.label.widget')
		return new Radio(element.props, element.name, widgetConfig)
	}

	private createCheckboxElement(element: UiElement): Checkbox {
		const widgetConfig: WidgetConfig = get(this._config, 'widgets.checkbox')
		widgetConfig.label = widgetConfig.label || get(this._config, 'widgets.label.widget')
		return new Checkbox(element.props, element.name, widgetConfig)
	}

	private createSelectElement(element: UiElement): Select {
		const widgetConfig: WidgetConfig = get(this._config, 'widgets.select')
		widgetConfig.label = widgetConfig.label || get(this._config, 'widgets.label.widget')
		return new Select(element.props, element.name, widgetConfig)
	}

	private createButtonElement(element: UiElement): Button {
		const widgetConfig: WidgetConfig = get(this._config, 'widgets.button')
		return new Button(element.props, element.name, widgetConfig)
	}
}
