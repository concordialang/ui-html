import {UiElement, Widget} from 'concordialang-ui-core'
import { get } from 'lodash';

import Button from './button'
import Input from './input'
import Checkbox from './checkbox'
import Radio from './radio'
import Select from './select'
import { AppConfig, WidgetConfig } from '../interfaces/app-config'

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
			case Widgets.BUTTON: return new Button(element.props, element.name)
			case Widgets.CHECKBOX: return new Checkbox(element.props, element.name)
			case Widgets.RADIO: return new Radio(element.props, element.name)
			case Widgets.SELECT: return new Select(element.props, element.name)
			default: throw new Error(`Invalid widget type: ${element.widget}`)
		}
	}

	private createInputElement(element: UiElement): any {
		const widgetConfig: WidgetConfig = get(this._config, 'widgets.input')
		return new Input(element.props, element.name, widgetConfig)
	}
}
